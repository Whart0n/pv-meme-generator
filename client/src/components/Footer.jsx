import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} PV Meme Generator. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="/privacy" 
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="https://github.com/yourusername/pv-meme-generator" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500">
            Made with ❤️ by the PV Community
          </p>
        </div>
      </div>
    </footer>
  );
}
