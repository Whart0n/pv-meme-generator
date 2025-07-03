import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Home, Admin } from './pages';
import './App.css';

function App() {
  return (
    <div>


      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
