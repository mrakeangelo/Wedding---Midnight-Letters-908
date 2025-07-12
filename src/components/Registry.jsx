import React from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '../context/WeddingContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiGift, FiExternalLink, FiHeart } = FiIcons;

const Registry = () => {
  const { weddingData } = useWedding();

  const registryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  if (!weddingData.registry.enabled) {
    return null;
  }

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={registryVariants}
          className="text-center mb-16"
        >
          <h2 className="editorial text-4xl md:text-5xl font-bold text-moonlight mb-4">
            Wedding Registry
          </h2>
          <div className="handwritten text-rose-gold text-xl">
            Gifts to help us build our midnight castle
          </div>
          <div className="section-divider"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={registryVariants}
          className="letter-style p-8 md:p-12 rounded-lg mb-12 text-center"
        >
          <SafeIcon icon={FiHeart} className="text-rose-gold text-4xl mx-auto mb-4" />
          <h3 className="handwritten text-2xl text-rose-gold mb-4">
            A Note About Gifts
          </h3>
          <p className="editorial text-lg text-moonlight/90 leading-relaxed max-w-2xl mx-auto">
            Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we've curated a collection of items that will help us create our perfect midnight sanctuary together.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={registryVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {weddingData.registry.items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="letter-style p-6 rounded-lg group cursor-pointer transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="editorial text-xl font-semibold text-moonlight mb-2">
                    {item.name}
                  </h4>
                  <div className="handwritten text-rose-gold text-lg">
                    ${item.price}
                  </div>
                </div>
                <SafeIcon icon={FiGift} className="text-dusty-burgundy text-2xl" />
              </div>
              
              <div className="text-moonlight/70 text-sm mb-4">
                Available at {item.store}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiExternalLink} className="text-rose-gold text-sm" />
                  <span className="text-rose-gold text-sm group-hover:underline">
                    View Item
                  </span>
                </div>
                <div className="wax-seal w-6 h-6"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={registryVariants}
          className="text-center mt-16"
        >
          <div className="handwritten text-dusty-burgundy text-lg">
            "The best gifts are those that come from the heart"
          </div>
          <div className="mt-4 flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-rose-gold rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              ></div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Registry;