import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '../context/WeddingContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiUser, FiUsers, FiHeart, FiCheck } = FiIcons;

const RSVPForm = () => {
  const { weddingData } = useWedding();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: 1,
    attendance: '',
    dietary: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 2000);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 px-4 relative">
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={successVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <div className="sparkle-animation letter-style p-12 rounded-lg">
              <div className="mb-6">
                <SafeIcon icon={FiCheck} className="text-rose-gold text-6xl mx-auto animate-pulse" />
              </div>
              <h2 className="editorial text-3xl md:text-4xl font-bold text-moonlight mb-4">
                Thank You!
              </h2>
              <div className="handwritten text-rose-gold text-xl mb-6">
                Your midnight letter has been received
              </div>
              <p className="editorial text-lg text-moonlight/90 leading-relaxed">
                We're thrilled you'll be joining us for our special evening. 
                Keep an eye out for more details as our wedding day approaches.
              </p>
              <div className="mt-8 flex justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-rose-gold rounded-full animate-sparkle"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={formVariants}
          className="text-center mb-16"
        >
          <h2 className="editorial text-4xl md:text-5xl font-bold text-moonlight mb-4">
            RSVP
          </h2>
          <div className="handwritten text-rose-gold text-xl">
            Send us your midnight letter
          </div>
          <div className="section-divider"></div>
          <p className="editorial text-lg text-moonlight/90 mt-6">
            Please respond by {new Date(weddingData.rsvp.deadline).toLocaleDateString()}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={formVariants}
          className="letter-style p-8 md:p-12 rounded-lg envelope-fold"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={fieldVariants} className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block handwritten text-rose-gold text-lg mb-2">
                  <SafeIcon icon={FiUser} className="inline mr-2" />
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full glow-input p-3 rounded-lg text-moonlight placeholder-moonlight/50"
                  placeholder="Write your name here..."
                />
              </div>

              <div>
                <label className="block handwritten text-rose-gold text-lg mb-2">
                  <SafeIcon icon={FiMail} className="inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full glow-input p-3 rounded-lg text-moonlight placeholder-moonlight/50"
                  placeholder="your@email.com"
                />
              </div>
            </motion.div>

            <motion.div variants={fieldVariants} className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block handwritten text-rose-gold text-lg mb-2">
                  <SafeIcon icon={FiUsers} className="inline mr-2" />
                  Number of Guests
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full glow-input p-3 rounded-lg text-moonlight"
                >
                  <option value="1">Just me</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="4">4 guests</option>
                </select>
              </div>

              <div>
                <label className="block handwritten text-rose-gold text-lg mb-2">
                  <SafeIcon icon={FiHeart} className="inline mr-2" />
                  Will you attend?
                </label>
                <select
                  name="attendance"
                  value={formData.attendance}
                  onChange={handleInputChange}
                  required
                  className="w-full glow-input p-3 rounded-lg text-moonlight"
                >
                  <option value="">Please select...</option>
                  <option value="yes">Yes, with joy!</option>
                  <option value="no">Sadly, I cannot attend</option>
                </select>
              </div>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="block handwritten text-rose-gold text-lg mb-2">
                Dietary Restrictions
              </label>
              <input
                type="text"
                name="dietary"
                value={formData.dietary}
                onChange={handleInputChange}
                className="w-full glow-input p-3 rounded-lg text-moonlight placeholder-moonlight/50"
                placeholder="Let us know if you have any dietary needs..."
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="block handwritten text-rose-gold text-lg mb-2">
                A Message for the Couple
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className="w-full glow-input p-3 rounded-lg text-moonlight placeholder-moonlight/50 resize-none"
                placeholder="Share your thoughts, well wishes, or favorite memory..."
              ></textarea>
            </motion.div>

            <motion.div variants={fieldVariants} className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-dusty-burgundy to-rose-gold text-moonlight px-8 py-4 rounded-lg font-semibold text-lg hover:from-rose-gold hover:to-dusty-burgundy transition-all duration-300 candle-glow disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin w-5 h-5 border-2 border-moonlight border-t-transparent rounded-full mr-2"></div>
                    Sending...
                  </span>
                ) : (
                  'Send Our Letter'
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default RSVPForm;