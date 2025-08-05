#!/usr/bin/env node

/**
 * Migration script to fix NFT data with incorrect contract addresses
 * This script updates existing NFT records in Firebase to use the correct contract address
 */

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, update } from 'firebase/database';

// Firebase configuration - you'll need to update this with your config
const firebaseConfig = {
  // Add your Firebase config here
  databaseURL: process.env.FIREBASE_DATABASE_URL || "https://your-project-default-rtdb.firebaseio.com/"
};

const INCORRECT_CONTRACT = '0x6dc6001535e15b9def7b0fcf0e7e4b9c0f7c7c7c';
const CORRECT_CONTRACT = '0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2';
const NFTS_PATH = 'metahero-nfts';

async function fixContractAddresses() {
  try {
    console.log('🔧 Starting contract address migration...');
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    
    // Get all NFT data
    const nftsRef = ref(database, NFTS_PATH);
    const snapshot = await get(nftsRef);
    
    if (!snapshot.exists()) {
      console.log('❌ No NFT data found in database');
      return;
    }
    
    const nftsData = snapshot.val();
    const tokenIds = Object.keys(nftsData);
    
    console.log(`📊 Found ${tokenIds.length} NFTs to check`);
    
    let updatedCount = 0;
    const updates = {};
    
    // Process each NFT
    for (const tokenId of tokenIds) {
      const nft = nftsData[tokenId];
      let needsUpdate = false;
      const updatedNft = { ...nft };
      
      // Fix OpenSea URL if it contains incorrect contract
      if (nft.opensea_url && nft.opensea_url.includes(INCORRECT_CONTRACT)) {
        updatedNft.opensea_url = nft.opensea_url.replace(INCORRECT_CONTRACT, CORRECT_CONTRACT);
        needsUpdate = true;
        console.log(`🔗 Fixing OpenSea URL for NFT ${tokenId}`);
      }
      
      // Fix image URL if it contains incorrect contract
      if (nft.image && nft.image.includes(INCORRECT_CONTRACT)) {
        updatedNft.image = nft.image.replace(INCORRECT_CONTRACT, CORRECT_CONTRACT);
        needsUpdate = true;
        console.log(`🖼️  Fixing image URL for NFT ${tokenId}`);
      }
      
      // Ensure correct OpenSea URL format
      if (!nft.opensea_url || !nft.opensea_url.includes(CORRECT_CONTRACT)) {
        updatedNft.opensea_url = `https://opensea.io/assets/ethereum/${CORRECT_CONTRACT}/${tokenId}`;
        needsUpdate = true;
        console.log(`✅ Setting correct OpenSea URL for NFT ${tokenId}`);
      }
      
      if (needsUpdate) {
        updates[`${NFTS_PATH}/${tokenId}`] = updatedNft;
        updatedCount++;
      }
    }
    
    if (updatedCount === 0) {
      console.log('✅ All NFTs already have correct contract addresses');
      return;
    }
    
    console.log(`🚀 Updating ${updatedCount} NFTs with correct contract addresses...`);
    
    // Apply all updates in a single batch
    await update(ref(database), updates);
    
    console.log(`✅ Successfully updated ${updatedCount} NFTs`);
    console.log('🎉 Contract address migration completed!');
    
  } catch (error) {
    console.error('❌ Error during migration:', error);
    process.exit(1);
  }
}

// Run the migration
if (import.meta.url === `file://${process.argv[1]}`) {
  fixContractAddresses()
    .then(() => {
      console.log('Migration finished successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

export default fixContractAddresses;
