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
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Select your preferred NFT as the <span className="font-semibold text-blue-500">Hero</span> in each battle.
            The NFT with the most votes becomes the Hero, while the other becomes the Zero.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Voting Area */}
          <div className="flex-1">
            {nftPair[0] && nftPair[1] ? (
              <>
                  {/* NFT Cards with VS in the middle */}
                <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
                  {/* First NFT */}
                  <div className="w-full md:w-5/12">
                    <NFTCard
                      nft={nftPair[0]}
                      onVote={handleVote}
                      isVoting={voting}
                      showStats={true}
                    />
                  </div>
                  
                  {/* VS Badge - Only shown on medium screens and up */}
                  <div className="hidden md:flex items-center justify-center">
                    <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-500 to-green-500 rounded-full text-white font-bold text-2xl shadow-lg">
                      VS
                    </div>
                  </div>
                  
                  {/* Mobile VS Badge - Only shown on small screens */}
                  <div className="md:hidden my-4">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-green-500 rounded-full text-white font-bold text-xl shadow-md">
                      VS
                    </div>
                  </div>
                  
                  {/* Second NFT */}
                  <div className="w-full md:w-5/12">
                    <NFTCard
                      nft={nftPair[1]}
                      onVote={handleVote}
                      isVoting={voting}
                      showStats={true}
                    />
                  </div>
                </div>

                {/* Instructions */}
                <div className="text-center mt-8">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">How to Vote</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Click the <span className="font-semibold">MetaHero you prefer</span>. 
                      The NFT with the most votes becomes the Hero, while the other becomes the Zero.
                    </p>
                  </div>
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
