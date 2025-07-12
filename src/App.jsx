import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import AdminPanel from './pages/AdminPanel';
import PreviewPage from './pages/PreviewPage';
import { WeddingProvider } from './context/WeddingContext';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <WeddingProvider>
      <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'bg-midnight' : 'bg-parchment'}`}>
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/preview" element={<PreviewPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
            </Routes>
          </AnimatePresence>
        </Router>
      </div>
    </WeddingProvider>
  );
}

export default App;