import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '../context/WeddingContext';
import HeroSection from '../components/HeroSection';
import StorySection from '../components/StorySection';
import CeremonyDetails from '../components/CeremonyDetails';
import Gallery from '../components/Gallery';
import RSVPForm from '../components/RSVPForm';
import Guestbook from '../components/Guestbook';
import Registry from '../components/Registry';
import AudioPlayer from '../components/AudioPlayer';
import Countdown from '../components/Countdown';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';

const HomePage = ({ isDarkMode, setIsDarkMode }) => {
  const { weddingData } = useWedding();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Parallax effect
      document.documentElement.style.setProperty('--scroll-y', `${scrollY * 0.5}px`);
      
      // Fade in elements on scroll
      const elements = document.querySelectorAll('.scroll-fade');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          el.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'bg-midnight text-moonlight' : 'bg-parchment text-ink light-mode'}`}>
      <div className="stars-bg"></div>
      <div className="floating-hearts"></div>
      
      <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Navigation />
      
      <main className="relative z-10">
        <HeroSection />
        <StorySection />
        <CeremonyDetails />
        <Countdown />
        <Gallery />
        <RSVPForm />
        <Registry />
        <Guestbook />
        <AudioPlayer />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;