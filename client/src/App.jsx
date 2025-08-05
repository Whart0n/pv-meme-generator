import React, { Suspense } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import DarkModeToggle from './components/DarkModeToggle.jsx';
import PreloadManager from './components/PreloadManager.jsx';
import './App.css';

// Lazy load components for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Leaderboard = React.lazy(() => import('./pages/Leaderboard'));
const HeroOrZero = React.lazy(() => import('./pages/HeroOrZero'));

function App() {
  return (
    <div className="bg-white dark:bg-gray-800">
      <PreloadManager />
      <nav className="bg-gray-900 text-white px-4 py-2 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link to="/" className="hover:underline font-semibold">Home</Link>
          <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
          <Link to="/hero-or-zero" className="hover:underline">Hero or Zero</Link>
        </div>
        <DarkModeToggle />
      </nav>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/hero-or-zero" element={<HeroOrZero />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
