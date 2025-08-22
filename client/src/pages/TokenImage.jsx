import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TokenImage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [searchTokenId, setSearchTokenId] = useState('');
  const [searchTokenType, setSearchTokenType] = useState(type);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        const baseUrl = 'https://raw.githubusercontent.com/dub88/pixelvaultbackup/main/nft_downloads';
        const folder = type === 'generative' ? 'generative' : 'core';
        
        // Try both .png and .jpg extensions
        const checkImage = async (extension) => {
          const imagePath = `${baseUrl}/${folder}/${id}${extension}`;
          const response = await fetch(imagePath, { method: 'HEAD' });
          if (response.ok) {
            return imagePath;
          }
          return null;
        };
        
        // Try .png first, then .jpg
        const pngUrl = await checkImage('.png');
        if (pngUrl) {
          setImageUrl(pngUrl);
          return;
        }
        
        const jpgUrl = await checkImage('.jpg');
        if (jpgUrl) {
          setImageUrl(jpgUrl);
          return;
        }
        
        // If we get here, neither extension worked
        throw new Error('Token image not found (tried .png and .jpg)');
        
      } catch (err) {
        setError(`Error loading token image: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [type, id]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTokenId.trim()) return;
    navigate(`/token/${searchTokenType}/${searchTokenId}`);
    setSearchTokenId(''); // Reset the input field after search
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading token image...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Token Not Found</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {error}
              </p>
              <SearchForm 
                tokenType={searchTokenType}
                setTokenType={setSearchTokenType}
                tokenId={searchTokenId}
                setTokenId={setSearchTokenId}
                onSubmit={handleSearch}
                buttonText="Search Again"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Search form component
  const SearchForm = ({ tokenType, setTokenType, tokenId, setTokenId, onSubmit, buttonText = 'View Token' }) => (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Search Another Token
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={tokenType}
              onChange={(e) => setTokenType(e.target.value)}
              className="flex-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3"
            >
              <option value="generative">Generative Identity</option>
              <option value="core">Core Identity</option>
            </select>
            <div className="flex-1 flex">
              <input
                type="text"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                placeholder={`Enter token ID`}
                className="flex-1 min-w-0 block w-full rounded-l-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
              />
              <button
                type="submit"
                disabled={!tokenId.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {type === 'generative' ? 'Generative Identity' : 'Core Identity'} #{id}
          </h1>
        </div>
        
        <SearchForm 
          tokenType={searchTokenType}
          setTokenType={setSearchTokenType}
          tokenId={searchTokenId}
          setTokenId={setSearchTokenId}
          onSubmit={handleSearch}
        />

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                {type === 'generative' ? 'Generative Identity' : 'Core Identity'} #{id}
              </h2>
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                download={`${type}-${id}.png`}
              >
                Download
              </a>
            </div>
          </div>
          <div className="p-6 flex justify-center bg-gray-50 dark:bg-gray-900">
            <img
              src={imageUrl}
              alt={`${type === 'generative' ? 'Generative' : 'Core'} Identity #${id}`}
              className="max-w-full h-auto max-h-[70vh] object-contain rounded"
              onError={(e) => {
                e.target.onerror = null;
                setError('Failed to load image');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenImage;
