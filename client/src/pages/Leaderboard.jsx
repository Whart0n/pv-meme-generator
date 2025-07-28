import React, { useEffect, useState } from 'react';
import { getTopMemes, upvoteMeme } from '../api/memeApi';

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

  useEffect(() => {
    setLoading(true);
    getTopMemes(20)
      .then(setMemes)
      .catch(() => setError('Failed to load leaderboard.'))
      .finally(() => setLoading(false));
  }, []);

  const handleUpvote = async (memeId) => {
    await upvoteMeme(memeId, sessionId);
    setMemes(memes => memes.map(m => m.id === memeId ? { ...m, upvotes: (m.upvotes || 0) + 1 } : m));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">🏆 Meme Leaderboard</h1>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : memes.length === 0 ? (
          <p className="text-gray-400">No memes yet. Be the first to share one!</p>
        ) : (
          <div className="space-y-4">
            {memes.map((meme, i) => (
              <div key={meme.id} className="flex items-center gap-4 bg-gray-50 rounded p-3 shadow-sm">
                <span className="font-bold text-lg w-6 text-center">{i + 1}</span>
                <img src={meme.imageUrl} alt="Meme" className="w-24 h-24 object-cover rounded border" />
                <div className="flex-1">
                  <div className="text-sm text-gray-600">Template: {meme.templateId}</div>
                  <div className="text-xs text-gray-400">Created: {new Date(meme.createdAt).toLocaleString()}</div>
                </div>
                <button onClick={() => handleUpvote(meme.id)} className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M3 10a7 7 0 1114 0A7 7 0 013 10zm7-3a1 1 0 00-1 1v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8a1 1 0 00-1-1z" /></svg>
                  Upvote ({meme.upvotes || 0})
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
