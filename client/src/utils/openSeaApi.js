import axios from 'axios';

const OPENSEA_API_BASE = 'https://api.opensea.io/api/v2';
const METAHERO_CONTRACT = '0x6dc6001535e15b9def7b0fcf0e7e4b9c0f7c7c7c'; // MetaHero contract address
const API_KEY = import.meta.env.VITE_OPENSEA_API_KEY;

// Create axios instance with default headers
const openSeaApi = axios.create({
  baseURL: OPENSEA_API_BASE,
  headers: {
    'X-API-KEY': API_KEY,
    'Accept': 'application/json'
  }
});

/**
 * Fetch NFT metadata from OpenSea API
 * @param {string} tokenId - The token ID of the NFT
 * @returns {Promise<Object>} NFT metadata
 */
export const fetchNFTMetadata = async (tokenId) => {
  try {
    const response = await openSeaApi.get(`/chain/ethereum/contract/${METAHERO_CONTRACT}/nfts/${tokenId}`);
    const nft = response.data.nft;
    
    return {
      tokenId: tokenId,
      name: nft.name || `MetaHero #${tokenId}`,
      image: nft.image_url || nft.display_image_url,
      traits: nft.traits || [],
      opensea_url: `https://opensea.io/assets/ethereum/${METAHERO_CONTRACT}/${tokenId}`,
      description: nft.description || ''
    };
  } catch (error) {
    console.error(`Error fetching NFT ${tokenId}:`, error);
    throw error;
  }
};

/**
 * Fetch collection stats to get total supply
 * @returns {Promise<Object>} Collection stats
 */
export const fetchCollectionStats = async () => {
  try {
    const response = await openSeaApi.get(`/collections/metahero-generative/stats`);
    return response.data.stats;
  } catch (error) {
    console.error('Error fetching collection stats:', error);
    throw error;
  }
};

/**
 * Fetch multiple NFTs from the collection
 * @param {number} limit - Number of NFTs to fetch
 * @param {string} cursor - Pagination cursor
 * @returns {Promise<Object>} NFTs data with pagination
 */
export const fetchCollectionNFTs = async (limit = 50, cursor = null) => {
  try {
    const params = {
      collection: 'metahero-generative',
      limit: limit
    };
    
    if (cursor) {
      params.next = cursor;
    }
    
    const response = await openSeaApi.get('/collection/metahero-generative/nfts', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching collection NFTs:', error);
    throw error;
  }
};

/**
 * Get random token IDs from a range (assuming MetaHero has sequential token IDs)
 * @param {number} maxTokenId - Maximum token ID in collection
 * @param {number} count - Number of random IDs to generate
 * @returns {Array<string>} Array of random token IDs
 */
export const getRandomTokenIds = (maxTokenId = 10000, count = 2) => {
  const tokenIds = [];
  while (tokenIds.length < count) {
    const randomId = Math.floor(Math.random() * maxTokenId) + 1;
    if (!tokenIds.includes(randomId.toString())) {
      tokenIds.push(randomId.toString());
    }
  }
  return tokenIds;
};
