import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '../context/WeddingContext';

const Countdown = () => {
  const { weddingData } = useWedding();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const weddingTime = new Date(weddingData.weddingDate).getTime();
      const difference = weddingTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingData.weddingDate]);

  const countdownVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={countdownVariants}
        >
          <h2 className="editorial text-4xl md:text-5xl font-bold text-moonlight mb-4">
            Until Forever Begins
          </h2>
          <div className="handwritten text-rose-gold text-xl mb-12">
            Every second brings us closer to our midnight promise
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <motion.div
                key={unit}
                className="vintage-watch w-24 h-24 md:w-32 md:h-32 mx-auto flex flex-col items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="editorial text-2xl md:text-3xl font-bold text-moonlight">
                  {value}
                </div>
                <div className="handwritten text-sm md:text-base text-rose-gold capitalize">
                  {unit}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 handwritten text-dusty-burgundy text-lg">
            "Time stands still when love is eternal"
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Countdown;