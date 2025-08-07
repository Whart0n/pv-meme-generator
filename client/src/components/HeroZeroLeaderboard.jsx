import React, { useState, useEffect, useCallback } from 'react';
import { getLeaderboard } from '../utils/firebaseNFT.js';
import * as IndexedDB from '../utils/indexedDBCache.js';
import { fixImageUrl } from '../utils/contractUtils.js';
import NFTSearchModal from './NFTSearchModal';
import VirtualizedList from './VirtualizedList.jsx';

const HeroZeroLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState({ topNFTs: [], bottomNFTs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(Date.now());
  const [refreshAvailable, setRefreshAvailable] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  
  // Check if refresh is available every minute
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (Date.now() - lastRefreshed > 5 * 60 * 1000) {
        setRefreshAvailable(true);
      }
    }, 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, [lastRefreshed]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      
      // Get leaderboard data with caching
      const data = await getLeaderboard(10, forceRefresh);
      
      // Update state
      setLeaderboardData(data);
      setLastRefreshed(Date.now());
      setRefreshAvailable(false);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      
      // Try to get cached leaderboard data as fallback
      try {
        const cachedData = await IndexedDB.getLeaderboard();
        if (cachedData) {
          console.log('Using cached leaderboard data');
          setLeaderboardData(cachedData);
        } else {
          setError('Failed to load leaderboard');
        }
      } catch (cacheErr) {
        console.error('Error getting cached leaderboard:', cacheErr);
        setError('Failed to load leaderboard');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const LeaderboardSection = ({ title, nfts, isTop = true }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
        {isTop ? '🏆' : '💀'} {title}
      </h3>
      <div style={{ height: Math.min(nfts.length * 56, 560), maxHeight: 560 }}>
        <VirtualizedList
          items={nfts}
          itemHeight={56} // px, matches row height
          overscan={4}
          renderItem={(nft, index) => (
            <div
              key={nft.tokenId}
              className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              style={{ height: '56px' }}
            >
              {/* Rank */}
              <div className="flex-shrink-0 w-8 text-center">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {isTop ? index + 1 : (nft.actualRank || `${nfts.length - index}`)}
                </span>
              </div>

              {/* NFT Image */}
              <div className="flex-shrink-0">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-12 h-12 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>

              {/* NFT Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {nft.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Elo: {nft.elo_score}</span>
                  <span>•</span>
                  <span>{nft.wins}W-{nft.losses}L</span>
                </div>
              </div>

              {/* OpenSea Link */}
              <div className="flex-shrink-0">
                <a
                  href={nft.opensea_url || `https://opensea.io/assets/ethereum/0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2/${nft.tokenId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-gray-400 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  aria-label="View on OpenSea"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 mb-3">
              <div className="w-6 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchLeaderboard}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-fit sticky top-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Leaderboard</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowSearchModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-medium transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search NFT by ID
          </button>
          <div className="flex items-center space-x-2">
            {refreshAvailable && (
              <span className="text-xs text-blue-500 mr-2">New data available</span>
            )}
            <button
              onClick={() => fetchLeaderboard(true)}
              className={`p-2 ${refreshAvailable ? 'text-blue-500 hover:text-blue-700' : 'text-gray-500 hover:text-gray-700'} dark:text-gray-400 dark:hover:text-gray-200 transition-colors`}
              title="Refresh leaderboard"
              disabled={!refreshAvailable}
            >
              <svg
                className={`w-5 h-5 ${refreshAvailable ? 'animate-pulse' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Leaderboard Sections */}
      <div className="space-y-6">
        <LeaderboardSection 
          title="Top Heroes" 
          nfts={leaderboardData.topNFTs} 
          isTop={true} 
        />
        <LeaderboardSection 
          title="Absolute Zeroes" 
          nfts={leaderboardData.bottomNFTs} 
          isTop={false} 
        />
      </div>
      
      {/* NFT Search Modal */}
      <NFTSearchModal 
        isOpen={showSearchModal} 
        onClose={() => setShowSearchModal(false)} 
      />
    </div>
  );
};

export default HeroZeroLeaderboard;
