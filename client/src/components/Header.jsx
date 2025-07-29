import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo/logo.png';

export default function Header() {
  const location = useLocation();
  
  // Helper function to determine if a nav link is active
  const isActive = (path) => {
    return location.pathname === path ? 'bg-gray-800' : 'hover:bg-gray-800';
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logoImg} alt="PV Meme Generator" className="h-10" />
            <span className="text-xl font-bold">PV Meme Generator</span>
          </Link>
          
          {/* Navigation */}
          <nav>
            <ul className="flex space-x-1">
              <li>
                <Link 
                  to="/" 
                  className={`px-4 py-2 rounded-md transition-colors ${isActive('/')}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/leaderboard" 
                  className={`px-4 py-2 rounded-md transition-colors ${isActive('/leaderboard')}`}
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <a 
                  href="https://discord.gg/your-discord-link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-md transition-colors hover:bg-gray-800"
                >
                  Join Discord
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
