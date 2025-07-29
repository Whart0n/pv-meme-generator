import React, { useEffect, useState } from 'react';
import { getTopMemes, upvoteMeme, deleteMeme } from '../api/memeApi';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import MemeModal from '../components/MemeModal';
import UpvoteButton from '../components/UpvoteButton';

const getSessionId = () => {
  let id = localStorage.getItem('pv-meme-session-id');
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now();
    localStorage.setItem('pv-meme-session-id', id);
  }
  return id;
};

export default function Leaderboard() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const sessionId = getSessionId();
  const [admin, setAdmin] = useState(null);
  const [rateLimitError, setRateLimitError] = useState('');
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setAdmin);
    return () => unsub();
  }, []);

  useEffect(() => {
    setLoading(true);
    getTopMemes(50) // Increased from 20 to 50 memes
      .then(data => {
        // Filter out memes without valid image data URLs
        const validMemes = data.filter(meme => 
          meme.imgDataUrl && 
          meme.imgDataUrl.length > 0 && 
          meme.imgDataUrl.startsWith('data:image/')
        );
        console.log(`Filtered ${data.length} memes to ${validMemes.length} valid memes`);
        setMemes(validMemes);
      })
      .catch(error => {
        console.error('Leaderboard: Error fetching memes:', error);
        setError('Failed to load leaderboard.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUpvote = async (memeId) => {
    setRateLimitError('');
    const now = Date.now();
    const lastUpvote = Number(localStorage.getItem('pv-meme-last-upvote') || 0);
    if (now - lastUpvote < 5000) {
      setRateLimitError('You can only upvote once every 5 seconds. Please wait before upvoting again.');
      return;
    }
    await upvoteMeme(memeId, sessionId);
    localStorage.setItem('pv-meme-last-upvote', now.toString());
    setMemes(memes => memes.map(m => {
      if (m.id === memeId) {
        return {
          ...m,
          upvotes: (m.upvotes || 0) + 1,
          upvotedBy: { ...(m.upvotedBy || {}), [sessionId]: true },
        };
      }
      return m;
    }));
  };

  const handleDelete = async (memeId) => {
    await deleteMeme(memeId);
    setMemes(memes => memes.filter(m => m.id !== memeId));
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
    // Update the selected meme with new upvote count
    const updatedMeme = memes.find(m => m.id === memeId);
    if (updatedMeme) {
      setSelectedMeme(updatedMeme);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">🏆 Meme Leaderboard</h1>
          {rateLimitError && (
            <div className="text-red-500 text-center mb-2">{rateLimitError}</div>
          )}

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : memes.length === 0 ? (
            <p className="text-gray-400">No memes yet. Be the first to share one!</p>
          ) : (
            <div className="space-y-4">
              {memes.map((meme, i) => {
                const alreadyUpvoted = meme.upvotedBy && meme.upvotedBy[sessionId];
                return (
                  <div key={meme.id} className="flex items-center gap-4 bg-gray-50 rounded p-3 shadow-sm">
                    <span className="font-bold text-lg w-6 text-center">{i + 1}</span>
                    <UpvoteButton
                      upvotes={meme.upvotes || 0}
                      hasUpvoted={alreadyUpvoted}
                      onUpvote={() => handleUpvote(meme.id)}
                      disabled={alreadyUpvoted}
                      size="sm"
                    />
                    <img 
                      src={meme.imgDataUrl} 
                      alt="Meme" 
                      className="w-24 h-24 object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity" 
                      onClick={() => handleMemeClick(meme)}
                      title="Click to view full size"
                    />
                    <div className="flex-1">
                      {meme.discordUsername && (
                        <div className="text-sm font-medium text-gray-800">@{meme.discordUsername}</div>
                      )}
                      <div className="text-xs text-gray-400">Created: {new Date(meme.createdAt).toLocaleString()}</div>
                    </div>
                    {admin && (
                      <button
                        onClick={() => handleDelete(meme.id)}
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700"
                        title="Delete this meme"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 013-3h5a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V3a1 1 0 016 0v1a1 1 0 001 1v1m0 0a1 1 0 001 1v1a1 1 0 001 1V4a1 1 0 001-1h5a1 1 0 011-1V2a1 1 0 011 1H10z" /></svg>
                        Delete
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      {/* Meme Detail Modal */}
      <MemeModal
        meme={selectedMeme}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpvote={handleModalUpvote}
        canUpvote={selectedMeme && (!selectedMeme.upvotedBy || !selectedMeme.upvotedBy[sessionId])}
        onDelete={handleDelete}
        canDelete={admin}
      />
    </div>
  );
}
