import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg mb-4">Your Tips Help Support This Site!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
          <div className="bg-gray-800 p-3 rounded">
            <p className="font-mono text-sm break-all">SOL: 6qQ8B9... (truncated for display)</p>
          </div>
          <div className="bg-gray-800 p-3 rounded">
            <p className="font-mono text-sm break-all">ETH: 0x1234... (truncated for display)</p>
          </div>
          <div className="bg-gray-800 p-3 rounded">
            <p className="font-mono text-sm break-all">BTC: bc1q... (truncated for display)</p>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-700">
          <a 
            href="https://x.com/yourhandle" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Follow me on X
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
