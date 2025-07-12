import React from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '../context/WeddingContext';
import { format } from 'date-fns';

const HeroSection = () => {
  const { weddingData } = useWedding();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-navy to-midnight opacity-90"></div>
      
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="handwritten text-rose-gold text-2xl md:text-3xl mb-4 animate-float">
            Midnight Letters
          </div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-rose-gold to-transparent mx-auto"></div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="editorial text-4xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="block text-moonlight">{weddingData.coupleNames.partner1}</span>
          <span className="handwritten text-rose-gold text-3xl md:text-5xl my-4 block">and</span>
          <span className="block text-moonlight">{weddingData.coupleNames.partner2}</span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="handwritten text-dusty-burgundy text-xl md:text-2xl mb-2">
            are writing their forever story
          </div>
          <div className="editorial text-moonlight text-lg md:text-xl">
            {format(new Date(weddingData.weddingDate), 'MMMM do, yyyy')}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative"
        >
          <div className="letter-style p-8 md:p-12 rounded-lg backdrop-blur-sm">
            <p className="editorial text-lg md:text-xl leading-relaxed italic text-moonlight/90">
              "In the quiet moments between dusk and dawn, when the world holds its breath and the stars lean in to listen, we invite you to witness the beginning of our forever."
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex justify-center space-x-4"
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-rose-gold rounded-full animate-sparkle"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-rose-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-rose-gold rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;