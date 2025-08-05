/**
 * Elo Rating System for NFT voting
 * Initial rating: 1500
 * K-factor: 32 (high for faster rating changes)
 */

const INITIAL_ELO = 1500;
const K_FACTOR = 32;

/**
 * Calculate expected score for a player
 * @param {number} ratingA - Rating of player A
 * @param {number} ratingB - Rating of player B
 * @returns {number} Expected score (0-1)
 */
export const calculateExpectedScore = (ratingA, ratingB) => {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
};

/**
 * Calculate new Elo ratings after a match
 * @param {number} winnerRating - Current rating of the winner
 * @param {number} loserRating - Current rating of the loser
 * @returns {Object} New ratings for both players
 */
export const calculateNewRatings = (winnerRating, loserRating) => {
  const expectedWinner = calculateExpectedScore(winnerRating, loserRating);
  const expectedLoser = calculateExpectedScore(loserRating, winnerRating);
  
  // Winner gets 1 point, loser gets 0 points
  const newWinnerRating = Math.round(winnerRating + K_FACTOR * (1 - expectedWinner));
  const newLoserRating = Math.round(loserRating + K_FACTOR * (0 - expectedLoser));
  
  return {
    winnerRating: newWinnerRating,
    loserRating: newLoserRating,
    winnerChange: newWinnerRating - winnerRating,
    loserChange: newLoserRating - loserRating
  };
};

/**
 * Get initial NFT data structure
 * @param {Object} nftMetadata - NFT metadata from OpenSea
 * @returns {Object} Initial NFT data for Firebase
 */
export const createInitialNFTData = (nftMetadata) => {
  return {
    ...nftMetadata,
    elo_score: INITIAL_ELO,
    wins: 0,
    losses: 0,
    total_votes: 0,
    random_index: Math.random(),
    last_updated: Date.now(),
    created_at: Date.now()
  };
};

/**
 * Update NFT data after a vote
 * @param {Object} nftData - Current NFT data
 * @param {boolean} isWinner - Whether this NFT won the vote
 * @param {number} newEloScore - New Elo score
 * @returns {Object} Updated NFT data
 */
export const updateNFTAfterVote = (nftData, isWinner, newEloScore) => {
  return {
    ...nftData,
    elo_score: newEloScore,
    wins: nftData.wins + (isWinner ? 1 : 0),
    losses: nftData.losses + (isWinner ? 0 : 1),
    total_votes: nftData.total_votes + 1,
    last_updated: Date.now()
  };
};
