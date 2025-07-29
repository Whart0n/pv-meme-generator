import React from 'react';

export default function UpvoteButton({ 
  upvotes = 0, 
  hasUpvoted = false, 
  onUpvote, 
  disabled = false,
  size = 'md' 
}) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4', 
    lg: 'w-5 h-5'
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={onUpvote}
        disabled={disabled || hasUpvoted}
        className={`
          ${sizeClasses[size]} 
          flex items-center justify-center rounded-full border-2 transition-all duration-200
          ${hasUpvoted 
            ? 'bg-orange-500 border-orange-500 text-white shadow-md' 
            : 'bg-white border-gray-300 text-gray-600 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
        `}
        title={hasUpvoted ? 'You upvoted this meme' : 'Upvote this meme'}
      >
        <svg 
          className={iconSizes[size]} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>
      <span className={`font-semibold ${hasUpvoted ? 'text-orange-600' : 'text-gray-700'} ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'}`}>
        {upvotes}
      </span>
    </div>
  );
}
