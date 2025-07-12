import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMoon, FiSun } = FiIcons;

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={toggleTheme}
      className="fixed top-20 right-4 z-40 bg-midnight/80 backdrop-blur-sm border border-rose-gold/30 text-moonlight p-3 rounded-full hover:bg-midnight/90 transition-all duration-300 candle-glow"
    >
      <SafeIcon 
        icon={isDarkMode ? FiSun : FiMoon} 
        className="w-5 h-5" 
      />
    </motion.button>
  );
};

export default ThemeToggle;