import React, { useEffect, useState, useCallback } from 'react';
import { getTopMemes, upvoteMeme, deleteMeme } from '../api/memeApi';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import MemeModal from '../components/MemeModal';
import UpvoteButton from '../components/UpvoteButton';
import OptimizedImage from '../components/OptimizedImage';
import { useProgressiveLoading } from '../hooks/useProgressiveLoading';
import logoImg from '../assets/logo/logo.png';

const getSessionId = () => {
  let id = localStorage.getItem('pv-meme-session-id');
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now();
    localStorage.setItem('pv-meme-session-id', id);
  }
  return id;
};

export default function Leaderboard() {
  const [allMemes, setAllMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const sessionId = getSessionId();
  const [admin, setAdmin] = useState(null);
  const [rateLimitError, setRateLimitError] = useState('');
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Progressive loading hook
  const { visibleItems: memes, hasMore, loading: loadingMore, loadMore } = useProgressiveLoading(allMemes, 8, 4);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setAdmin);
    return () => unsub();
  }, []);

  const loadMemes = useCallback(async (forceRefresh = false) => {
    try {
      if (forceRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError('');
      
      const data = await getTopMemes(50, forceRefresh);
      const validMemes = data.filter(meme => 
        meme.imgDataUrl && 
        meme.imgDataUrl.length > 0 && 
        meme.imgDataUrl.startsWith('data:image/')
      );
      setAllMemes(validMemes);
    } catch (error) {
      console.error('Leaderboard: Error fetching memes:', error);
      setError('Failed to load leaderboard.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadMemes();
  }, [loadMemes]);

  const handleUpvote = async (memeId) => {
    console.log('Leaderboard: handleUpvote called for meme:', memeId);
    console.log('Session ID:', sessionId);
    
    setRateLimitError('');
    const now = Date.now();
    const lastUpvote = Number(localStorage.getItem('pv-meme-last-upvote') || 0);
    
    if (now - lastUpvote < 5000) {
      console.log('Rate limit hit, last upvote was', (now - lastUpvote) / 1000, 'seconds ago');
      setRateLimitError('You can only upvote once every 5 seconds. Please wait before upvoting again.');
      return;
    }
    
    console.log('Calling upvoteMeme API function');
    try {
      const result = await upvoteMeme(memeId, sessionId);
      console.log('upvoteMeme API result:', result);
      
      localStorage.setItem('pv-meme-last-upvote', now.toString());
      console.log('Updated last upvote timestamp in localStorage');
      
      setAllMemes(memes => {
        console.log('Updating UI state with new upvote');
        return memes.map(m => {
          if (m.id === memeId) {
            const updatedMeme = {
              ...m,
              upvotes: (m.upvotes || 0) + 1,
              upvotedBy: { ...(m.upvotedBy || {}), [sessionId]: true },
            };
            console.log('Updated meme in UI:', updatedMeme);
            return updatedMeme;
          }
          return m;
        });
      });
    } catch (error) {
      console.error('Error in handleUpvote:', error);
      setError('Failed to upvote. Please try again.');
    }
  };

  const handleDelete = async (memeId) => {
    await deleteMeme(memeId);
    setAllMemes(memes => memes.filter(m => m.id !== memeId));
    setIsModalOpen(false);
  };

  const handleMemeClick = (meme) => {
    setSelectedMeme(meme);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMeme(null);
  };

  const handleModalUpvote = async (memeId) => {
    await handleUpvote(memeId);
    const updatedMeme = allMemes.find(m => m.id === memeId);
    if (updatedMeme) {
      setSelectedMeme(updatedMeme);
    }
  };

  const handleRefresh = () => {
    loadMemes(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Banner */}
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="flex items-center justify-center space-x-3">
          <img src={logoImg} alt="2.0 Logo" className="h-10 w-10" />
          <h1 className="text-3xl font-bold">PV Meme Generator</h1>
        </div>
      </header>

      <main className="p-4 md:p-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🏆 Meme Leaderboard</h1>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
                title="Refresh leaderboard"
              >
                <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
            
            {rateLimitError && (
              <div className="text-red-500 text-center mb-2">{rateLimitError}</div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-400">Loading leaderboard...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={() => loadMemes(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : allMemes.length === 0 ? (
              <p className="text-gray-400 dark:text-gray-500 text-center py-8">No memes found.</p>
            ) : (
              <>
                <div className="space-y-4">
                  {memes.map((meme, index) => {
                    return (
                      <div key={meme.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-2xl font-bold text-gray-500 dark:text-gray-400 w-8">
                          #{index + 1}
                        </div>
                        <UpvoteButton 
                          upvotes={meme.upvotes || 0}
                          isUpvoted={(meme.upvotedBy && meme.upvotedBy[sessionId]) || false}
                          onClick={() => handleUpvote(meme.id)}
                        />
                        <OptimizedImage
                          src={meme.imgDataUrl}
                          alt="Meme"
                          className="w-24 h-24 object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => handleMemeClick(meme)}
                          title="Click to view full size"
                          compressionQuality={0.8}
                          maxWidth={200}
                          maxHeight={200}
                        />
                        <div className="flex-1">
                          {meme.discordUsername && (
                            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">@{meme.discordUsername}</div>
                          )}
                          <div className="text-xs text-gray-400 dark:text-gray-500">Created: {new Date(meme.createdAt).toLocaleString()}</div>
                        </div>
                        {admin && (
                          <button
                            onClick={() => handleDelete(meme.id)}
                            className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                            title="Delete this meme"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 013-3h5a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V3a1 1 0 016 0v1a1 1 0 001 1v1m0 0a1 1 0 001 1v1a1 1 0 001 1V4a1 1 0 001-1h5a1 1 0 001-1V2a1 1 0 001 1H10z" />
                            </svg>
                            Delete
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Progressive Loading Controls */}
                {hasMore && (
                  <div className="text-center mt-6">
                    <button
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center gap-2 mx-auto"
                    >
                      {loadingMore ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Loading more...
                        </>
                      ) : (
                        <>
                          Load More Memes
                          <span className="text-sm opacity-75">({allMemes.length - memes.length} remaining)</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
                
                {/* Stats */}
                <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Showing {memes.length} of {allMemes.length} memes
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300 text-sm">
        <div className="mb-2 font-semibold text-base text-gray-800 dark:text-gray-100">Your Tips Help Support This Site!</div>
        <div className="flex flex-col items-center gap-1 mb-2">
          <span><span className="font-bold">SOL:</span> E7AUwAjXoacTSrqKMg5Ycnwhn6boMbc8tpEhbrKUviAw</span>
          <span><span className="font-bold">ETH:</span> 0xd919d5304BE87E3159f6b1Cbd5516822F407B6eC</span>
          <span><span className="font-bold">BTC:</span> bc1qs8nrgl4h3u0gje0acaufpufmumvxql7cvgfhej</span>
        </div>
        <div className="flex justify-center items-center gap-2 mt-2">
          <a href="https://x.com/ruffriderx" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" className="w-5 h-5" fill="currentColor">
              <path d="M1199.6 0 741 555.7 1199.6 1227H872.9L563.4 792.8 214.2 1227H0l485.8-594.7L43.6 0h337.7l261.2 366.2L985.8 0h213.8ZM917.7 1106.6h109.6L293.4 120.4h-114L917.7 1106.6Z"/>
            </svg>
            <span>Follow me on X</span>
          </a>
        </div>
      </footer>

      {/* Meme Modal */}
      {selectedMeme && (
        <MemeModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          meme={selectedMeme}
          onUpvote={handleModalUpvote}
          upvotedMemes={meme => (meme.upvotedBy && meme.upvotedBy[sessionId]) || false}
          isAdmin={admin}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
