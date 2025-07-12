import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiSettings } = FiIcons;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Our Story', href: '#story' },
    { name: 'Details', href: '#details' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'RSVP', href: '#rsvp' },
    { name: 'Registry', href: '#registry' },
    { name: 'Guestbook', href: '#guestbook' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-midnight/95 backdrop-blur-sm border-b border-rose-gold/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="handwritten text-rose-gold text-2xl">
            Midnight Letters
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="body-text text-moonlight hover:text-rose-gold transition-colors duration-300 text-sm uppercase tracking-wider"
              >
                {item.name}
              </button>
            ))}
            <Link
              to="/admin"
              className="text-moonlight hover:text-rose-gold transition-colors duration-300"
            >
              <SafeIcon icon={FiSettings} className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-moonlight hover:text-rose-gold transition-colors duration-300"
          >
            <SafeIcon icon={isOpen ? FiX : FiMenu} className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 py-4 border-t border-rose-gold/20"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="body-text text-moonlight hover:text-rose-gold transition-colors duration-300 text-left"
                >
                  {item.name}
                </button>
              ))}
              <Link
                to="/admin"
                className="text-moonlight hover:text-rose-gold transition-colors duration-300 flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <SafeIcon icon={FiSettings} className="w-5 h-5" />
                <span>Admin</span>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;