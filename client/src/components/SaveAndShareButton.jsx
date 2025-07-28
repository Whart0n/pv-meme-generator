import React, { useState } from 'react';
import { saveMeme } from '../api/memeApi';
import { saveAs } from 'file-saver';

export default function SaveAndShareButton({ fabricCanvasRef, selectedTemplate }) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSaveAndShare = async () => {
    setError('');
    const now = Date.now();
    const lastCreated = Number(localStorage.getItem('pv-meme-last-created') || 0);
    if (now - lastCreated < 60000) {
      setError('You can only create one meme per minute. Please wait before creating another.');
      return;
    }
    if (!fabricCanvasRef.current || !selectedTemplate) return;
    setIsSaving(true);
    try {
      const dataUrl = fabricCanvasRef.current.handleExportAndGetDataUrl();
      console.log('Exported dataUrl:', dataUrl && dataUrl.slice(0,50));
      if (!dataUrl) {
        alert('Export failed: Meme image dataUrl is blank or null.');
        throw new Error('Failed to export meme image.');
      }
      const meme = {
        imageUrl: dataUrl,
        templateId: selectedTemplate.id,
        templateName: selectedTemplate.name || selectedTemplate.label || '',
        createdAt: Date.now(),
      };
      const savedId = await saveMeme(meme);
      // Debug: log meme object and result for troubleshooting
      console.log('Saved meme object:', meme, 'Saved ID:', savedId);
      if (!savedId) {
        alert('Error: Meme was not saved to the database.');
        return;
      }
      if (!meme.templateId || !meme.templateName) {
        alert('Error: Missing templateId or templateName. Meme will not appear in leaderboard/recent memes.');
        return;
      }
      localStorage.setItem('pv-meme-last-created', now.toString());
      // Download PNG after saving
      const filename = `meme-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`;
      saveAs(dataUrl, filename);
      alert('Meme saved, shared, and downloaded as PNG! It will appear in Recent Memes and the Leaderboard.');
    } catch (err) {
      setError(err.message || 'Failed to save meme.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-end w-full">
      <button
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow font-semibold disabled:opacity-60"
        onClick={handleSaveAndShare}
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save & Share Meme'}
      </button>
      {error && <span className="text-red-500 text-xs mt-2">{error}</span>}
    </div>
  );
}
