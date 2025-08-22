import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TokenViewer = () => {
  const [tokenId, setTokenId] = useState('');
  const [tokenType, setTokenType] = useState('generative');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tokenId.trim()) {
      setError('Please enter a token ID');
      return;
    }
    navigate(`/token/${tokenType}/${tokenId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Metahero Token Viewer</h1>
          <p className="text-gray-600 dark:text-gray-300">
            View Metahero Generative Identity and Core Identity tokens by entering the token ID
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="tokenType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Token Type
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    checked={tokenType === 'generative'}
                    onChange={() => setTokenType('generative')}
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Generative Identity</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    checked={tokenType === 'core'}
                    onChange={() => setTokenType('core')}
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Core Identity</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="tokenId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Token ID
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  id="tokenId"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder={`Enter ${tokenType === 'generative' ? 'Generative' : 'Core'} token ID`}
                  value={tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'View Token'}
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TokenViewer;
