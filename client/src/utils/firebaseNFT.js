import { database, auth } from '../firebase.js';
import { isAdmin } from '../utils/adminUtils.js';
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
import { createInitialNFTData, updateNFTAfterVote, calculateNewRatings, INITIAL_ELO } from './eloRating.js';
import * as IndexedDB from './indexedDBCache.js';

// Database paths
const NFTS_PATH = 'metahero-nfts';
const VOTING_SESSIONS_PATH = 'voting-sessions';
const USER_SESSIONS_PATH = 'user-sessions';
const USERS_PATH = 'users';

// Memory cache configuration
const nftCache = new Map();
const MEMORY_CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes

// Leaderboard cache configuration
let leaderboardCache = null;
let lastLeaderboardFetch = 0;
const LEADERBOARD_CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

/**
 * Get or create NFT data in Firebase
 * @param {string} tokenId - Token ID of the NFT
 * @returns {Promise<Object>} NFT data
 */
export const getOrCreateNFT = async (tokenId) => {
  try {
    // Check memory cache first (fastest)
    const cachedNFT = nftCache.get(tokenId);
    if (cachedNFT && (Date.now() - cachedNFT.cachedAt < MEMORY_CACHE_EXPIRY)) {
      return cachedNFT.data;
    }
    
    // Check IndexedDB cache next (offline support)
    const indexedDBNFT = await IndexedDB.getNFT(tokenId);
    if (indexedDBNFT) {
      // Update memory cache
      nftCache.set(tokenId, { data: indexedDBNFT, cachedAt: Date.now() });
      return indexedDBNFT;
    }
    
    // If not in cache, fetch from Firebase
    const nftRef = ref(database, `${NFTS_PATH}/${tokenId}`);
    const snapshot = await get(nftRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      
      // Update caches
      nftCache.set(tokenId, { data, cachedAt: Date.now() });
      await IndexedDB.storeNFT({ ...data, tokenId });
      
      return data;
    } else {
      // NFT doesn't exist, fetch from OpenSea and create
      console.log(`Fetching NFT ${tokenId} from OpenSea...`);
      const metadata = await fetchNFTMetadata(tokenId);
      
      // Remove traits to reduce data size
      const { traits, ...metadataWithoutTraits } = metadata;
      
      const initialData = createInitialNFTData(metadataWithoutTraits);
      
      // Add random_index for efficient querying
      initialData.random_index = Math.random();
      
      await set(nftRef, initialData);
      
      // Update caches
      nftCache.set(tokenId, { data: initialData, cachedAt: Date.now() });
      await IndexedDB.storeNFT({ ...initialData, tokenId });
      
      return initialData;
    }
  } catch (error) {
    console.error(`Error getting/creating NFT ${tokenId}:`, error);
    throw error;
  }
};

/**
 * Get a random pair of NFTs for voting
 * @param {boolean} prefetch - Whether to prefetch additional pairs for future use
 * @returns {Promise<Array>} Array with two NFT objects
 */
export const getRandomNFTPair = async (prefetch = true) => {
  try {
    // First, check if we have a cached pair from IndexedDB
    const cachedPair = await IndexedDB.getRandomPair();
    if (cachedPair) {
      console.log('Using cached NFT pair from IndexedDB');
      
      // Prefetch more pairs in the background if needed
      if (prefetch) {
        prefetchNFTPairs().catch(err => console.error('Error prefetching NFT pairs:', err));
      }
      
      return cachedPair;
    }
    
    // If no cached pair, fetch from Firebase using random_index
    const nftsRef = ref(database, NFTS_PATH);
    
    // Generate a random value between 0 and 1
    const randomValue = Math.random();
    
    // Query for NFTs with random_index >= randomValue, limited to 10
    const greaterQuery = query(
      nftsRef,
      orderByChild('random_index'),
      startAt(randomValue),
      limitToFirst(10)
    );
    
    // Query for NFTs with random_index < randomValue, limited to 10
    // This ensures we get results even if randomValue is very high
    const lesserQuery = query(
      nftsRef,
      orderByChild('random_index'),
      endAt(randomValue),
      limitToLast(10)
    );
    
    // Execute both queries
    const [greaterSnapshot, lesserSnapshot] = await Promise.all([
      get(greaterQuery),
      get(lesserQuery)
    ]);
    
    // Combine results
    const nfts = [];
    
    if (greaterSnapshot.exists()) {
      greaterSnapshot.forEach(childSnapshot => {
        const tokenId = childSnapshot.key;
        const data = childSnapshot.val();
        
        // Update memory cache
        nftCache.set(tokenId, { data, cachedAt: Date.now() });
        
        // Store in IndexedDB
        IndexedDB.storeNFT({ ...data, tokenId }).catch(err => 
          console.error(`Error storing NFT ${tokenId} in IndexedDB:`, err)
        );
        
        nfts.push({
          ...data,
          tokenId
        });
      });
    }
    
    if (lesserSnapshot.exists()) {
      lesserSnapshot.forEach(childSnapshot => {
        const tokenId = childSnapshot.key;
        const data = childSnapshot.val();
        
        // Update memory cache
        nftCache.set(tokenId, { data, cachedAt: Date.now() });
        
        // Store in IndexedDB
        IndexedDB.storeNFT({ ...data, tokenId }).catch(err => 
          console.error(`Error storing NFT ${tokenId} in IndexedDB:`, err)
        );
        
        nfts.push({
          ...data,
          tokenId
        });
      });
    }
    
    // If we don't have at least 2 NFTs, try a different approach
    if (nfts.length < 2) {
      console.log('Not enough NFTs found with random index query, trying fallback');
      const fallbackSnapshot = await get(query(nftsRef, limitToFirst(20)));
      
      if (fallbackSnapshot.exists()) {
        fallbackSnapshot.forEach(childSnapshot => {
          const tokenId = childSnapshot.key;
          const data = childSnapshot.val();
          
          // Update memory cache
          nftCache.set(tokenId, { data, cachedAt: Date.now() });
          
          // Store in IndexedDB
          IndexedDB.storeNFT({ ...data, tokenId }).catch(err => 
            console.error(`Error storing NFT ${tokenId} in IndexedDB:`, err)
          );
          
          nfts.push({
            ...data,
            tokenId
          });
        });
      }
    }
    
    // If we still don't have enough NFTs, throw an error
    if (nfts.length < 2) {
      throw new Error('Not enough NFTs in the database');
    }
    
    // Shuffle the array
    const shuffled = [...nfts].sort(() => 0.5 - Math.random());
    
    // Generate pairs for current and future use
    const pairs = [];
    for (let i = 0; i < Math.floor(shuffled.length / 2); i++) {
      pairs.push([shuffled[i*2], shuffled[i*2+1]]);
    }
    
    // Store additional pairs for future use
    if (pairs.length > 1 && prefetch) {
      const futurePairs = pairs.slice(1);
      IndexedDB.storePairs(futurePairs).catch(err => 
        console.error('Error storing NFT pairs in IndexedDB:', err)
      );
    }
    
    // Return the first pair
    return pairs[0];
  } catch (error) {
    console.error('Error getting random NFT pair:', error);
    // Fallback to the old method if there's an error
    return getRandomNFTPairFallback();
  }
};

/**
 * Prefetch NFT pairs in the background for future use
 * @param {number} count - Number of pairs to prefetch
 * @returns {Promise<void>}
 */
export const prefetchNFTPairs = async (count = 5) => {
  try {
    // Check if we already have enough pairs cached
    const db = await IndexedDB.initIndexedDB();
    const transaction = db.transaction(['pairs'], 'readonly');
    const store = transaction.objectStore('pairs');
    const countRequest = store.count();
    
    return new Promise((resolve, reject) => {
      countRequest.onsuccess = async () => {
        const existingCount = countRequest.result;
        
        // If we already have enough pairs, don't prefetch more
        if (existingCount >= count) {
          db.close();
          return resolve();
        }
        
        // Otherwise, fetch more pairs
        try {
          // Fetch without using the cache to get fresh pairs
          await getRandomNFTPair(false);
          db.close();
          resolve();
        } catch (error) {
          db.close();
          reject(error);
        }
      };
      
      countRequest.onerror = () => {
        db.close();
        reject(countRequest.error);
      };
    });
  } catch (error) {
    console.error('Error prefetching NFT pairs:', error);
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
    // Initialize winner and loser with default values
    let winner = {
      elo_score: INITIAL_ELO,
      wins: 0,
      losses: 0,
      total_votes: 0,
      name: `MetaHero #${winnerTokenId}`,
      image_url: '',
      external_url: `https://opensea.io/assets/ethereum/0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2/${winnerTokenId}`,
      tokenId: winnerTokenId.toString()
    };

    let loser = {
      elo_score: INITIAL_ELO,
      wins: 0,
      losses: 0,
      total_votes: 0,
      name: `MetaHero #${loserTokenId}`,
      image_url: '',
      external_url: `https://opensea.io/assets/ethereum/0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2/${loserTokenId}`,
      tokenId: loserTokenId.toString()
    };

    // Check memory cache first to reduce Firebase reads
    let needWinnerFetch = true, needLoserFetch = true;

    // Check memory cache
    const cachedWinner = nftCache.get(winnerTokenId);
    if (cachedWinner && (Date.now() - cachedWinner.cachedAt < MEMORY_CACHE_EXPIRY)) {
      winner = { ...winner, ...cachedWinner.data };
      needWinnerFetch = false;
    }

    const cachedLoser = nftCache.get(loserTokenId);
    if (cachedLoser && (Date.now() - cachedLoser.cachedAt < MEMORY_CACHE_EXPIRY)) {
      loser = { ...loser, ...cachedLoser.data };
      needLoserFetch = false;
    }

    // Check IndexedDB if needed
    if (needWinnerFetch) {
      const indexedDBWinner = await IndexedDB.getNFT(winnerTokenId);
      if (indexedDBWinner) {
        winner = { ...winner, ...indexedDBWinner };
        // Update memory cache
        nftCache.set(winnerTokenId, { data: { ...winner }, cachedAt: Date.now() });
        needWinnerFetch = false;
      }
    }

    if (needLoserFetch) {
      const indexedDBLoser = await IndexedDB.getNFT(loserTokenId);
      if (indexedDBLoser) {
        loser = { ...loser, ...indexedDBLoser };
        // Update memory cache
        nftCache.set(loserTokenId, { data: { ...loser }, cachedAt: Date.now() });
        needLoserFetch = false;
      }
    }

    // If still missing, fetch from Firebase
    if (needWinnerFetch || needLoserFetch) {
      const [winnerSnapshot, loserSnapshot] = await Promise.all([
        needWinnerFetch ? get(ref(database, `${NFTS_PATH}/${winnerTokenId}`)) : Promise.resolve(null),
        needLoserFetch ? get(ref(database, `${NFTS_PATH}/${loserTokenId}`)) : Promise.resolve(null)
      ]);

      if (needWinnerFetch && winnerSnapshot?.exists()) {
        winner = { ...winner, ...winnerSnapshot.val() };
        // Ensure required fields are set
        winner.elo_score = winner.elo_score || INITIAL_ELO;
        winner.wins = winner.wins || 0;
        winner.losses = winner.losses || 0;
        winner.total_votes = winner.total_votes || 0;
        // Update caches
        nftCache.set(winnerTokenId, { data: { ...winner }, cachedAt: Date.now() });
        await IndexedDB.storeNFT({ ...winner, tokenId: winnerTokenId });
      }

      if (needLoserFetch && loserSnapshot?.exists()) {
        loser = { ...loser, ...loserSnapshot.val() };
        // Ensure required fields are set
        loser.elo_score = loser.elo_score || INITIAL_ELO;
        loser.wins = loser.wins || 0;
        loser.losses = loser.losses || 0;
        loser.total_votes = loser.total_votes || 0;
        // Update caches
        nftCache.set(loserTokenId, { data: { ...loser }, cachedAt: Date.now() });
        await IndexedDB.storeNFT({ ...loser, tokenId: loserTokenId });
      }
    }

    console.log('Recording vote:', { winnerTokenId, loserTokenId });

    // Ensure all required fields are properly initialized for both NFTs
    const winnerFinal = {
      // Preserve all existing properties
      ...winner,
      // Ensure required fields have default values
      elo_score: typeof winner.elo_score === 'number' ? winner.elo_score : INITIAL_ELO,
      wins: typeof winner.wins === 'number' ? winner.wins : 0,
      losses: typeof winner.losses === 'number' ? winner.losses : 0,
      total_votes: typeof winner.total_votes === 'number' ? winner.total_votes : 0,
      last_updated: Date.now(),
      // Ensure tokenId is set
      tokenId: winnerTokenId.toString(),
      // Ensure name and image_url exist
      name: winner.name || `MetaHero #${winnerTokenId}`,
      image_url: winner.image_url || '',
      external_url: winner.external_url || `https://opensea.io/assets/ethereum/0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2/${winnerTokenId}`
    };

    const loserFinal = {
      // Preserve all existing properties
      ...loser,
      // Ensure required fields have default values
      elo_score: typeof loser.elo_score === 'number' ? loser.elo_score : INITIAL_ELO,
      wins: typeof loser.wins === 'number' ? loser.wins : 0,
      losses: typeof loser.losses === 'number' ? loser.losses : 0,
      total_votes: typeof loser.total_votes === 'number' ? loser.total_votes : 0,
      last_updated: Date.now(),
      // Ensure tokenId is set
      tokenId: loserTokenId.toString(),
      // Ensure name and image_url exist
      name: loser.name || `MetaHero #${loserTokenId}`,
      image_url: loser.image_url || '',
      external_url: loser.external_url || `https://opensea.io/assets/ethereum/0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2/${loserTokenId}`
    };

    console.log('Final NFT data before Elo calculation:', { winner: winnerFinal, loser: loserFinal });

    // Calculate new Elo ratings
    const { winnerRating, loserRating, winnerChange, loserChange } = calculateNewRatings(
      winnerFinal.elo_score,
      loserFinal.elo_score
    );

    console.log('New ratings:', { winnerRating, loserRating, winnerChange, loserChange });

    // Prepare final NFT data with all required fields
    const prepareFinalNFTData = (nft, isWinner, newRating, tokenId) => {
      const updated = updateNFTAfterVote(nft, isWinner, newRating);
      
      // Ensure all required fields exist
      const finalData = {
        ...updated,
        elo_score: typeof updated.elo_score === 'number' ? updated.elo_score : INITIAL_ELO,
        wins: typeof updated.wins === 'number' ? updated.wins : 0,
        losses: typeof updated.losses === 'number' ? updated.losses : 0,
        total_votes: typeof updated.total_votes === 'number' ? updated.total_votes : 0,
        tokenId: tokenId.toString(),
        name: updated.name || `MetaHero #${tokenId}`,
        image_url: updated.image_url || '',
        external_url: updated.external_url || `https://opensea.io/assets/ethereum/0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2/${tokenId}`,
        last_updated: Date.now()
      };
      
      // Validate required fields
      const requiredFields = ['elo_score', 'wins', 'losses', 'total_votes', 'tokenId'];
      const missingFields = requiredFields.filter(field => finalData[field] === undefined);
      
      if (missingFields.length > 0) {
        console.error(`Missing required fields for token ${tokenId}:`, missingFields);
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
      
      return finalData;
    };
    
    // Prepare final data for both NFTs
    const finalWinner = prepareFinalNFTData(winnerFinal, true, winnerRating, winnerTokenId);
    const finalLoser = prepareFinalNFTData(loserFinal, false, loserRating, loserTokenId);
    
    console.log('Final data for Firebase:', { winner: finalWinner, loser: finalLoser });
    
    // Prepare updates for Firebase
    const updates = {};
    updates[`${NFTS_PATH}/${winnerTokenId}`] = finalWinner;
    updates[`${NFTS_PATH}/${loserTokenId}`] = finalLoser;
    
    // We no longer store voting history for regular users
    // Only record session data for admin users
    const currentUser = auth.currentUser;
    const isAdminUser = currentUser && await isAdmin(currentUser);
    
    if (isAdminUser) {
      // Record the voting session for admin only
      const sessionRef = ref(database, VOTING_SESSIONS_PATH);
      const newSessionKey = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      
      const sessionData = {
        nft1_id: winnerTokenId,
        nft2_id: loserTokenId,
        winner_id: winnerTokenId,
        user_session_id: userSessionId,
        timestamp: Date.now(),
        rating_changes: {
          winner: winnerChange,
          loser: loserChange
        }
      };
      
      // Add session data to the batch update
      updates[`${VOTING_SESSIONS_PATH}/${newSessionKey}`] = sessionData;
    }
    
    // Perform the batch update
    await update(ref(database), updates);
    
    // Update memory cache with new data
    nftCache.set(winnerTokenId, { data: finalWinner, cachedAt: Date.now() });
    nftCache.set(loserTokenId, { data: finalLoser, cachedAt: Date.now() });
    
    // Update IndexedDB cache
    await Promise.all([
      IndexedDB.storeNFT({ ...finalWinner, tokenId: winnerTokenId }),
      IndexedDB.storeNFT({ ...finalLoser, tokenId: loserTokenId })
    ]);
    
    // Invalidate leaderboard cache if this vote might affect it
    leaderboardCache = null;
    await IndexedDB.invalidateLeaderboard();
    
    return {
      winner: {
        ...finalWinner,
        tokenId: winnerTokenId,
        oldRating: winnerFinal.elo_score,
        newRating: winnerRating,
        change: winnerChange
      },
      loser: {
        ...finalLoser,
        tokenId: loserTokenId,
        oldRating: loserFinal.elo_score,
        newRating: loserRating,
        change: loserChange
      }
    };
  } catch (error) {
    console.error('Error recording vote:', error);
    throw error;
  }
};

/**
 * Get leaderboard data (top and bottom NFTs)
 * @param {number} limit - Number of NFTs to get for each category
 * @param {boolean} forceRefresh - Force refresh from Firebase instead of using cache
 * @returns {Promise<Object>} Top and bottom NFTs
 */
export const getLeaderboard = async (limit = 10, forceRefresh = false) => {
  try {
    // Check memory cache first if not forcing refresh
    if (!forceRefresh && leaderboardCache && (Date.now() - lastLeaderboardFetch < LEADERBOARD_CACHE_EXPIRY)) {
      return leaderboardCache;
    }
    
    // Check IndexedDB cache next
    if (!forceRefresh) {
      const cachedLeaderboard = await IndexedDB.getLeaderboard();
      if (cachedLeaderboard) {
        leaderboardCache = cachedLeaderboard;
        lastLeaderboardFetch = Date.now();
        return cachedLeaderboard;
      }
    }
    
    // If not in cache or forcing refresh, fetch from Firebase
    // Use separate queries for top and bottom NFTs to minimize data transfer
    const topQuery = query(
      ref(database, NFTS_PATH),
      orderByChild('elo_score'),
      limitToLast(limit)
    );
    
    const bottomQuery = query(
      ref(database, NFTS_PATH),
      orderByChild('elo_score'),
      limitToFirst(limit)
    );
    
    // Execute both queries in parallel
    const [topSnapshot, bottomSnapshot] = await Promise.all([
      get(topQuery),
      get(bottomQuery)
    ]);
    
    // Process top NFTs
    const topNFTs = [];
    if (topSnapshot.exists()) {
      topSnapshot.forEach((childSnapshot) => {
        const tokenId = childSnapshot.key;
        const data = childSnapshot.val();
        
        // Ensure we have the correct OpenSea URL with the right contract address
        const correctOpenseaUrl = `https://opensea.io/assets/ethereum/0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2/${tokenId}`;
        
        // Only include essential fields to minimize data transfer
        topNFTs.push({
          tokenId,
          name: data.name,
          image: data.image && data.image.includes('0x6dc6001535e15b9def7b0fcf0e7e4b9c0f7c7c7c') 
            ? data.image.replace('0x6dc6001535e15b9def7b0fcf0e7e4b9c0f7c7c7c', '0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2')
            : data.image,
          elo_score: data.elo_score,
          wins: data.wins,
          losses: data.losses,
          total_votes: data.total_votes,
          opensea_url: correctOpenseaUrl
        });
      });
    }
    
    // Sort by Elo score (descending)
    topNFTs.sort((a, b) => b.elo_score - a.elo_score);
    
    // Process bottom NFTs
    const bottomNFTs = [];
    if (bottomSnapshot.exists()) {
      bottomSnapshot.forEach((childSnapshot) => {
        const tokenId = childSnapshot.key;
        const data = childSnapshot.val();
        
        // Ensure we have the correct OpenSea URL with the right contract address
        const correctOpenseaUrl = `https://opensea.io/assets/ethereum/0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2/${tokenId}`;
        
        // Only include essential fields to minimize data transfer
        bottomNFTs.push({
          tokenId,
          name: data.name,
          image: data.image && data.image.includes('0x6dc6001535e15b9def7b0fcf0e7e4b9c0f7c7c7c') 
            ? data.image.replace('0x6dc6001535e15b9def7b0fcf0e7e4b9c0f7c7c7c', '0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2')
            : data.image,
          elo_score: data.elo_score,
          wins: data.wins,
          losses: data.losses,
          total_votes: data.total_votes,
          opensea_url: correctOpenseaUrl
        });
      });
    }
    
    // Sort by Elo score (ascending for bottom NFTs)
    bottomNFTs.sort((a, b) => a.elo_score - b.elo_score);
    
    // Get total count (approximate) - we'll use a separate count query
    // This is more efficient than fetching all NFTs
    const countQuery = query(ref(database, NFTS_PATH));
    const countSnapshot = await get(countQuery);
    const totalCount = countSnapshot.exists() ? Object.keys(countSnapshot.val()).length : 0;
    
    // Add proper ranking to bottom NFTs
    const bottomNFTsWithRank = bottomNFTs.map((nft, index) => ({
      ...nft,
      actualRank: totalCount - index // Calculate actual rank from bottom
    }));
    
    // Create result object
    const result = {
      topNFTs,
      bottomNFTs: bottomNFTsWithRank,
      totalCount,
      lastUpdated: Date.now()
    };
    
    // Update caches
    leaderboardCache = result;
    lastLeaderboardFetch = Date.now();
    await IndexedDB.storeLeaderboard(result);
    
    return result;
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    
    // Try to return cached data if available
    if (leaderboardCache) {
      return leaderboardCache;
    }
    
    // Try IndexedDB as last resort
    const cachedLeaderboard = await IndexedDB.getLeaderboard(24 * 60 * 60 * 1000); // Allow 1 day old cache in emergency
    if (cachedLeaderboard) {
      return cachedLeaderboard;
    }
    
    // If all else fails, return empty data
    return { topNFTs: [], bottomNFTs: [], totalCount: 0 };
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
    // We're no longer storing voting history, so we'll use a simplified approach
    // using localStorage to prevent duplicate votes in the same session
    
    const pairKey = [tokenId1, tokenId2].sort().join('_');
    const votedPairs = JSON.parse(localStorage.getItem('heroOrZeroVotedPairs') || '{}');
    
    if (votedPairs[pairKey]) {
      return true;
    }
    
    // If not found, add this pair to localStorage for future checks
    votedPairs[pairKey] = Date.now();
    localStorage.setItem('heroOrZeroVotedPairs', JSON.stringify(votedPairs));
    
    return false;
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
  // If user is authenticated, use their UID as the session ID
  const currentUser = auth.currentUser;
  if (currentUser) {
    return `auth_${currentUser.uid}`;
  }
  
  // Otherwise use a local storage session ID
  let sessionId = localStorage.getItem('heroOrZeroSessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('heroOrZeroSessionId', sessionId);
  }
  return sessionId;
};

/**
 * Get user's voting history
 * @returns {Promise<Array>} Array of user's votes
 */
export const getUserVotingHistory = async () => {
  // We no longer store voting history
  return [];
};

/**
 * Get user's voting stats
 * @returns {Promise<Object>} User voting statistics
 */
export const getUserVotingStats = async () => {
  // We no longer track voting stats
  return {
    totalVotes: 0,
    uniqueNFTs: 0
  };
};
