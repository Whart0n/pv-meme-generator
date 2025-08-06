/**
 * Utility for monitoring and reporting image loading issues
 */

// Store information about broken images
const brokenImages = new Map();

/**
 * Record a broken image
 * @param {string} imageUrl - The URL of the broken image
 * @param {string} tokenId - The NFT token ID associated with the image
 * @param {string} context - Where the image was being displayed
 */
export const recordBrokenImage = (imageUrl, tokenId, context) => {
  const key = tokenId || imageUrl;
  
  if (!brokenImages.has(key)) {
    brokenImages.set(key, {
      tokenId,
      imageUrl,
      firstSeen: new Date().toISOString(),
      occurrences: 0,
      contexts: new Set()
    });
  }
  
  const record = brokenImages.get(key);
  record.occurrences++;
  record.lastSeen = new Date().toISOString();
  record.contexts.add(context);
  
  // Log to console for debugging
  console.warn(`Broken NFT image detected: TokenID=${tokenId}, URL=${imageUrl}, Context=${context}, Occurrences=${record.occurrences}`);
  
  // If this is a recurring issue, log more details
  if (record.occurrences > 3) {
    console.error('Recurring image issue detected:', record);
  }
};

/**
 * Get statistics about broken images
 * @returns {Object} Statistics about broken images
 */
export const getBrokenImageStats = () => {
  return {
    totalBrokenImages: brokenImages.size,
    details: Array.from(brokenImages.values()).map(record => ({
      ...record,
      contexts: Array.from(record.contexts)
    }))
  };
};

/**
 * Clear the broken images record
 */
export const clearBrokenImageRecords = () => {
  brokenImages.clear();
};
