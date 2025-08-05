import React from 'react';

const NFTCard = ({ nft, onVote, voteType, isVoting, showStats = false }) => {
  if (!nft) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-pulse">
        <div className="w-full h-64 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
      </div>
    );
  }

  const handleVoteClick = () => {
    if (!isVoting && onVote) {
      onVote(nft.tokenId);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105">
      {/* NFT Image */}
      <div className="relative">
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full h-64 object-cover"
          loading="lazy"
        />
        {showStats && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
            Elo: {nft.elo_score}
          </div>
        )}
      </div>

      {/* NFT Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {nft.name}
        </h3>

        {/* Stats */}
        {showStats && (
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
            <span>Wins: {nft.wins}</span>
            <span>Losses: {nft.losses}</span>
            <span>Total: {nft.total_votes}</span>
          </div>
        )}

        {/* Traits */}
        {nft.traits && nft.traits.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Traits:
            </h4>
            <div className="flex flex-wrap gap-1">
              {nft.traits.slice(0, 6).map((trait, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded"
                >
                  {trait.trait_type}: {trait.value}
                </span>
              ))}
              {nft.traits.length > 6 && (
                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded">
                  +{nft.traits.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* Vote Button */}
          {onVote && (
            <button
              onClick={handleVoteClick}
              disabled={isVoting}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                voteType === 'hero'
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              } ${
                isVoting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {isVoting ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Voting...
                </div>
              ) : (
                voteType === 'hero' ? '🦸 HERO' : '💀 ZERO'
              )}
            </button>
          )}

          {/* OpenSea Link */}
          <a
            href={nft.opensea_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
            title="View on OpenSea"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm5.568 8.16c-.169-.448-.48-.84-.875-1.092-.395-.252-.856-.384-1.323-.384-.467 0-.928.132-1.323.384-.395.252-.706.644-.875 1.092L12 10.8l-1.172-2.64c-.169-.448-.48-.84-.875-1.092C9.558 6.816 9.097 6.684 8.63 6.684s-.928.132-1.323.384c-.395.252-.706.644-.875 1.092L4.8 12l1.632 3.84c.169.448.48.84.875 1.092.395.252.856.384 1.323.384.467 0 .928-.132 1.323-.384.395-.252.706-.644.875-1.092L12 13.2l1.172 2.64c.169.448.48.84.875 1.092.395.252.856.384 1.323.384.467 0 .928-.132 1.323-.384.395-.252.706-.644.875-1.092L19.2 12l-1.632-3.84z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
