import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWedding } from '../context/WeddingContext';
import HomePage from './HomePage';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiEdit } = FiIcons;

const PreviewPage = ({ isDarkMode, setIsDarkMode }) => {
  const { isDraft } = useWedding();

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between bg-midnight/95 backdrop-blur-sm border border-rose-gold/30 rounded-lg p-4"
      >
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-moonlight hover:text-rose-gold transition-colors duration-300"
          >
            <SafeIcon icon={FiArrowLeft} className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="handwritten text-rose-gold text-xl">Preview Mode</h1>
            {isDraft && (
              <span className="body-text text-moonlight/70 text-sm">
                Viewing draft version
              </span>
            )}
          </div>
        </div>
        
        <Link
          to="/admin"
          className="bg-rose-gold text-midnight px-4 py-2 rounded-lg hover:bg-rose-gold/80 transition-colors duration-300 flex items-center space-x-2"
        >
          <SafeIcon icon={FiEdit} className="w-4 h-4" />
          <span>Edit</span>
        </Link>
      </motion.div>
      
      <div className="pt-20">
        <HomePage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
    </div>
  );
};

export default PreviewPage;