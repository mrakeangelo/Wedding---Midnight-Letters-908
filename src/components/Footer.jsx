import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiStar } = FiIcons;

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerVariants}
      className="py-16 px-4 border-t border-rose-gold/20 bg-gradient-to-b from-midnight to-ink"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="handwritten text-rose-gold text-3xl mb-4">
            Midnight Letters
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-gold to-transparent mx-auto"></div>
        </div>

        <div className="mb-8">
          <p className="editorial text-moonlight/90 text-lg leading-relaxed max-w-2xl mx-auto">
            "In the quiet hours of night, when the world sleeps and dreams take flight, love writes its most beautiful stories. Thank you for being part of ours."
          </p>
        </div>

        <div className="flex justify-center space-x-6 mb-8">
          {[...Array(5)].map((_, i) => (
            <SafeIcon
              key={i}
              icon={FiStar}
              className="text-rose-gold animate-sparkle"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        <div className="border-t border-rose-gold/20 pt-8">
          <div className="flex items-center justify-center space-x-2 text-moonlight/70">
            <span className="body-text text-sm">
              Midnight Letters – An Evening Wedding Template by
            </span>
            <span className="handwritten text-rose-gold">Mrake Agency</span>
            <SafeIcon icon={FiHeart} className="text-rose-gold animate-pulse" />
          </div>
        </div>

        <div className="mt-8 handwritten text-dusty-burgundy text-sm">
          "Forever begins at midnight"
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;