import React from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '../context/WeddingContext';

const StorySection = () => {
  const { weddingData } = useWedding();

  const storyVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={storyVariants}
          className="text-center mb-16"
        >
          <h2 className="editorial text-4xl md:text-5xl font-bold text-moonlight mb-4">
            {weddingData.story.title}
          </h2>
          <div className="handwritten text-rose-gold text-xl">
            Written in the stars, sealed with midnight kisses
          </div>
          <div className="section-divider"></div>
        </motion.div>

        <div className="space-y-16">
          {weddingData.story.entries.map((entry, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={storyVariants}
              className="scroll-fade"
            >
              <div className="letter-style p-8 md:p-12 rounded-lg relative">
                <div className="absolute top-4 right-4 wax-seal"></div>
                
                <div className="mb-6">
                  <h3 className="handwritten text-2xl md:text-3xl text-rose-gold mb-2">
                    {entry.title}
                  </h3>
                  <div className="editorial text-dusty-burgundy italic">
                    {entry.date}
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="editorial text-lg leading-relaxed text-moonlight/90">
                    {entry.content}
                  </p>
                </div>

                <div className="mt-8 flex justify-center">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-gold to-transparent"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={storyVariants}
          className="text-center mt-16"
        >
          <div className="handwritten text-2xl md:text-3xl text-dusty-burgundy">
            "And so our story continues..."
          </div>
          <div className="mt-4 flex justify-center space-x-2">
            {weddingData.quotes.map((quote, index) => (
              <div
                key={index}
                className="w-1 h-1 bg-rose-gold rounded-full animate-pulse"
                style={{ animationDelay: `${index * 0.5}s` }}
              ></div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StorySection;