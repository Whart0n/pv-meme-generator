import { database } from '../firebase.js';
import { ref, get, set, update, push, query, orderByChild, limitToFirst, limitToLast } from 'firebase/database';
import { fetchNFTMetadata } from './openSeaApi.js';
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
 * Get two random NFTs for voting
 * @returns {Promise<Array>} Array of two NFT objects
 */
export const getRandomNFTPair = async () => {
  try {
    // Get all NFTs to select from
    const nftsRef = ref(database, NFTS_PATH);
    const snapshot = await get(nftsRef);
    
    let availableTokenIds = [];
    
    if (snapshot.exists()) {
      // Use existing NFTs from database
      availableTokenIds = Object.keys(snapshot.val());
    }
    
    // If we have less than 50 NFTs, add some random ones
    while (availableTokenIds.length < 50) {
      const randomId = Math.floor(Math.random() * 10000) + 1;
      if (!availableTokenIds.includes(randomId.toString())) {
        availableTokenIds.push(randomId.toString());
      }
    }
    
    // Select two random different NFTs
    const shuffled = availableTokenIds.sort(() => 0.5 - Math.random());
    const selectedIds = shuffled.slice(0, 2);
    
    // Get or create both NFTs
    const [nft1, nft2] = await Promise.all([
      getOrCreateNFT(selectedIds[0]),
      getOrCreateNFT(selectedIds[1])
    ]);
    
    return [
      { ...nft1, tokenId: selectedIds[0] },
      { ...nft2, tokenId: selectedIds[1] }
    ];
  } catch (error) {
    console.error('Error getting random NFT pair:', error);
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
    const nftsArray = Object.entries(nftsData).map(([tokenId, data]) => ({
      ...data,
      tokenId
    }));
    
    // Sort by Elo score
    nftsArray.sort((a, b) => b.elo_score - a.elo_score);
    
    return {
      topNFTs: nftsArray.slice(0, limit),
      bottomNFTs: nftsArray.slice(-limit).reverse() // Reverse to show lowest first
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
