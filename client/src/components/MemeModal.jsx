import React from 'react';
import UpvoteButton from './UpvoteButton';

export default function MemeModal({ meme, isOpen, onClose, onUpvote, canUpvote, onDelete, canDelete }) {
  if (!isOpen || !meme) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl max-h-[90vh] overflow-auto shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Meme Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl leading-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meme Image */}
          <div className="mb-4 text-center">
            <img 
              src={meme.imgDataUrl} 
              alt="Meme" 
              className="max-w-full max-h-96 mx-auto rounded border dark:border-gray-600 shadow-sm"
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Meme Info */}
          <div className="space-y-2 mb-4">
            {meme.discordUsername && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Created by:</span> @{meme.discordUsername}
              </div>
            )}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Created:</span> {new Date(meme.createdAt).toLocaleString()}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center items-center">
            <UpvoteButton
              upvotes={meme.upvotes || 0}
              hasUpvoted={!canUpvote}
              onUpvote={() => onUpvote(meme.id)}
              disabled={!canUpvote}
              size="lg"
            />

            {canDelete && (
              <button
                onClick={() => onDelete(meme.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 102 0v3a1 1 0 11-2 0V9zm4 0a1 1 0 10-2 0v3a1 1 0 102 0V9z" clipRule="evenodd" />
                </svg>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
