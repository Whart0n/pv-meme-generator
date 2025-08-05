/**
 * IndexedDB utility for offline caching of Hero or Zero data
 * Provides methods to store and retrieve NFT data and leaderboard information
 */

// Database configuration
const DB_NAME = 'heroZeroDB';
const DB_VERSION = 1;
const STORES = {
  NFTS: 'nfts',
  LEADERBOARD: 'leaderboard',
  PAIRS: 'pairs'
};

/**
 * Initialize the IndexedDB database
 * @returns {Promise<IDBDatabase>} The database instance
 */
export const initIndexedDB = () => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      console.warn('IndexedDB not supported by this browser');
      return reject('IndexedDB not supported');
    }
    
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains(STORES.NFTS)) {
        db.createObjectStore(STORES.NFTS, { keyPath: 'tokenId' });
      }
      
      if (!db.objectStoreNames.contains(STORES.LEADERBOARD)) {
        db.createObjectStore(STORES.LEADERBOARD, { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains(STORES.PAIRS)) {
        db.createObjectStore(STORES.PAIRS, { autoIncrement: true });
      }
    };
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Store an NFT in IndexedDB
 * @param {Object} nft - The NFT object to store
 * @returns {Promise<void>}
 */
export const storeNFT = async (nft) => {
  try {
    const db = await initIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.NFTS], 'readwrite');
      const store = transaction.objectStore(STORES.NFTS);
      
      // Add timestamp for cache expiration
      const nftWithTimestamp = {
        ...nft,
        cachedAt: Date.now()
      };
      
      const request = store.put(nftWithTimestamp);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      
      transaction.oncomplete = () => db.close();
    });
  } catch (error) {
    console.error('Error storing NFT in IndexedDB:', error);
  }
};

/**
 * Get an NFT from IndexedDB by token ID
 * @param {string} tokenId - The token ID of the NFT
 * @param {number} maxAge - Maximum age of the cached data in milliseconds (default: 1 hour)
 * @returns {Promise<Object|null>} The NFT object or null if not found or expired
 */
export const getNFT = async (tokenId, maxAge = 60 * 60 * 1000) => {
  try {
    const db = await initIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.NFTS], 'readonly');
      const store = transaction.objectStore(STORES.NFTS);
      const request = store.get(tokenId);
      
      request.onsuccess = () => {
        const nft = request.result;
        
        // Check if NFT exists and is not expired
        if (nft && (Date.now() - nft.cachedAt <= maxAge)) {
          resolve(nft);
        } else {
          resolve(null);
        }
      };
      
      request.onerror = () => reject(request.error);
      
      transaction.oncomplete = () => db.close();
    });
  } catch (error) {
    console.error('Error getting NFT from IndexedDB:', error);
    return null;
  }
};

/**
 * Store leaderboard data in IndexedDB
 * @param {Object} data - The leaderboard data to store
 * @returns {Promise<void>}
 */
export const storeLeaderboard = async (data) => {
  try {
    const db = await initIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.LEADERBOARD], 'readwrite');
      const store = transaction.objectStore(STORES.LEADERBOARD);
      
      const leaderboardWithTimestamp = {
        id: 'current', // Single entry that gets updated
        data,
        cachedAt: Date.now()
      };
      
      const request = store.put(leaderboardWithTimestamp);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      
      transaction.oncomplete = () => db.close();
    });
  } catch (error) {
    console.error('Error storing leaderboard in IndexedDB:', error);
  }
};

/**
 * Get leaderboard data from IndexedDB
 * @param {number} maxAge - Maximum age of the cached data in milliseconds (default: 5 minutes)
 * @returns {Promise<Object|null>} The leaderboard data or null if not found or expired
 */
export const getLeaderboard = async (maxAge = 5 * 60 * 1000) => {
  try {
    const db = await initIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.LEADERBOARD], 'readonly');
      const store = transaction.objectStore(STORES.LEADERBOARD);
      const request = store.get('current');
      
      request.onsuccess = () => {
        const leaderboard = request.result;
        
        // Check if leaderboard exists and is not expired
        if (leaderboard && (Date.now() - leaderboard.cachedAt <= maxAge)) {
          resolve(leaderboard.data);
        } else {
          resolve(null);
        }
      };
      
      request.onerror = () => reject(request.error);
      
      transaction.oncomplete = () => db.close();
    });
  } catch (error) {
    console.error('Error getting leaderboard from IndexedDB:', error);
    return null;
  }
};

/**
 * Store NFT pairs in IndexedDB for future use
 * @param {Array} pairs - Array of NFT pairs to store
 * @returns {Promise<void>}
 */
export const storePairs = async (pairs) => {
  try {
    const db = await initIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.PAIRS], 'readwrite');
      const store = transaction.objectStore(STORES.PAIRS);
      
      // Clear existing pairs first
      store.clear();
      
      // Add timestamp to each pair
      const pairsWithTimestamp = pairs.map(pair => ({
        pair,
        cachedAt: Date.now()
      }));
      
      // Add each pair to the store
      let completed = 0;
      pairsWithTimestamp.forEach(item => {
        const request = store.add(item);
        request.onsuccess = () => {
          completed++;
          if (completed === pairsWithTimestamp.length) {
            resolve();
          }
        };
        request.onerror = () => reject(request.error);
      });
      
      transaction.oncomplete = () => db.close();
    });
  } catch (error) {
    console.error('Error storing NFT pairs in IndexedDB:', error);
  }
};

/**
 * Get a random NFT pair from IndexedDB
 * @param {number} maxAge - Maximum age of the cached pairs in milliseconds (default: 1 hour)
 * @returns {Promise<Array|null>} An NFT pair or null if none found or all expired
 */
export const getRandomPair = async (maxAge = 60 * 60 * 1000) => {
  try {
    const db = await initIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.PAIRS], 'readwrite');
      const store = transaction.objectStore(STORES.PAIRS);
      const request = store.openCursor();
      
      // Get all valid pairs
      const validPairs = [];
      
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        
        if (cursor) {
          const item = cursor.value;
          
          // Check if pair is not expired
          if (Date.now() - item.cachedAt <= maxAge) {
            validPairs.push({ id: cursor.key, ...item });
          }
          
          cursor.continue();
        } else {
          // No more pairs
          if (validPairs.length > 0) {
            // Select a random pair
            const randomIndex = Math.floor(Math.random() * validPairs.length);
            const selectedPair = validPairs[randomIndex];
            
            // Remove the selected pair from the store
            store.delete(selectedPair.id);
            
            resolve(selectedPair.pair);
          } else {
            resolve(null);
          }
        }
      };
      
      request.onerror = () => reject(request.error);
      
      transaction.oncomplete = () => db.close();
    });
  } catch (error) {
    console.error('Error getting random pair from IndexedDB:', error);
    return null;
  }
};

/**
 * Clear expired items from all stores
 * @returns {Promise<void>}
 */
export const clearExpiredItems = async () => {
  try {
    const db = await initIndexedDB();
    const transaction = db.transaction([STORES.NFTS, STORES.PAIRS], 'readwrite');
    
    // Clear expired NFTs (older than 1 day)
    const nftStore = transaction.objectStore(STORES.NFTS);
    const nftRequest = nftStore.openCursor();
    const nftMaxAge = 24 * 60 * 60 * 1000; // 1 day
    
    nftRequest.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        const nft = cursor.value;
        if (Date.now() - nft.cachedAt > nftMaxAge) {
          nftStore.delete(cursor.key);
        }
        cursor.continue();
      }
    };
    
    // Clear expired pairs (older than 1 hour)
    const pairsStore = transaction.objectStore(STORES.PAIRS);
    const pairsRequest = pairsStore.openCursor();
    const pairsMaxAge = 60 * 60 * 1000; // 1 hour
    
    pairsRequest.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        const item = cursor.value;
        if (Date.now() - item.cachedAt > pairsMaxAge) {
          pairsStore.delete(cursor.key);
        }
        cursor.continue();
      }
    };
    
    return new Promise((resolve) => {
      transaction.oncomplete = () => {
        db.close();
        resolve();
      };
    });
  } catch (error) {
    console.error('Error clearing expired items from IndexedDB:', error);
  }
};
