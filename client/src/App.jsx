import React, { Suspense, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import DarkModeToggle from './components/DarkModeToggle.jsx';
import PreloadManager from './components/PreloadManager.jsx';
import AuthModal from './components/AuthModal.jsx';
import UserProfile from './components/UserProfile.jsx';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

// Lazy load components for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Leaderboard = React.lazy(() => import('./pages/Leaderboard'));
const HeroOrZero = React.lazy(() => import('./pages/HeroOrZero'));

function AppContent() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { currentUser } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-800">
      <PreloadManager />
      <nav className="bg-gray-900 text-white px-4 py-2 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link to="/" className="hover:underline font-semibold">Home</Link>
          <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
          <Link to="/hero-or-zero" className="hover:underline">Hero or Zero</Link>
        </div>
        <div className="flex items-center gap-4">
          {currentUser ? (
            <button
              onClick={() => setProfileModalOpen(true)}
              className="flex items-center gap-2 hover:bg-gray-700 px-3 py-1 rounded-full transition-colors"
            >
              {currentUser.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt="Profile" 
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                  {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : currentUser.email[0].toUpperCase()}
                </div>
              )}
              <span className="hidden sm:inline">{currentUser.displayName || 'Profile'}</span>
            </button>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-full transition-colors"
            >
              Login
            </button>
          )}
          <DarkModeToggle />
        </div>
      </nav>
      
      {authModalOpen && <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />}
      {profileModalOpen && <UserProfile onClose={() => setProfileModalOpen(false)} />}
      
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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
