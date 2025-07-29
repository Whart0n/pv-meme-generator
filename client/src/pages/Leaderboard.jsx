import React, { useEffect, useState } from 'react';
import { getTopMemes, upvoteMeme, deleteMeme } from '../api/memeApi';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import MemeModal from '../components/MemeModal';
import UpvoteButton from '../components/UpvoteButton';
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
    getTopMemes(50)
      .then(data => {
        const validMemes = data.filter(meme => 
          meme.imgDataUrl && 
          meme.imgDataUrl.length > 0 && 
          meme.imgDataUrl.startsWith('data:image/')
        );
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
    const updatedMeme = memes.find(m => m.id === memeId);
    if (updatedMeme) {
      setSelectedMeme(updatedMeme);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner */}
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="flex items-center justify-center space-x-3">
          <img src={logoImg} alt="2.0 Logo" className="h-10 w-10" />
          <h1 className="text-3xl font-bold">PV Meme Generator</h1>
        </div>
      </header>

      <main className="p-4 md:p-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
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
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 bg-gray-50 border-t border-gray-200 text-center text-gray-700 text-sm">
        <div className="mb-2 font-semibold text-base text-gray-800">Your Tips Help Support This Site!</div>
        <div className="flex flex-col items-center gap-1 mb-2">
          <span><span className="font-bold">SOL:</span> E7AUwAjXoacTSrqKMg5Ycnwhn6boMbc8tpEhbrKUviAw</span>
          <span><span className="font-bold">ETH:</span> 0xd919d5304BE87E3159f6b1Cbd5516822F407B6eC</span>
          <span><span className="font-bold">BTC:</span> bc1qs8nrgl4h3u0gje0acaufpufmumvxql7cvgfhej</span>
        </div>
        <div className="flex justify-center items-center gap-2 mt-2">
          <a href="https://x.com/ruffriderx" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
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
