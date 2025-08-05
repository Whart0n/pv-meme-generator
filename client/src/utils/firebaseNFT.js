import { database } from '../firebase.js';
import { 
  ref, 
  get, 
  set, 
  update, 
  push, 
  query, 
  orderByChild, 
  limitToFirst, 
  limitToLast, 
  startAt, 
  endAt 
} from 'firebase/database';
import { fetchNFTMetadata, getRandomTokenIds } from './openSeaApi.js';
import { createInitialNFTData, updateNFTAfterVote, calculateNewRatings } from './eloRating.js';

// Database paths
const NFTS_PATH = 'metahero-nfts';
const VOTING_SESSIONS_PATH = 'voting-sessions';
const USER_SESSIONS_PATH = 'user-sessions';

/**
 * Get or create NFT data in Firebase
 * @param {string} tokenId - Token ID of the NFT
 * @returns {Promise<Object>} NFT data
 */
export const getOrCreateNFT = async (tokenId) => {
  try {
    const nftRef = ref(database, `${NFTS_PATH}/${tokenId}`);
    const snapshot = await get(nftRef);
    
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      // NFT doesn't exist, fetch from OpenSea and create
      console.log(`Fetching NFT ${tokenId} from OpenSea...`);
      const metadata = await fetchNFTMetadata(tokenId);
      const initialData = createInitialNFTData(metadata);
      
      await set(nftRef, initialData);
      return initialData;
    }
  } catch (error) {
    console.error(`Error getting/creating NFT ${tokenId}:`, error);
    throw error;
  }
};

/**
 * Get two random NFTs for voting using random index for efficient querying
 * @returns {Promise<Array>} Array of two NFT objects
 */
export const getRandomNFTPair = async () => {
  try {
    // Generate a random number between 0 and 1 for the query
    const randomValue = Math.random();
    
    // Create a query to get 2 random NFTs using the random_index
    // We'll use the randomValue as a starting point and get the next 2 NFTs
    const nftsRef = ref(database, NFTS_PATH);
    const nftsQuery = query(
      nftsRef,
      orderByChild('random_index'),
      startAt(randomValue),
      limitToFirst(2)
    );
    
    // Execute the query
    const snapshot = await get(nftsQuery);
    let nftPairs = [];
    
    if (snapshot.exists()) {
      // Convert the snapshot to an array of NFTs
      snapshot.forEach((childSnapshot) => {
        nftPairs.push({
          ...childSnapshot.val(),
          tokenId: childSnapshot.key
        });
      });
    }
    
    // If we didn't get enough NFTs from the first query, wrap around to the beginning
    if (nftPairs.length < 2) {
      const remainingNeeded = 2 - nftPairs.length;
      const secondQuery = query(
        nftsRef,
        orderByChild('random_index'),
        endAt(randomValue),
        limitToFirst(remainingNeeded)
      );
      
      const secondSnapshot = await get(secondQuery);
      if (secondSnapshot.exists()) {
        secondSnapshot.forEach((childSnapshot) => {
          // Make sure we don't add duplicates
          if (!nftPairs.some(nft => nft.tokenId === childSnapshot.key)) {
            nftPairs.push({
              ...childSnapshot.val(),
              tokenId: childSnapshot.key
            });
          }
        });
      }
    }
    
    // If we still don't have enough NFTs, create new ones
    while (nftPairs.length < 2) {
      const randomId = Math.floor(Math.random() * 10000) + 1;
      const newNFT = await getOrCreateNFT(randomId.toString());
      if (!nftPairs.some(nft => nft.tokenId === randomId.toString())) {
        nftPairs.push({
          ...newNFT,
          tokenId: randomId.toString()
        });
      }
    }
    
    // Make sure we have exactly 2 unique NFTs
    const uniqueNFTs = Array.from(new Map(nftPairs.map(nft => [nft.tokenId, nft])).values());
    
    // If we somehow ended up with more than 2, take the first 2
    return uniqueNFTs.slice(0, 2);
  } catch (error) {
    console.error('Error getting random NFT pair:', error);
    // Fallback to the old method if there's an error
    return getRandomNFTPairFallback();
  }
};

/**
 * Fallback method to get random NFTs if the primary method fails
 * This is kept for backward compatibility
 * @private
 */
const getRandomNFTPairFallback = async () => {
  try {
    console.log('Using fallback method to get random NFT pair...');
    
    // Use the dynamic collection size from OpenSea API
    const tokenIds = await getRandomTokenIds(2);
    
    console.log('Generated random token IDs:', tokenIds);
    
    // Fetch NFT data for both tokens
    const nftPromises = tokenIds.map(tokenId => getOrCreateNFT(tokenId));
    const nfts = await Promise.all(nftPromises);
    
    // Ensure we have valid NFTs
    const validNfts = nfts.filter(nft => nft && nft.tokenId);
    
    if (validNfts.length < 2) {
      throw new Error('Could not fetch enough valid NFTs');
    }
    
    return validNfts.slice(0, 2);
  } catch (error) {
    console.error('Error in fallback random NFT pair:', error);
    throw error;
  }
};

/**
 * Record a vote and update Elo scores
 * @param {string} winnerTokenId - Token ID of the winning NFT
 * @param {string} loserTokenId - Token ID of the losing NFT
 * @param {string} userSessionId - User session identifier
 * @returns {Promise<Object>} Updated NFT data and rating changes
 */
export const recordVote = async (winnerTokenId, loserTokenId, userSessionId) => {
  try {
    // Get current NFT data
    const [winnerData, loserData] = await Promise.all([
      getOrCreateNFT(winnerTokenId),
      getOrCreateNFT(loserTokenId)
    ]);
    
    // Calculate new Elo ratings
    const ratingChanges = calculateNewRatings(winnerData.elo_score, loserData.elo_score);
    
    // Update NFT data
    const updatedWinner = updateNFTAfterVote(winnerData, true, ratingChanges.winnerRating);
    const updatedLoser = updateNFTAfterVote(loserData, false, ratingChanges.loserRating);
    
    // Save to Firebase
    const updates = {};
    updates[`${NFTS_PATH}/${winnerTokenId}`] = updatedWinner;
    updates[`${NFTS_PATH}/${loserTokenId}`] = updatedLoser;
    
    await update(ref(database), updates);
    
    // Record voting session
    const votingSessionRef = push(ref(database, VOTING_SESSIONS_PATH));
    await set(votingSessionRef, {
      nft1_id: winnerTokenId,
      nft2_id: loserTokenId,
      winner_id: winnerTokenId,
      timestamp: Date.now(),
      user_session_id: userSessionId,
      elo_changes: {
        winner_change: ratingChanges.winnerChange,
        loser_change: ratingChanges.loserChange
      }
    });
    
    return {
      winner: { ...updatedWinner, tokenId: winnerTokenId },
      loser: { ...updatedLoser, tokenId: loserTokenId },
      ratingChanges
    };
  } catch (error) {
    console.error('Error recording vote:', error);
    throw error;
  }
};

/**
 * Get leaderboard data (top and bottom NFTs)
 * @param {number} limit - Number of NFTs to get for each category
 * @returns {Promise<Object>} Top and bottom NFTs
 */
export const getLeaderboard = async (limit = 10) => {
  try {
    const nftsRef = ref(database, NFTS_PATH);
    const snapshot = await get(nftsRef);
    
    if (!snapshot.exists()) {
      return { topNFTs: [], bottomNFTs: [] };
    }
    
    const nftsData = snapshot.val();
    const nftsArray = Object.entries(nftsData).map(([tokenId, data]) => {
      // Ensure we have the correct OpenSea URL with the right contract address
      const correctOpenseaUrl = `https://opensea.io/assets/ethereum/0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2/${tokenId}`;
      
      return {
        ...data,
        tokenId,
        // Update OpenSea URL to use correct contract address
        opensea_url: correctOpenseaUrl,
        // If the image URL contains the wrong contract address, try to fix it
        image: data.image && data.image.includes('0x6dc6001535e15b9def7b0fcf0e7e4b9c0f7c7c7c') 
          ? data.image.replace('0x6dc6001535e15b9def7b0fcf0e7e4b9c0f7c7c7c', '0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2')
          : data.image
      };
    });
    
    // Sort by Elo score
    nftsArray.sort((a, b) => b.elo_score - a.elo_score);
    
    const totalCount = nftsArray.length;
    const bottomNFTs = nftsArray.slice(-limit).reverse(); // Reverse to show lowest first
    
    // Add proper ranking to bottom NFTs (their actual position in the full leaderboard)
    const bottomNFTsWithRank = bottomNFTs.map((nft, index) => ({
      ...nft,
      actualRank: totalCount - limit + index + 1 // Calculate actual rank from bottom
    }));
    
    return {
      topNFTs: nftsArray.slice(0, limit),
      bottomNFTs: bottomNFTsWithRank,
      totalCount
    };
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    throw error;
  }
};

/**
 * Check if user has already voted on this pair in current session
 * @param {string} tokenId1 - First NFT token ID
 * @param {string} tokenId2 - Second NFT token ID
 * @param {string} userSessionId - User session identifier
 * @returns {Promise<boolean>} Whether user has voted on this pair
 */
export const hasUserVotedOnPair = async (tokenId1, tokenId2, userSessionId) => {
  try {
    const sessionsRef = ref(database, VOTING_SESSIONS_PATH);
    const snapshot = await get(sessionsRef);
    
    if (!snapshot.exists()) {
      return false;
    }
    
    const sessions = snapshot.val();
    const userSessions = Object.values(sessions).filter(session => 
      session.user_session_id === userSessionId
    );
    
    // Check if this exact pair (in either order) has been voted on
    return userSessions.some(session => 
      (session.nft1_id === tokenId1 && session.nft2_id === tokenId2) ||
      (session.nft1_id === tokenId2 && session.nft2_id === tokenId1)
    );
  } catch (error) {
    console.error('Error checking user vote history:', error);
    return false;
  }
};

/**
 * Generate or get user session ID
 * @returns {string} User session identifier
 */
export const getUserSessionId = () => {
  let sessionId = localStorage.getItem('heroOrZeroSessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('heroOrZeroSessionId', sessionId);
  }
  return sessionId;
};
