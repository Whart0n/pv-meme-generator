import { database } from '../client/src/firebase.js';
import { ref, get, update, query, orderByChild } from 'firebase/database';

// Path to your NFTs in the database
const NFTS_PATH = 'metahero-nfts';

/**
 * Migrate all NFTs to add a random_index field if it doesn't exist
 */
async function migrateNFTs() {
  try {
    console.log('Starting migration to add random_index to NFTs...');
    
    // Get all NFTs
    const nftsRef = ref(database, NFTS_PATH);
    const snapshot = await get(nftsRef);
    
    if (!snapshot.exists()) {
      console.log('No NFTs found in the database.');
      return;
    }
    
    const updates = {};
    let count = 0;
    
    // Check each NFT and add random_index if it doesn't exist
    snapshot.forEach((childSnapshot) => {
      const nft = childSnapshot.val();
      if (nft.random_index === undefined) {
        updates[`${childSnapshot.key}/random_index`] = Math.random();
        count++;
      }
    });
    
    if (count === 0) {
      console.log('All NFTs already have a random_index. No migration needed.');
      return;
    }
    
    console.log(`Updating ${count} NFTs with random_index...`);
    
    // Apply all updates in a single batch
    await update(ref(database), updates);
    
    console.log(`Successfully updated ${count} NFTs with random_index.`);
    
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

// Run the migration
migrateNFTs()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
