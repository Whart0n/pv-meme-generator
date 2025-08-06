/**
 * Utility functions for handling MetaHero contract addresses
 */

// The correct MetaHero contract address
export const CORRECT_CONTRACT = '0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2';

// Known incorrect contract addresses that might appear in data
export const INCORRECT_CONTRACTS = [
  '0x6dc6001535e15b9def7b0fcf0e7e4b9c0f7c7c7c',
  // Add any other incorrect variations here if discovered
];

/**
 * Normalizes a contract address to ensure the correct one is used
 * @param {string} address - The contract address to normalize
 * @returns {string} The correct contract address
 */
export const normalizeContractAddress = (address) => {
  if (!address) return CORRECT_CONTRACT;
  
  const lowerAddress = address.toLowerCase();
  
  // Check if this is one of our known incorrect addresses
  if (INCORRECT_CONTRACTS.some(badAddress => lowerAddress.includes(badAddress))) {
    return CORRECT_CONTRACT;
  }
  
  return address;
};

/**
 * Fixes image URLs that might contain incorrect contract addresses
 * @param {string} imageUrl - The image URL to fix
 * @returns {string} The corrected image URL
 */
export const fixImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  
  let fixedUrl = imageUrl;
  
  // Replace any incorrect contract addresses in the URL
  INCORRECT_CONTRACTS.forEach(badContract => {
    if (fixedUrl.includes(badContract)) {
      fixedUrl = fixedUrl.replace(badContract, CORRECT_CONTRACT);
      console.log(`Fixed image URL: replaced ${badContract} with ${CORRECT_CONTRACT}`);
    }
  });
  
  // Check if the URL contains any contract address but not the correct one
  // This handles cases where there might be other incorrect variations
  if (fixedUrl.includes('0x') && !fixedUrl.includes(CORRECT_CONTRACT)) {
    // Extract the contract address pattern (0x followed by 40 hex characters)
    const contractMatch = fixedUrl.match(/0x[a-fA-F0-9]{40}/);
    if (contractMatch) {
      const foundContract = contractMatch[0];
      if (foundContract !== CORRECT_CONTRACT) {
        console.log(`Found unexpected contract address: ${foundContract}, replacing with correct one`);
        fixedUrl = fixedUrl.replace(foundContract, CORRECT_CONTRACT);
      }
    }
  }
  
  return fixedUrl;
};

/**
 * Fixes OpenSea URLs to ensure they use the correct contract address
 * @param {string} tokenId - The NFT token ID
 * @returns {string} A properly formatted OpenSea URL
 */
export const getCorrectOpenSeaUrl = (tokenId) => {
  return `https://opensea.io/assets/ethereum/${CORRECT_CONTRACT}/${tokenId}`;
};
