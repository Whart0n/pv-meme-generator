import React from 'react';

const NFTCard = ({ nft, onVote, isVoting, showStats = false }) => {
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

  // Handle missing or broken images
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Available';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105 flex flex-col h-full">
      {/* NFT Image */}
      <div className="relative" style={{ paddingTop: '100%' }}>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <img
            src={nft.image || 'https://via.placeholder.com/400x400?text=Loading...'}
            alt={nft.name}
            className="max-w-full max-h-full object-contain p-2"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center'
            }}
            loading="lazy"
            onError={handleImageError}
          />
        </div>
        {showStats && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
            Elo: {nft.elo_score || 'N/A'}
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
        <div className="mt-auto">
          {/* Vote Button */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleVoteClick}
              disabled={isVoting}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                'bg-blue-500 hover:bg-blue-600 text-white'
              } ${isVoting ? 'opacity-50 cursor-not-allowed' : ''} flex items-center justify-center gap-2`}
            >
              {isVoting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Voting...
                </>
              ) : (
                <>
                  <span>👑</span> Select as Hero
                </>
              )}
            </button>
          </div>

          {/* OpenSea Link */}
          <a
            href={nft.opensea_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-b-lg transition-colors duration-200 group"
            title="View on OpenSea"
          >
            <span className="group-hover:text-blue-500 transition-colors">View on</span>
            <svg width="24" height="24" viewBox="0 0 318 318" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
              <path d="M252.072 212.292C245.826 220.662 232.686 234.558 225.378 234.558H191.412V212.274H218.466C222.336 212.274 226.026 210.708 228.69 207.954C242.586 193.554 250.614 176.418 250.614 158.04C250.614 126.684 227.178 98.964 191.394 82.26V67.284C191.394 60.84 186.174 55.62 179.73 55.62C173.286 55.62 168.066 60.84 168.066 67.284V73.494C158.04 70.56 147.42 68.328 136.332 67.05C154.692 86.994 165.906 113.67 165.906 142.92C165.906 169.146 156.942 193.23 141.876 212.31H168.066V234.63H129.726C124.542 234.63 120.33 230.436 120.33 225.234V215.478C120.33 213.768 118.944 212.364 117.216 212.364H66.672C65.682 212.364 64.836 213.174 64.836 214.164C64.8 254.088 96.39 284.058 134.172 284.058H240.822C266.382 284.058 277.812 251.298 292.788 230.454C298.602 222.39 312.552 215.91 316.782 214.11C317.556 213.786 318.006 213.066 318.006 212.22V199.26C318.006 197.946 316.71 196.956 315.432 197.316C315.432 197.316 253.782 211.482 253.062 211.68C252.342 211.896 252.072 212.31 252.072 212.31V212.292Z" 
                fill="currentColor" 
                className="text-gray-700 dark:text-gray-200 group-hover:text-blue-500 transition-colors"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
