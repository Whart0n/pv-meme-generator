import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../utils/firebaseNFT.js';

const HeroZeroLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState({ topNFTs: [], bottomNFTs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await getLeaderboard(10);
      setLeaderboardData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const LeaderboardSection = ({ title, nfts, isTop = true }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
        {isTop ? '🏆' : '💀'} {title}
      </h3>
      <div className="space-y-2">
        {nfts.map((nft, index) => (
          <div
            key={nft.tokenId}
            className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            {/* Rank */}
            <div className="flex-shrink-0 w-6 text-center">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                {isTop ? index + 1 : `${nfts.length - index}`}
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
                href={nft.opensea_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-blue-500 hover:text-blue-600 transition-colors group"
                title="View on OpenSea"
              >
                <svg width="24" height="24" viewBox="0 0 318 318" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                  <path d="M252.072 212.292C245.826 220.662 232.686 234.558 225.378 234.558H191.412V212.274H218.466C222.336 212.274 226.026 210.708 228.69 207.954C242.586 193.554 250.614 176.418 250.614 158.04C250.614 126.684 227.178 98.964 191.394 82.26V67.284C191.394 60.84 186.174 55.62 179.73 55.62C173.286 55.62 168.066 60.84 168.066 67.284V73.494C158.04 70.56 147.42 68.328 136.332 67.05C154.692 86.994 165.906 113.67 165.906 142.92C165.906 169.146 156.942 193.23 141.876 212.31H168.066V234.63H129.726C124.542 234.63 120.33 230.436 120.33 225.234V215.478C120.33 213.768 118.944 212.364 117.216 212.364H66.672C65.682 212.364 64.836 213.174 64.836 214.164C64.8 254.088 96.39 284.058 134.172 284.058H240.822C266.382 284.058 277.812 251.298 292.788 230.454C298.602 222.39 312.552 215.91 316.782 214.11C317.556 213.786 318.006 213.066 318.006 212.22V199.26C318.006 197.946 316.71 196.956 315.432 197.316C315.432 197.316 253.782 211.482 253.062 211.68C252.342 211.896 252.072 212.31 252.072 212.31V212.292Z" 
                    fill="currentColor" 
                    className="text-blue-500 group-hover:text-blue-600 transition-colors"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Leaderboard
        </h2>
        <button
          onClick={fetchLeaderboard}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          title="Refresh leaderboard"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {leaderboardData.topNFTs.length > 0 && (
          <LeaderboardSection
            title="Top Heroes"
            nfts={leaderboardData.topNFTs}
            isTop={true}
          />
        )}

        {leaderboardData.bottomNFTs.length > 0 && (
          <LeaderboardSection
            title="Bottom Zeros"
            nfts={leaderboardData.bottomNFTs}
            isTop={false}
          />
        )}

        {leaderboardData.topNFTs.length === 0 && leaderboardData.bottomNFTs.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <p>No voting data yet.</p>
            <p className="text-sm mt-1">Start voting to see the leaderboard!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroZeroLeaderboard;
