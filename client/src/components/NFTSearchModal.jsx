import React, { useState } from 'react';
import { getOrCreateNFT } from '../utils/firebaseNFT';

const NFTSearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [nftData, setNftData] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError('');
    setNftData(null);

    try {
      // Extract just the number if the user pastes a full URL or includes #
      const tokenId = searchTerm.replace(/[^0-9]/g, '');
      if (!tokenId) {
        throw new Error('Please enter a valid token ID');
      }

      const data = await getOrCreateNFT(tokenId);
      if (!data) {
        throw new Error('NFT not found');
      }
      
      setNftData({
        ...data,
        tokenId: tokenId,
        name: data.name || `MetaHero #${tokenId}`,
        image: data.image || `https://i.imgur.com/y1Fgevh.png`,
        elo_score: data.elo_score || 1000,
        wins: data.wins || 0,
        losses: data.losses || 0,
        total_votes: (data.wins || 0) + (data.losses || 0)
      });
    } catch (err) {
      console.error('Error searching for NFT:', err);
      setError(err.message || 'Failed to fetch NFT data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Search MetaHero NFT
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter MetaHero token ID"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !searchTerm.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </form>

          {nftData && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={nftData.image}
                    alt={nftData.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {nftData.name}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Token ID:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {nftData.tokenId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Elo Score:</span>
                      <span className="font-semibold text-blue-600">
                        {nftData.elo_score}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Wins:</span>
                      <span className="font-semibold text-green-600">
                        {nftData.wins}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Losses:</span>
                      <span className="font-semibold text-red-600">
                        {nftData.losses}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Total Votes:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {nftData.total_votes}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a
                      href={`https://opensea.io/assets/ethereum/0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2/${nftData.tokenId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      View on OpenSea
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTSearchModal;
