import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWedding } from '../context/WeddingContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiChevronLeft, FiChevronRight } = FiIcons;

const Gallery = () => {
  const { weddingData } = useWedding();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  };

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % weddingData.gallery.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(weddingData.gallery[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + weddingData.gallery.length) % weddingData.gallery.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(weddingData.gallery[prevIndex]);
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={galleryVariants}
          className="text-center mb-16"
        >
          <h2 className="editorial text-4xl md:text-5xl font-bold text-moonlight mb-4">
            Captured Moments
          </h2>
          <div className="handwritten text-rose-gold text-xl">
            Memories painted in moonlight and shadow
          </div>
          <div className="section-divider"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={galleryVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {weddingData.gallery.map((image, index) => (
            <motion.div
              key={image.id}
              variants={imageVariants}
              className="relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => openModal(image, index)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-w-4 aspect-h-3 bg-navy rounded-lg overflow-hidden">
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-64 object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="handwritten text-moonlight text-lg">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-midnight/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] bg-navy rounded-lg overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-midnight/50 hover:bg-midnight/70 text-moonlight p-2 rounded-full transition-colors duration-200"
              >
                <SafeIcon icon={FiX} className="w-6 h-6" />
              </button>

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-midnight/50 hover:bg-midnight/70 text-moonlight p-2 rounded-full transition-colors duration-200"
              >
                <SafeIcon icon={FiChevronLeft} className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-midnight/50 hover:bg-midnight/70 text-moonlight p-2 rounded-full transition-colors duration-200"
              >
                <SafeIcon icon={FiChevronRight} className="w-6 h-6" />
              </button>

              <img
                src={selectedImage.url}
                alt={selectedImage.caption}
                className="w-full h-auto max-h-[70vh] object-contain"
              />

              <div className="p-6 bg-gradient-to-t from-midnight to-transparent">
                <p className="handwritten text-moonlight text-xl text-center">
                  {selectedImage.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;