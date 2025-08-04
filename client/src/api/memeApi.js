// Meme API for saving and upvoting memes in Firebase
import { database } from '../firebase';
import { ref, push, update, get, query, orderByChild, limitToLast, remove } from 'firebase/database';
import dataCache from '../utils/dataCache';

/**
 * Save a meme to the database.
 * @param {Object} meme - { imgDataUrl, templateId, createdAt, createdBy }
 * @returns {Promise<string>} Meme ID
 */
export async function saveMeme(meme) {
  const memesRef = ref(database, 'memes');
  const newMemeRef = push(memesRef);
  await update(newMemeRef, {
    ...meme,
    upvotes: 0,
    upvotedBy: {}, // session/user ids
  });
  
  // Update template usage count
  if (meme.templateId) {
    const templateUsageRef = ref(database, `templateUsage/${meme.templateId}`);
    await update(templateUsageRef, {
      lastUsed: Date.now(),
      usageCount: (await get(templateUsageRef)).val()?.usageCount + 1 || 1
    });
  }
  
  return newMemeRef.key;
}

/**
 * Upvote a meme if not already upvoted by this user/session.
 * @param {string} memeId
 * @param {string} voterId
 */
export async function upvoteMeme(memeId, voterId) {
  const memeRef = ref(database, `memes/${memeId}`);
  const snap = await get(memeRef);
  if (!snap.exists()) return false;
  const meme = snap.val();
  if (meme.upvotedBy && meme.upvotedBy[voterId]) return false;
  await update(memeRef, {
    upvotes: (meme.upvotes || 0) + 1,
    [`upvotedBy/${voterId}`]: true,
  });
  return true;
}

/**
 * Get top memes by upvotes with caching
 * @param {number} limit
 * @param {boolean} forceRefresh - Skip cache and fetch fresh data
 */
export async function getTopMemes(limit = 20, forceRefresh = false) {
  const cacheKey = `top-memes-${limit}`;
  
  // Check cache first (unless force refresh)
  if (!forceRefresh) {
    const cachedData = dataCache.get(cacheKey);
    if (cachedData) {
      console.log('[Cache] Using cached leaderboard data');
      return cachedData;
    }
  }
  
  try {
    console.log('[API] Fetching fresh leaderboard data from Firebase');
    // Fetch all memes without ordering to avoid Firebase query limitations
    const memesRef = ref(database, 'memes');
    const snap = await get(memesRef);
    
    const memes = [];
    snap.forEach(child => {
      const memeData = { id: child.key, ...child.val() };
      memes.push(memeData);
    });
    
    // Sort by upvotes descending (client-side sorting)
    memes.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    
    // Return top memes up to the limit
    const result = memes.slice(0, limit);
    
    // Cache the result for 2 minutes
    dataCache.set(cacheKey, result, 2 * 60 * 1000);
    
    return result;
  } catch (error) {
    console.error('ERROR in getTopMemes:', error);
    throw error;
  }
}

/**
 * Get recent memes for a template
 * @param {string} templateId
 * @param {number} limit
 */
export async function getRecentMemesByTemplate(templateId, limit = 10) {
  const memesRef = query(ref(database, 'memes'), orderByChild('templateId'));
  const snap = await get(memesRef);
  const memes = [];
  snap.forEach(child => {
    const meme = child.val();
    if (meme.templateId === templateId) {
      // Defensive: skip if missing required fields or upvotes not a number
      if (typeof meme.upvotes !== 'number' || !meme.templateId || !meme.templateName || !meme.createdAt) {
        console.warn('Skipping invalid meme in recent memes:', meme);
        return;
      }
      memes.push({ id: child.key, ...meme });
    }
  });
  // Sort by createdAt descending
  memes.sort((a, b) => b.createdAt - a.createdAt);
  return memes.slice(0, limit);
}

/**
 * Delete a meme by id (admin only)
 * @param {string} memeId
 */
export async function deleteMeme(memeId) {
  const memeRef = ref(database, `memes/${memeId}`);
  await remove(memeRef);
}

/**
 * Reorder templates based on usage statistics
 * @returns {Promise<void>}
 */
export async function reorderTemplatesByUsage() {
  try {
    // Get all templates
    const templatesRef = ref(database, 'templates');
    const templatesSnap = await get(templatesRef);
    
    if (!templatesSnap.exists()) return;
    
    const templates = [];
    const templateUsagePromises = [];
    
    // Get usage data for each template
    templatesSnap.forEach((template) => {
      const templateData = { id: template.key, ...template.val() };
      templates.push(templateData);
      
      // Get usage data for this template
      const usageRef = ref(database, `templateUsage/${template.key}`);
      templateUsagePromises.push(get(usageRef).then((snap) => ({
        id: template.key,
        usage: snap.val() || { usageCount: 0, lastUsed: 0 }
      })));
    });
    
    // Wait for all usage data to be fetched
    const usages = await Promise.all(templateUsagePromises);
    
    // Create a map of template ID to usage data
    const usageMap = usages.reduce((acc, { id, usage }) => ({
      ...acc,
      [id]: usage
    }), {});
    
    // Sort templates by usage count (descending) and then by last used (descending)
    const sortedTemplates = [...templates].sort((a, b) => {
      const usageA = usageMap[a.id] || { usageCount: 0, lastUsed: 0 };
      const usageB = usageMap[b.id] || { usageCount: 0, lastUsed: 0 };
      
      // First sort by usage count (descending)
      if (usageA.usageCount !== usageB.usageCount) {
        return usageB.usageCount - usageA.usageCount;
      }
      
      // If usage counts are equal, sort by last used (descending)
      return usageB.lastUsed - usageA.lastUsed;
    });
    
    // Update the order in the database
    const updates = {};
    sortedTemplates.forEach((template, index) => {
      updates[`templates/${template.id}/order`] = index;
    });
    
    await update(ref(database), updates);
    
    console.log('Templates reordered by usage');
  } catch (error) {
    console.error('Error reordering templates by usage:', error);
    throw error;
  }
}

// Force ES module context for Vite/Vercel build
export {};
