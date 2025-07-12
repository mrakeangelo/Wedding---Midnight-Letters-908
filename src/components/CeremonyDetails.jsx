import React from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '../context/WeddingContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMapPin, FiClock, FiCalendar, FiUsers } = FiIcons;

const CeremonyDetails = () => {
  const { weddingData } = useWedding();

  const detailVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={detailVariants}
          className="text-center mb-16"
        >
          <h2 className="editorial text-4xl md:text-5xl font-bold text-moonlight mb-4">
            Ceremony Details
          </h2>
          <div className="handwritten text-rose-gold text-xl">
            Join us as twilight falls and love rises
          </div>
          <div className="section-divider"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <motion.div
            variants={detailVariants}
            className="letter-style p-8 rounded-lg text-center"
          >
            <div className="moon-phase mx-auto mb-6"></div>
            <h3 className="editorial text-2xl font-semibold text-moonlight mb-4">
              When
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <SafeIcon icon={FiCalendar} className="text-rose-gold" />
                <span className="body-text text-moonlight/90">
                  {new Date(weddingData.weddingDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <SafeIcon icon={FiClock} className="text-rose-gold" />
                <span className="body-text text-moonlight/90">
                  {weddingData.ceremony.time}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={detailVariants}
            className="letter-style p-8 rounded-lg text-center"
          >
            <div className="mb-6">
              <SafeIcon icon={FiMapPin} className="text-rose-gold text-4xl mx-auto" />
            </div>
            <h3 className="editorial text-2xl font-semibold text-moonlight mb-4">
              Where
            </h3>
            <div className="space-y-2">
              <div className="body-text text-moonlight/90 font-semibold">
                {weddingData.ceremony.location}
              </div>
              <div className="body-text text-moonlight/70 text-sm">
                {weddingData.ceremony.address}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={detailVariants}
            className="letter-style p-8 rounded-lg text-center md:col-span-2 lg:col-span-1"
          >
            <div className="mb-6">
              <SafeIcon icon={FiUsers} className="text-rose-gold text-4xl mx-auto" />
            </div>
            <h3 className="editorial text-2xl font-semibold text-moonlight mb-4">
              Attire
            </h3>
            <div className="body-text text-moonlight/90">
              {weddingData.ceremony.dressCode}
            </div>
            <div className="mt-4 handwritten text-dusty-burgundy">
              Embrace the elegance of the evening
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={detailVariants}
          className="mt-16 text-center"
        >
          <div className="letter-style p-8 rounded-lg max-w-2xl mx-auto">
            <h3 className="handwritten text-2xl text-rose-gold mb-4">
              A Note from the Couple
            </h3>
            <p className="editorial text-lg leading-relaxed text-moonlight/90 italic">
              "As the sun sets and the stars begin their nightly dance, we invite you to witness the moment when two hearts become one. Join us for an evening of love, laughter, and the beginning of our forever story."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CeremonyDetails;