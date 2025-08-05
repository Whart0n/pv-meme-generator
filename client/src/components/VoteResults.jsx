import React from 'react';

const VoteResults = ({ winner, loser, ratingChanges, onNextPair }) => {
  if (!winner || !loser || !ratingChanges) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Vote Results
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Winner */}
            <div className="text-center">
              <div className="relative mb-4">
                <img
                  src={winner.image}
                  alt={winner.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full font-semibold">
                  🦸 HERO
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {winner.name}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Elo Score:</span>
                  <span className="font-semibold text-green-600">
                    {winner.elo_score} 
                    <span className="text-green-500 ml-1">
                      (+{ratingChanges.winnerChange})
                    </span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Wins:</span>
                  <span className="font-semibold">{winner.wins}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Losses:</span>
                  <span className="font-semibold">{winner.losses}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Votes:</span>
                  <span className="font-semibold">{winner.total_votes}</span>
                </div>
              </div>
            </div>

            {/* Loser */}
            <div className="text-center">
              <div className="relative mb-4">
                <img
                  src={loser.image}
                  alt={loser.name}
                  className="w-full h-64 object-cover rounded-lg opacity-75"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full font-semibold">
                  💀 ZERO
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {loser.name}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Elo Score:</span>
                  <span className="font-semibold text-red-600">
                    {loser.elo_score}
                    <span className="text-red-500 ml-1">
                      ({ratingChanges.loserChange})
                    </span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Wins:</span>
                  <span className="font-semibold">{loser.wins}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Losses:</span>
                  <span className="font-semibold">{loser.losses}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Votes:</span>
                  <span className="font-semibold">{loser.total_votes}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Change Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Rating Changes
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-green-600 font-semibold">
                  {winner.name}: +{ratingChanges.winnerChange}
                </div>
              </div>
              <div className="text-center">
                <div className="text-red-600 font-semibold">
                  {loser.name}: {ratingChanges.loserChange}
                </div>
              </div>
            </div>
          </div>

          {/* Next Pair Button */}
          <div className="text-center">
            <button
              onClick={onNextPair}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 transform hover:scale-105"
            >
              Next Pair →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteResults;
