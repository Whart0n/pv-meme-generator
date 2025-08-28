import React, { useState } from 'react';

const DonationModal = ({ isOpen, onClose }) => {
  const [copiedAddress, setCopiedAddress] = useState(null);
  
  const cryptoAddresses = [
    { 
      name: 'SOL', 
      address: 'E7AUwAjXoacTSrqKMg5Ycnwhn6boMbc8tpEhbrKUviAw',
      color: 'bg-gradient-to-r from-purple-500 to-blue-500'
    },
    { 
      name: 'ETH', 
      address: '0xd919d5304BE87E3159f6b1Cbd5516822F407B6eC',
      color: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    { 
      name: 'BTC', 
      address: 'bc1qs8nrgl4h3u0gje0acaufpufmumvxql7cvgfhej',
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500'
    }
  ];

  const copyToClipboard = (address, name) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(name);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full overflow-hidden transform transition-all">
        {/* Header */}
        <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">Support This Project</h3>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Your donations help keep this project alive and free to use. Thank you for your support!
          </p>
          
          <div className="space-y-4">
            {cryptoAddresses.map((crypto) => (
              <div key={crypto.name} className="rounded-lg overflow-hidden shadow-md">
                <div className={`${crypto.color} px-4 py-2 text-white font-bold`}>
                  {crypto.name}
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 flex items-center justify-between">
                  <div className="text-sm text-gray-800 dark:text-gray-200 font-mono whitespace-nowrap overflow-x-auto pr-2" style={{ maxWidth: 'calc(100% - 80px)' }}>
                    {crypto.address}
                  </div>
                  <button
                    onClick={() => copyToClipboard(crypto.address, crypto.name)}
                    className="ml-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-md text-sm transition-colors focus:outline-none flex-shrink-0"
                  >
                    {copiedAddress === crypto.name ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 flex justify-center">
          <a 
            href="https://x.com/ruffriderx" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" className="w-5 h-5" fill="currentColor">
              <path d="M1199.6 0 741 555.7 1199.6 1227H872.9L563.4 792.8 214.2 1227H0l485.8-594.7L43.6 0h337.7l261.2 366.2L985.8 0h213.8ZM917.7 1106.6h109.6L293.4 120.4h-114L917.7 1106.6Z"></path>
            </svg>
            <span>Follow me on X</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
