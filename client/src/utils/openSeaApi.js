import axios from 'axios';

const OPENSEA_API_V2 = 'https://api.opensea.io/api/v2';
const OPENSEA_API_V1 = 'https://api.opensea.io/api/v1';
const METAHERO_CONTRACT = '0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2'.toLowerCase();
const OPENSEA_COLLECTION_SLUG = 'metahero-og'; // Collection slug for OpenSea URLs
const REFERRAL_ADDRESS = '0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2'; // For OpenSea referral links
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
        opensea_url: nft.opensea_url || `https://opensea.io/assets/ethereum/${METAHERO_CONTRACT}/${tokenId}?ref=${REFERRAL_ADDRESS}`,
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
      opensea_url: nft.permalink || `https://opensea.io/collection/${OPENSEA_COLLECTION_SLUG}/${tokenId}?ref=${REFERRAL_ADDRESS}`,
      description: nft.description || ''
    };
    return {
      tokenId: tokenId,
      name: nft.name || `MetaHero #${tokenId}`,
      image: nft.image_url || nft.display_image_url,
      traits: nft.traits || [],
      opensea_url: `https://opensea.io/collection/${OPENSEA_COLLECTION_SLUG}/${tokenId}?ref=${REFERRAL_ADDRESS}`,
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
      opensea_url: `https://opensea.io/collection/${OPENSEA_COLLECTION_SLUG}/${tokenId}?ref=${REFERRAL_ADDRESS}`,
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
    console.log('Fetching collection stats for MetaHero...');
    
    // First try v2 API with collection slug
    const v2Response = await openSeaV2Api.get(`/collections/${OPENSEA_COLLECTION_SLUG}/stats`, {
      validateStatus: (status) => status < 500
    });

    if (v2Response.status === 200 && v2Response.data) {
      console.log('Successfully fetched stats from v2 API:', v2Response.data);
      return v2Response.data;
    }

    // Fallback to v1 API with collection slug
    console.log('v2 API failed, trying v1 API...');
    const v1Response = await openSeaV1Api.get(
      `/collection/${OPENSEA_COLLECTION_SLUG}/stats`,
      { validateStatus: (status) => status < 500 }
    );

    if (v1Response.status === 200 && v1Response.data && v1Response.data.stats) {
      console.log('Successfully fetched stats from v1 API:', v1Response.data.stats);
      return v1Response.data.stats;
    }
    
    throw new Error(`Failed to fetch collection stats: v2=${v2Response.status}, v1=${v1Response.status}`);
  } catch (error) {
    console.error('Error fetching collection stats:', error);
    // Return default stats instead of throwing
    return {
      total_volume: 0,
      total_supply: 8144, // Current known size
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
 * Get random token IDs from the collection using dynamic collection size
 * @param {number} count - Number of random IDs to generate
 * @returns {Promise<Array<string>>} Array of random token IDs
 */
export const getRandomTokenIds = async (count = 2) => {
  // Default values
  const KNOWN_COLLECTION_SIZE = 8144; // Last known collection size
  const MIN_VALID_ID = 1;
  const MAX_ATTEMPTS = 50; // Prevent infinite loops
  
  try {
    // Try to fetch current collection stats to get total supply
    let maxTokenId = KNOWN_COLLECTION_SIZE;
    
    try {
      const stats = await fetchCollectionStats();
      // Validate the stats response
      if (stats && typeof stats.total_supply === 'number' && stats.total_supply > 0) {
        maxTokenId = Math.floor(stats.total_supply);
        console.log(`Using collection size from API: ${maxTokenId}`);
      } else {
        console.warn('Invalid total_supply from API, using fallback');
      }
    } catch (apiError) {
      console.warn('Error fetching collection stats, using fallback size:', apiError.message);
    }
    
    // Ensure we have a valid maxTokenId
    if (typeof maxTokenId !== 'number' || maxTokenId < MIN_VALID_ID) {
      console.warn(`Invalid maxTokenId: ${maxTokenId}, using fallback`);
      maxTokenId = KNOWN_COLLECTION_SIZE;
    }
    
    console.log(`Generating ${count} random token IDs from collection of size ${maxTokenId}`);
    
    const tokenIds = [];
    const usedIds = new Set();
    let attempts = 0;
    
    while (tokenIds.length < count && attempts < MAX_ATTEMPTS) {
      attempts++;
      const randomId = Math.floor(Math.random() * maxTokenId) + 1;
      
      // Skip if we've already used this ID
      if (usedIds.has(randomId)) {
        continue;
      }
      
      // Ensure the ID is within valid range
      if (randomId >= MIN_VALID_ID && randomId <= maxTokenId) {
        usedIds.add(randomId);
        tokenIds.push(randomId.toString());
      }
    }
    
    // If we couldn't generate enough unique IDs, log a warning
    if (tokenIds.length < count) {
      console.warn(`Only generated ${tokenIds.length} unique IDs after ${attempts} attempts`);
    }
    
    console.log('Generated random token IDs:', tokenIds);
    return tokenIds;
    
  } catch (error) {
    console.error('Unexpected error in getRandomTokenIds:', error);
    
    // Fallback to simple random generation with known size
    console.log('Falling back to default random generation');
    const tokenIds = [];
    const usedIds = new Set();
    
    for (let i = 0; i < count; i++) {
      let randomId;
      let attempts = 0;
      
      // Try to find a unique ID, but don't loop forever
      do {
        randomId = Math.floor(Math.random() * KNOWN_COLLECTION_SIZE) + 1;
        attempts++;
      } while (usedIds.has(randomId) && attempts < MAX_ATTEMPTS);
      
      if (attempts < MAX_ATTEMPTS) {
        usedIds.add(randomId);
        tokenIds.push(randomId.toString());
      }
    }
    
    return tokenIds;
  }
};
