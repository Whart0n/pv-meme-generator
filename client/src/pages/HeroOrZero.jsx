import React, { useState, useEffect } from 'react';
import NFTCard from '../components/NFTCard.jsx';
import HeroZeroLeaderboard from '../components/HeroZeroLeaderboard.jsx';
import VoteResults from '../components/VoteResults.jsx';
import { getRandomNFTPair, recordVote, getUserSessionId, hasUserVotedOnPair } from '../utils/firebaseNFT.js';

const HeroOrZero = () => {
  const [nftPair, setNftPair] = useState([null, null]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState(null);
  const [voteResults, setVoteResults] = useState(null);
  const [userSessionId] = useState(() => getUserSessionId());

  useEffect(() => {
    loadNewPair();
  }, []);

  const loadNewPair = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let attempts = 0;
      let newPair;
      
      // Try to find a pair the user hasn't voted on
      do {
        newPair = await getRandomNFTPair();
        attempts++;
        
        // If we've tried 10 times, just use the current pair
        if (attempts >= 10) break;
        
        const hasVoted = await hasUserVotedOnPair(
          newPair[0].tokenId, 
          newPair[1].tokenId, 
          userSessionId
        );
        
        if (!hasVoted) break;
      } while (attempts < 10);
      
      setNftPair(newPair);
    } catch (err) {
      console.error('Error loading NFT pair:', err);
      setError('Failed to load NFTs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (winnerTokenId) => {
    if (voting || !nftPair[0] || !nftPair[1]) return;

    try {
      setVoting(true);
      
      const loserTokenId = nftPair[0].tokenId === winnerTokenId 
        ? nftPair[1].tokenId 
        : nftPair[0].tokenId;

      const results = await recordVote(winnerTokenId, loserTokenId, userSessionId);
      setVoteResults(results);
    } catch (err) {
      console.error('Error recording vote:', err);
      setError('Failed to record vote. Please try again.');
      setVoting(false);
    }
  };

  const handleNextPair = () => {
    setVoteResults(null);
    setVoting(false);
    loadNewPair();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Hero or Zero
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Vote on MetaHero NFTs in head-to-head battles
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-pulse">
                  <div className="w-full h-64 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-pulse">
                  <div className="w-full h-64 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="lg:w-80">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-pulse">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Hero or Zero
            </h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={loadNewPair}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Hero or Zero
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Vote on MetaHero NFTs in head-to-head battles
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Choose which NFT is the Hero and which is the Zero
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Voting Area */}
          <div className="flex-1">
            {nftPair[0] && nftPair[1] ? (
              <>
                {/* VS Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-green-500 rounded-full text-white font-bold text-xl">
                    VS
                  </div>
                </div>

                {/* NFT Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                  <NFTCard
                    nft={nftPair[0]}
                    onVote={handleVote}
                    voteType="hero"
                    isVoting={voting}
                    showStats={true}
                  />
                  <NFTCard
                    nft={nftPair[1]}
                    onVote={handleVote}
                    voteType="zero"
                    isVoting={voting}
                    showStats={true}
                  />
                </div>

                {/* Instructions */}
                <div className="text-center mt-8">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Click <span className="font-semibold text-green-600">HERO</span> for the NFT you prefer, 
                    or <span className="font-semibold text-red-600">ZERO</span> for the one you don't
                  </p>
                  <button
                    onClick={loadNewPair}
                    disabled={voting}
                    className="px-4 py-2 text-sm bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    Skip This Pair
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-400">
                  No NFTs available for voting
                </p>
              </div>
            )}
          </div>

          {/* Leaderboard Sidebar */}
          <div className="lg:w-80">
            <HeroZeroLeaderboard />
          </div>
        </div>
      </div>

      {/* Vote Results Modal */}
      {voteResults && (
        <VoteResults
          winner={voteResults.winner}
          loser={voteResults.loser}
          ratingChanges={voteResults.ratingChanges}
          onNextPair={handleNextPair}
        />
      )}
    </div>
  );
};

export default HeroOrZero;
