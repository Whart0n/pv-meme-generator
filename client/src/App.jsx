import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Home, Admin } from './pages';
import Leaderboard from './pages/Leaderboard';
import './App.css';

function App() {
  return (
    <div>
      <nav className="bg-gray-900 text-white px-4 py-2 flex gap-4 items-center">
        <Link to="/" className="hover:underline font-semibold">Home</Link>
        <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
        <Link to="/admin" className="hover:underline">Admin</Link>
      </nav>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
