import axios from 'axios';

const OPENSEA_API_BASE = 'https://api.opensea.io/api/v2';
const METAHERO_CONTRACT = '0x6dc6001535e15b9def7b0fcf0e7e4b9c0f7c7c7c'; // MetaHero contract address
const API_KEY = import.meta.env.VITE_OPENSEA_API_KEY;

if (!API_KEY) {
  console.warn('OpenSea API key is not set. Please add VITE_OPENSEA_API_KEY to your environment variables.');
}

// Create axios instance with default headers
const openSeaApi = axios.create({
  baseURL: OPENSEA_API_BASE,
  headers: {
    'X-API-KEY': API_KEY || '',
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (compatible; PV-Meme-Generator/1.0)'
  },
  timeout: 10000 // 10 second timeout
});

/**
 * Fetch NFT metadata from OpenSea API
 * @param {string} tokenId - The token ID of the NFT
 * @returns {Promise<Object>} NFT metadata
 */
export const fetchNFTMetadata = async (tokenId) => {
  try {
    // First try the v2 API
    const response = await openSeaApi.get(`/chain/ethereum/contract/${METAHERO_CONTRACT}/nfts/${tokenId}`, {
      validateStatus: (status) => status < 500 // Don't throw for 4xx errors
    });

    if (response.status === 404) {
      // Fallback to v1 API if v2 fails
      const v1Response = await axios.get(
        `https://api.opensea.io/api/v1/asset/${METAHERO_CONTRACT}/${tokenId}/`,
        {
          headers: {
            'X-API-KEY': API_KEY || '',
            'Accept': 'application/json'
          }
        }
      );
      
      const nft = v1Response.data;
      return {
        tokenId: tokenId,
        name: nft.name || `MetaHero #${tokenId}`,
        image: nft.image_url || nft.image_preview_url || nft.image_thumbnail_url,
        traits: nft.traits || [],
        opensea_url: nft.permalink || `https://opensea.io/assets/ethereum/${METAHERO_CONTRACT}/${tokenId}`,
        description: nft.description || ''
      };
    }
    
    // Process v2 response
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
    // Return a fallback object instead of throwing
    return {
      tokenId: tokenId,
      name: `MetaHero #${tokenId}`,
      image: 'https://i.imgur.com/y1Fgevh.png', // Fallback image
      traits: [],
      opensea_url: `https://opensea.io/assets/ethereum/${METAHERO_CONTRACT}/${tokenId}`,
      description: 'Failed to load NFT metadata'
    };
  }
};

/**
 * Fetch collection stats to get total supply
 * @returns {Promise<Object>} Collection stats
 */
export const fetchCollectionStats = async () => {
  try {
    // Try v2 API first
    const response = await openSeaApi.get(`/collections/metahero-generative/stats`, {
      validateStatus: (status) => status < 500
    });

    if (response.status === 200) {
      return response.data.stats || response.data; // Handle both formats
    }

    // Fallback to v1 API
    const v1Response = await axios.get(
      `https://api.opensea.io/api/v1/collection/metahero-generative/stats`,
      {
        headers: {
          'X-API-KEY': API_KEY || '',
          'Accept': 'application/json'
        }
      }
    );

    return v1Response.data.stats || v1Response.data;
  } catch (error) {
    console.error('Error fetching collection stats:', error);
    // Return default stats instead of throwing
    return {
      total_volume: 0,
      total_supply: 10000, // Default value
      num_owners: 0,
      floor_price: 0,
      average_price: 0
    };
  }
};

/**
 * Fetch multiple NFTs from the collection
 * @param {number} limit - Number of NFTs to fetch
 * @param {string} cursor - Pagination cursor
 * @returns {Promise<Object>} NFTs data with pagination
 */
export const fetchCollectionNFTs = async (limit = 20, cursor = null) => {
  try {
    // First try v2 API
    const params = new URLSearchParams({
      limit: Math.min(limit, 50).toString(), // Max 50 per request
      ...(cursor && { next: cursor })
    });

    const response = await openSeaApi.get(
      `/chain/ethereum/contract/${METAHERO_CONTRACT}/nfts?${params}`,
      { validateStatus: (status) => status < 500 }
    );

    if (response.status === 200) {
      return {
        nfts: (response.data.nfts || []).map(nft => ({
          tokenId: nft.identifier,
          name: nft.name || `MetaHero #${nft.identifier}`,
          image: nft.image_url || nft.display_image_url,
          traits: nft.traits || [],
          opensea_url: `https://opensea.io/assets/ethereum/${METAHERO_CONTRACT}/${nft.identifier}`,
          description: nft.description || ''
        })),
        next: response.data.next
      };
    }

    // Fallback to v1 API
    const v1Params = new URLSearchParams({
      limit: Math.min(limit, 30).toString(), // V1 has lower limit
      ...(cursor && { cursor })
    });

    const v1Response = await axios.get(
      `https://api.opensea.io/api/v1/assets?asset_contract_address=${METAHERO_CONTRACT}&${v1Params}`,
      {
        headers: {
          'X-API-KEY': API_KEY || '',
          'Accept': 'application/json'
        }
      }
    );

    return {
      nfts: (v1Response.data.assets || []).map(asset => ({
        tokenId: asset.token_id,
        name: asset.name || `MetaHero #${asset.token_id}`,
        image: asset.image_url || asset.image_preview_url || asset.image_thumbnail_url,
        traits: asset.traits || [],
        opensea_url: asset.permalink || `https://opensea.io/assets/ethereum/${METAHERO_CONTRACT}/${asset.token_id}`,
        description: asset.description || ''
      })),
      next: v1Response.data.next
    };
  } catch (error) {
    console.error('Error fetching collection NFTs:', error);
    // Return empty result instead of throwing
    return {
      nfts: [],
      next: null
    };
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
