import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '../context/WeddingContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiPause, FiMusic, FiVolume2 } = FiIcons;

const AudioPlayer = () => {
  const { weddingData } = useWedding();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const playerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  if (!weddingData.audio.enabled) {
    return null;
  }

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={playerVariants}
          className="letter-style p-8 rounded-lg text-center vinyl-texture"
        >
          <div className="mb-6">
            <SafeIcon icon={FiMusic} className="text-rose-gold text-4xl mx-auto animate-float" />
          </div>
          
          <h3 className="handwritten text-2xl text-rose-gold mb-2">
            Our Midnight Serenade
          </h3>
          <p className="editorial text-moonlight/90 mb-6">
            {weddingData.audio.title}
          </p>

          <div className="flex items-center justify-center space-x-6 mb-6">
            <button
              onClick={togglePlay}
              className="vintage-watch w-16 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-300"
            >
              <SafeIcon 
                icon={isPlaying ? FiPause : FiPlay} 
                className="text-moonlight text-2xl" 
              />
            </button>
          </div>

          <div className="flex items-center justify-center space-x-4 max-w-xs mx-auto">
            <SafeIcon icon={FiVolume2} className="text-rose-gold" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-navy rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #E8B4A0 0%, #E8B4A0 ${volume * 100}%, #1E2A4A ${volume * 100}%, #1E2A4A 100%)`
              }}
            />
          </div>

          <audio
            ref={audioRef}
            src={weddingData.audio.url}
            loop
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />

          <div className="mt-6 handwritten text-dusty-burgundy text-sm">
            "Music is the language of the soul"
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AudioPlayer;