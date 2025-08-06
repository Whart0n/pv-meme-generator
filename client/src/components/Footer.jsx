import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 py-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300 text-sm">
      <div className="mb-2 font-semibold text-base text-gray-800 dark:text-gray-100">Your Tips Help Support This Site!</div>
      <div className="flex flex-col items-center gap-1 mb-2">
        <span><span className="font-bold">SOL:</span> E7AUwAjXoacTSrqKMg5Ycnwhn6boMbc8tpEhbrKUviAw</span>
        <span><span className="font-bold">ETH:</span> 0xd919d5304BE87E3159f6b1Cbd5516822F407B6eC</span>
        <span><span className="font-bold">BTC:</span> bc1qs8nrgl4h3u0gje0acaufpufmumvxql7cvgfhej</span>
      </div>
      <div className="flex justify-center items-center gap-2 mt-2">
        <a 
          href="https://x.com/ruffriderx" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" className="w-5 h-5" fill="currentColor">
            <path d="M1199.6 0 741 555.7 1199.6 1227H872.9L563.4 792.8 214.2 1227H0l485.8-594.7L43.6 0h337.7l261.2 366.2L985.8 0h213.8ZM917.7 1106.6h109.6L293.4 120.4h-114L917.7 1106.6Z"></path>
          </svg>
          <span>Follow me on X</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
