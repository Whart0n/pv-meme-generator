import { database } from '../firebase';
import { ref, get, update } from 'firebase/database';

// Constants
const NFTS_PATH = 'nfts';
const INCORRECT_CONTRACT = '0x6dc6001535e15b9def7b0fcf0e7e4b9c0f7c7c7c';
const CORRECT_CONTRACT = '0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2';

/**
 * Migration script to fix NFTs with incorrect contract addresses
 * This will update all NFTs in the database that have incorrect contract addresses
 * in their opensea_url or image URLs
 */
export const migrateNFTContractAddresses = async () => {
  try {
    console.log('Starting NFT contract address migration...');
    
    // Get all NFTs from the database
    const nftsRef = ref(database, NFTS_PATH);
    const snapshot = await get(nftsRef);
    
    if (!snapshot.exists()) {
      console.log('No NFTs found in the database.');
      return { success: false, message: 'No NFTs found' };
    }
    
    const nftsData = snapshot.val();
    const updates = {};
    let updatedCount = 0;
    let totalCount = 0;
    
    // Process each NFT
    Object.entries(nftsData).forEach(([tokenId, data]) => {
      totalCount++;
      let needsUpdate = false;
      const updatedData = { ...data };
      
      // Check and fix opensea_url
      if (data.opensea_url && data.opensea_url.includes(INCORRECT_CONTRACT)) {
        updatedData.opensea_url = data.opensea_url.replace(
          INCORRECT_CONTRACT, 
          CORRECT_CONTRACT
        );
        needsUpdate = true;
        console.log(`Fixed opensea_url for NFT ${tokenId}`);
      }
      
      // Ensure opensea_url exists and is correct
      if (!data.opensea_url || !data.opensea_url.includes(CORRECT_CONTRACT)) {
        updatedData.opensea_url = `https://opensea.io/assets/ethereum/${CORRECT_CONTRACT}/${tokenId}`;
        needsUpdate = true;
        console.log(`Created/updated opensea_url for NFT ${tokenId}`);
      }
      
      // Check and fix image URL
      if (data.image && data.image.includes(INCORRECT_CONTRACT)) {
        updatedData.image = data.image.replace(
          INCORRECT_CONTRACT, 
          CORRECT_CONTRACT
        );
        needsUpdate = true;
        console.log(`Fixed image URL for NFT ${tokenId}`);
      }
      
      // If any changes were made, add to updates
      if (needsUpdate) {
        updates[`${NFTS_PATH}/${tokenId}`] = updatedData;
        updatedCount++;
      }
    });
    
    // Apply all updates in a single transaction
    if (Object.keys(updates).length > 0) {
      await update(ref(database), updates);
      console.log(`Successfully updated ${updatedCount} NFTs with correct contract addresses.`);
      return { 
        success: true, 
        message: `Updated ${updatedCount} of ${totalCount} NFTs with correct contract addresses.` 
      };
    } else {
      console.log('No NFTs needed updating.');
      return { 
        success: true, 
        message: `All ${totalCount} NFTs already have correct contract addresses.` 
      };
    }
    
  } catch (error) {
    console.error('Error migrating NFT contract addresses:', error);
    return { 
      success: false, 
      message: `Error migrating NFT contract addresses: ${error.message}` 
    };
  }
};

export default migrateNFTContractAddresses;
