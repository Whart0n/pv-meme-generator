import React, { useState, useEffect, useCallback } from 'react';
import NFTCard from '../components/NFTCard.jsx';
import HeroZeroLeaderboard from '../components/HeroZeroLeaderboard.jsx';
import VoteResults from '../components/VoteResults.jsx';
import AuthModal from '../components/AuthModal.jsx';
import ErrorBoundary from '../components/ErrorBoundary.jsx';
import Footer from '../components/Footer.jsx';
import { useAuth } from '../contexts/AuthContext';
import { getRandomNFTPair, recordVote, getUserSessionId, hasUserVotedOnPair, prefetchNFTPairs } from '../utils/firebaseNFT.js';
import * as IndexedDB from '../utils/indexedDBCache.js';

const HeroOrZeroContent = () => {
  const [nftPair, setNftPair] = useState([null, null]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState(null);
  const [voteResults, setVoteResults] = useState(null);
  const [userSessionId] = useState(() => getUserSessionId());
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { currentUser } = useAuth();

  // Initialize IndexedDB when component mounts
  useEffect(() => {
    // Initialize IndexedDB
    IndexedDB.initIndexedDB().catch(err => {
      console.error('Error initializing IndexedDB:', err);
    });
    
    // Clear expired items from IndexedDB periodically
    const intervalId = setInterval(() => {
      IndexedDB.clearExpiredItems().catch(err => {
        console.error('Error clearing expired items:', err);
      });
    }, 30 * 60 * 1000); // Every 30 minutes
    
    return () => clearInterval(intervalId);
  }, []);

  // Load initial pair
  useEffect(() => {
    loadNewPair();
    
    // Prefetch additional pairs in the background
    prefetchNFTPairs(5).catch(err => {
      console.error('Error prefetching NFT pairs:', err);
    });
  }, []);

  const loadNewPair = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let attempts = 0;
      let newPair;
      let lastError;
      
      // Try to find a pair the user hasn't voted on
      do {
        try {
          // Use true for prefetch to ensure we always have pairs ready
          newPair = await getRandomNFTPair(true);
          
          // Validate the pair
          if (!newPair || !Array.isArray(newPair) || newPair.length !== 2 || !newPair[0] || !newPair[1]) {
            throw new Error('Invalid NFT pair received');
          }
          
          const hasVoted = await hasUserVotedOnPair(
            newPair[0].tokenId, 
            newPair[1].tokenId, 
            userSessionId
          );
          
          if (!hasVoted) break;
        } catch (err) {
          console.error('Error in loadNewPair attempt:', err);
          lastError = err;
        }
        
        attempts++;
        
        // If we've tried 5 times, show error or use the last pair if we have one
        if (attempts >= 5) {
          if (newPair) {
            console.warn('Using last valid pair after multiple attempts');
            break;
          }
          throw lastError || new Error('Failed to load valid NFT pair after multiple attempts');
        }
      } while (true);
      
      setNftPair(newPair);
      
      // Prefetch more pairs in the background after loading this one
      prefetchNFTPairs().catch(err => {
        console.error('Error prefetching NFT pairs:', err);
      });
    } catch (err) {
      console.error('Error loading NFT pair:', err);
      setError('Failed to load NFTs. Please try again.');
      // Set default/empty state to prevent UI from breaking
      setNftPair([null, null]);
    } finally {
      setLoading(false);
    }
  }, [userSessionId]);

  const handleVote = useCallback(async (winnerTokenId) => {
    if (voting || !nftPair[0] || !nftPair[1]) {
      return;
    }

    try {
      setVoting(true);
      
      const loserTokenId = nftPair[0].tokenId === winnerTokenId 
        ? nftPair[1].tokenId 
        : nftPair[0].tokenId;

      // Record vote using batch update

      // Prefetch more pairs right after voting for next rounds
      prefetchNFTPairs().catch(err => {
        console.error('Error prefetching NFT pairs after vote:', err);
      });
      // Note: recordVote already invalidates the leaderboard cache internally
      const results = await recordVote(winnerTokenId, loserTokenId, userSessionId);
      
      setVoteResults(results);
      
      // Reset voting state after successful vote
      setVoting(false);
    } catch (err) {
      console.error('Error recording vote:', err);
      setError('Failed to record vote. Please try again.');
      setVoting(false);
    }
  }, [nftPair, voting, userSessionId]);

  const handleNextPair = useCallback(() => {
    setVoteResults(null);
    setVoting(false);
    loadNewPair();
    
    // Prefetch more pairs in the background
    prefetchNFTPairs().catch(err => {
      console.error('Error prefetching NFT pairs:', err);
    });
  }, [loadNewPair]);

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
          ratingChanges={{
            winnerChange: voteResults.winner.change,
            loserChange: voteResults.loser.change
          }}
          onNextPair={handleNextPair}
        />
      )}

      {/* Auth Modal */}
      {authModalOpen && <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />}
    </div>
  );
};

const HeroOrZero = () => (
  <div className="flex flex-col min-h-screen">
    <div className="flex-grow">
      <ErrorBoundary>
        <HeroOrZeroContent />
      </ErrorBoundary>
    </div>
    <Footer />
  </div>
);

export default HeroOrZero;
