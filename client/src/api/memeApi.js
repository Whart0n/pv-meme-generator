// Meme API for saving and upvoting memes in Firebase
import { database } from '../firebase';
import { ref, push, update, get, query, orderByChild, limitToLast } from 'firebase/database';

/**
 * Save a meme to the database.
 * @param {Object} meme - { imageUrl, templateId, createdAt, createdBy }
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
 * Get top memes by upvotes
 * @param {number} limit
 */
export async function getTopMemes(limit = 20) {
  const memesRef = query(ref(database, 'memes'), orderByChild('upvotes'), limitToLast(limit));
  const snap = await get(memesRef);
  const memes = [];
  snap.forEach(child => memes.push({ id: child.key, ...child.val() }));
  // Highest upvotes last, so reverse
  return memes.reverse();
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
    if (meme.templateId === templateId) memes.push({ id: child.key, ...meme });
  });
  // Sort by createdAt descending
  memes.sort((a, b) => b.createdAt - a.createdAt);
  return memes.slice(0, limit);
}
