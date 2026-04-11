import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Radio from './pages/Radio';
import PWAInstallPrompt from './components/PWAInstallPrompt';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/radio/*" element={<Radio />} />
      </Routes>
      <PWAInstallPrompt />
    </Router>
  );
}

