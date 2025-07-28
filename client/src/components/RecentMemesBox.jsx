import React, { useEffect, useState } from 'react';
import { getRecentMemesByTemplate, upvoteMeme, deleteMeme } from '../api/memeApi';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import MemeModal from './MemeModal';

const getSessionId = () => {
  let id = localStorage.getItem('pv-meme-session-id');
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now();
    localStorage.setItem('pv-meme-session-id', id);
  }
  return id;
};

export default function RecentMemesBox({ templateId }) {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
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
    if (!templateId) return;
    setLoading(true);
    getRecentMemesByTemplate(templateId, 10)
      .then(data => {
        setMemes(data);
        setError('');
      })
      .catch(() => setError('Failed to load recent memes.'))
      .finally(() => setLoading(false));
  }, [templateId]);

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
    setMemes(memes => memes.map(m => m.id === memeId ? { ...m, upvotes: (m.upvotes || 0) + 1 } : m));
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

  const handleDelete = async (memeId) => {
    await deleteMeme(memeId);
    setMemes(memes => memes.filter(m => m.id !== memeId));
    setIsModalOpen(false);
  };

  if (!templateId) return null;

  return (
    <div className="mt-6 bg-gray-50 border rounded-lg p-4">
      <h3 className="font-semibold text-lg mb-3">Recently Created Memes</h3>
      {rateLimitError && (
        <div className="text-red-500 text-center mb-2">{rateLimitError}</div>
      )}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : memes.length === 0 ? (
        <p className="text-gray-400">No recent memes for this template yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {memes.map(meme => (
            <div key={meme.id} className="bg-white rounded shadow p-2 flex flex-col items-center">
              <img 
                src={meme.imgDataUrl} 
                alt="User Meme" 
                className="w-full h-24 object-cover rounded mb-2 cursor-pointer hover:opacity-80 transition-opacity" 
                onClick={() => handleMemeClick(meme)}
                title="Click to view full size"
              />
              <button onClick={() => handleUpvote(meme.id)} className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M3 10a7 7 0 1114 0A7 7 0 013 10zm7-3a1 1 0 00-1 1v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8a1 1 0 00-1-1z" /></svg>
                Upvote ({meme.upvotes || 0})
              </button>
              {admin && (
                <button
                  onClick={() => handleDelete(meme.id)}
                  className="mt-2 bg-red-100 hover:bg-red-200 text-red-700 text-xs px-2 py-1 rounded"
                  title="Delete meme (admin only)"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Only show error if not empty state */}
      {error && memes.length > 0 && (
        <p className="text-red-500">{error}</p>
      )}
      
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
