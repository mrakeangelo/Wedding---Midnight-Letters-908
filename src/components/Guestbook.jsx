import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '../context/WeddingContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFeather, FiStar } = FiIcons;

const Guestbook = () => {
  const { weddingData, updateWeddingData } = useWedding();
  const [newEntry, setNewEntry] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEntry.name || !newEntry.message) return;

    setIsSubmitting(true);
    
    const entry = {
      id: Date.now(),
      name: newEntry.name,
      message: newEntry.message,
      timestamp: new Date().toISOString()
    };

    // Simulate submission delay
    setTimeout(() => {
      updateWeddingData({
        guestbook: {
          ...weddingData.guestbook,
          entries: [...weddingData.guestbook.entries, entry]
        }
      });
      setNewEntry({ name: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const guestbookVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const entryVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={guestbookVariants}
          className="text-center mb-16"
        >
          <h2 className="editorial text-4xl md:text-5xl font-bold text-moonlight mb-4">
            Guestbook
          </h2>
          <div className="handwritten text-rose-gold text-xl">
            Leave a midnight note for the happy couple
          </div>
          <div className="section-divider"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={guestbookVariants}
          className="letter-style p-8 md:p-12 rounded-lg mb-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block handwritten text-rose-gold text-lg mb-2">
                <SafeIcon icon={FiFeather} className="inline mr-2" />
                Your Name
              </label>
              <input
                type="text"
                value={newEntry.name}
                onChange={(e) => setNewEntry(prev => ({ ...prev, name: e.target.value }))}
                required
                className="w-full glow-input p-3 rounded-lg text-moonlight placeholder-moonlight/50"
                placeholder="Sign your name..."
              />
            </div>

            <div>
              <label className="block handwritten text-rose-gold text-lg mb-2">
                Your Midnight Note
              </label>
              <textarea
                value={newEntry.message}
                onChange={(e) => setNewEntry(prev => ({ ...prev, message: e.target.value }))}
                required
                rows="4"
                className="w-full glow-input p-3 rounded-lg text-moonlight placeholder-moonlight/50 resize-none"
                placeholder="Share your thoughts, wishes, or memories..."
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-dusty-burgundy to-rose-gold text-moonlight px-8 py-3 rounded-lg font-semibold hover:from-rose-gold hover:to-dusty-burgundy transition-all duration-300 candle-glow disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin w-4 h-4 border-2 border-moonlight border-t-transparent rounded-full mr-2"></div>
                    Adding Note...
                  </span>
                ) : (
                  'Add Your Note'
                )}
              </button>
            </div>
          </form>
        </motion.div>

        <div className="space-y-6">
          {weddingData.guestbook.entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              variants={entryVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="letter-style p-6 rounded-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiStar} className="text-rose-gold" />
                  <h4 className="handwritten text-rose-gold text-lg">{entry.name}</h4>
                </div>
                <div className="text-moonlight/60 text-sm">
                  {new Date(entry.timestamp).toLocaleDateString()}
                </div>
              </div>
              <p className="editorial text-moonlight/90 leading-relaxed">
                {entry.message}
              </p>
            </motion.div>
          ))}
        </div>

        {weddingData.guestbook.entries.length === 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={guestbookVariants}
            className="text-center py-12"
          >
            <div className="handwritten text-dusty-burgundy text-xl">
              Be the first to leave a midnight note...
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Guestbook;