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
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-500 transition-colors">View on</span>
            <div className="relative h-4 flex items-center">
              <svg width="58" height="15" viewBox="0 0 1160 302" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4">
                <g clipPath="url(#clip0_1_4)">
                  <path d="M285 142C285 217.111 224.111 278 149 278C73.8893 278 13 217.111 13 142C13 66.8893 73.8893 5.99999 149 5.99999C224.111 5.99999 285 66.8893 285 142Z" fill="white"/>
                  <path d="M151.805 0.50158C67.6505 -0.200753 -0.701546 68.1513 0.000786814 152.306C0.70312 234.027 67.4749 300.799 149.171 301.476C233.326 302.204 301.703 233.827 300.976 149.672C300.298 67.9758 233.527 1.20391 151.805 0.50158ZM106.806 75.4004C116.438 87.6411 122.207 103.118 122.207 119.923C122.207 134.472 117.892 148.017 110.468 159.329H58.2944L106.806 75.4004ZM265.884 177.916C265.884 178.618 265.508 179.22 264.856 179.496C261.319 181.001 249.655 186.419 244.789 193.167C232.272 210.6 222.716 237.991 201.345 237.991H112.173C80.5935 237.991 54.1808 212.932 54.2059 179.546C54.2059 178.719 54.9082 178.041 55.7359 178.041H98.0014C99.4562 178.041 100.61 179.22 100.61 180.65V188.802C100.61 193.142 104.122 196.653 108.461 196.653H140.518V177.991H118.62C131.212 162.038 138.712 141.896 138.712 119.973C138.712 95.5172 129.33 73.2182 113.979 56.5377C123.26 57.6163 132.14 59.4725 140.518 61.9307V56.7384C140.518 51.3455 144.882 46.981 150.275 46.981C155.668 46.981 160.032 51.3455 160.032 56.7384V69.255C189.957 83.2264 209.547 106.403 209.547 132.615C209.547 147.992 202.825 162.314 191.211 174.354C188.979 176.662 185.893 177.966 182.658 177.966H160.032V196.603H188.427C194.547 196.603 205.534 184.989 210.751 177.991C210.751 177.991 210.977 177.64 211.579 177.464C212.181 177.289 263.727 165.45 263.727 165.45C264.805 165.149 265.884 165.976 265.884 167.08V177.916Z" fill="#0086FF"/>
                </g>
                <path d="M423.245 216.309C411.338 216.309 400.403 213.514 390.44 207.925C380.477 202.336 372.58 194.621 366.748 184.779C360.916 174.816 358 163.578 358 151.063C358 138.67 360.916 127.553 366.748 117.711C372.58 107.748 380.477 99.9725 390.44 94.3835C400.403 88.7945 411.338 86 423.245 86C435.274 86 446.209 88.7945 456.05 94.3835C466.013 99.9725 473.85 107.748 479.561 117.711C485.393 127.553 488.309 138.67 488.309 151.063C488.309 163.578 485.393 174.816 479.561 184.779C473.85 194.621 466.013 202.336 456.05 207.925C446.087 213.514 435.152 216.309 423.245 216.309ZM423.245 193.527C430.9 193.527 437.643 191.826 443.475 188.424C449.307 184.901 453.863 179.919 457.144 173.48C460.424 167.04 462.065 159.568 462.065 151.063C462.065 142.558 460.424 135.147 457.144 128.829C453.863 122.389 449.307 117.468 443.475 114.066C437.643 110.664 430.9 108.963 423.245 108.963C415.591 108.963 408.787 110.664 402.833 114.066C397.001 117.468 392.445 122.389 389.165 128.829C385.884 135.147 384.244 142.558 384.244 151.063C384.244 159.568 385.884 167.04 389.165 173.48C392.445 179.919 397.001 184.901 402.833 188.424C408.787 191.826 415.591 193.527 423.245 193.527Z" fill="currentColor" className="text-gray-700 dark:text-gray-200 group-hover:text-blue-500"/>
                <path d="M525.516 128.646C528.797 124.029 533.292 120.202 539.003 117.165C544.835 114.006 551.456 112.426 558.868 112.426C567.494 112.426 575.27 114.552 582.196 118.805C589.243 123.057 594.771 129.132 598.781 137.03C602.912 144.806 604.977 153.858 604.977 164.185C604.977 174.513 602.912 183.686 598.781 191.705C594.771 199.602 589.243 205.738 582.196 210.112C575.27 214.486 567.494 216.673 558.868 216.673C551.456 216.673 544.895 215.154 539.185 212.117C533.596 209.079 529.04 205.252 525.516 200.635V263.147H500.001V114.066H525.516V128.646ZM578.915 164.185C578.915 158.11 577.64 152.886 575.088 148.512C572.658 144.016 569.378 140.614 565.247 138.306C561.237 135.997 556.863 134.843 552.125 134.843C547.508 134.843 543.134 136.058 539.003 138.488C534.993 140.796 531.713 144.198 529.161 148.694C526.731 153.189 525.516 158.475 525.516 164.55C525.516 170.625 526.731 175.91 529.161 180.405C531.713 184.901 534.993 188.364 539.003 190.794C543.134 193.102 547.508 194.256 552.125 194.256C556.863 194.256 561.237 193.041 565.247 190.611C569.378 188.181 572.658 184.719 575.088 180.223C577.64 175.728 578.915 170.382 578.915 164.185Z" fill="currentColor" className="text-gray-700 dark:text-gray-200 group-hover:text-blue-500"/>
                <defs>
                  <clipPath id="clip0_1_4">
                    <rect width="302" height="302" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
