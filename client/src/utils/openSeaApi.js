import axios from 'axios';

const OPENSEA_API_V2 = 'https://api.opensea.io/api/v2';
const OPENSEA_API_V1 = 'https://api.opensea.io/api/v1';
const METAHERO_CONTRACT = '0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2'.toLowerCase(); // Ensure lowercase for consistency
const API_KEY = import.meta.env.VITE_OPENSEA_API_KEY;

// Log the contract address being used
console.log('Using MetaHero contract address:', METAHERO_CONTRACT);

if (!API_KEY) {
  console.warn('OpenSea API key is not set. Please add VITE_OPENSEA_API_KEY to your environment variables.');
}

// Create axios instance with default headers
const openSeaV2Api = axios.create({
  baseURL: OPENSEA_API_V2,
  headers: {
    'X-API-KEY': API_KEY || '',
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (compatible; PV-Meme-Generator/1.0)'
  },
  timeout: 10000 // 10 second timeout
});

const openSeaV1Api = axios.create({
  baseURL: OPENSEA_API_V1,
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
  console.log(`Fetching metadata for token ${tokenId} from contract ${METAHERO_CONTRACT}`);
  
  try {
    // First try the v2 API
    const v2Url = `/chain/ethereum/contract/${METAHERO_CONTRACT}/nfts/${tokenId}`;
    console.log('Trying v2 API:', v2Url);
    
    const response = await openSeaV2Api.get(v2Url, {
      validateStatus: (status) => status < 500 // Don't throw for 4xx errors
    });

    if (response.status === 200 && response.data && response.data.nft) {
      // Process v2 response
      const nft = response.data.nft;
      console.log('Successfully fetched from v2 API:', nft);
      
      return {
        tokenId: tokenId,
        name: nft.name || `MetaHero #${tokenId}`,
        image: nft.image_url || nft.image_preview_url || nft.image_thumbnail_url,
        traits: nft.traits || [],
        opensea_url: nft.opensea_url || `https://opensea.io/assets/ethereum/${METAHERO_CONTRACT}/${tokenId}`,
        description: nft.description || ''
      };
    }

    // If v2 fails, try v1 API
    console.log('v2 API failed, trying v1 API...');
    const v1Url = `/asset/${METAHERO_CONTRACT}/${tokenId}/`;
    console.log('Trying v1 API:', v1Url);
    
    const v1Response = await openSeaV1Api.get(v1Url);
    const nft = v1Response.data;
    
    if (!nft) {
      throw new Error('No NFT data received from OpenSea');
    }
    
    console.log('Successfully fetched from v1 API:', nft);
    
    return {
      tokenId: tokenId,
      name: nft.name || `MetaHero #${tokenId}`,
      image: nft.image_url || nft.image_preview_url || nft.image_thumbnail_url,
      traits: nft.traits || [],
      opensea_url: nft.permalink || `https://opensea.io/assets/ethereum/${METAHERO_CONTRACT}/${tokenId}`,
      description: nft.description || ''
    };
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
    console.log('Fetching collection stats...');
    
    // First try v2 API with contract address
    const v2Response = await openSeaV2Api.get(`/collections/${METAHERO_CONTRACT}/stats`, {
      validateStatus: (status) => status < 500
    });

    if (v2Response.status === 200) {
      console.log('Successfully fetched stats from v2 API');
      return v2Response.data.stats || v2Response.data; // Handle both formats
    }

    // Fallback to v1 API with contract address
    console.log('v2 API failed, trying v1 API...');
    const v1Response = await openSeaV1Api.get(
      `/collection/${METAHERO_CONTRACT}/stats`,
      { validateStatus: (status) => status < 500 }
    );

    if (v1Response.status === 200) {
      console.log('Successfully fetched stats from v1 API');
      return v1Response.data.stats || v1Response.data;
    }
    
    throw new Error(`Failed to fetch collection stats: ${v1Response.status}`);
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
  console.log(`Fetching ${limit} NFTs from collection...`);
  
  try {
    // First try v2 API
    const params = new URLSearchParams({
      limit: Math.min(limit, 50).toString(), // Max 50 per request
      ...(cursor && { next: cursor })
    });

    console.log('Trying v2 API with params:', params.toString());
    const v2Response = await openSeaV2Api.get(
      `/chain/ethereum/contract/${METAHERO_CONTRACT}/nfts?${params}`,
      { validateStatus: (status) => status < 500 }
    );

    if (v2Response.status === 200) {
      console.log(`Successfully fetched ${v2Response.data.nfts?.length || 0} NFTs from v2 API`);
      return {
        nfts: (v2Response.data.nfts || []).map(nft => ({
          tokenId: nft.identifier,
          name: nft.name || `MetaHero #${nft.identifier}`,
          image: nft.image_url || nft.display_image_url,
          traits: nft.traits || [],
          opensea_url: `https://opensea.io/assets/ethereum/${METAHERO_CONTRACT}/${nft.identifier}`,
          description: nft.description || ''
        })),
        next: v2Response.data.next
      };
    }

    // Fallback to v1 API
    console.log('v2 API failed, trying v1 API...');
    const v1Params = new URLSearchParams({
      asset_contract_address: METAHERO_CONTRACT,
      limit: Math.min(limit, 30).toString(), // V1 has lower limit
      ...(cursor && { cursor })
    });

    console.log('Trying v1 API with params:', v1Params.toString());
    const v1Response = await openSeaV1Api.get(
      `/assets?${v1Params}`,
      { validateStatus: (status) => status < 500 }
    );
    
    if (v1Response.status !== 200) {
      throw new Error(`Failed to fetch NFTs: ${v1Response.status} ${v1Response.statusText}`);
    }

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
