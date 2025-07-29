import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo/logo.png';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logoImg} alt="PV Meme Generator Logo" className="h-10 w-auto" />
          <h1 className="text-xl font-bold">PV Meme Generator</h1>
        </Link>
        <nav className="flex space-x-6">
          <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <Link to="/leaderboard" className="hover:text-gray-300 transition-colors">Leaderboard</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
