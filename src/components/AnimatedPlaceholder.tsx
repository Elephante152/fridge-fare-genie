import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const examples = [
  "E.g., I have chicken, rice, and vegetables. Looking for gluten-free recipes under 30 minutes...",
  "E.g., I have tofu, quinoa, and fresh vegetables. Need high-protein vegetarian meals...",
  "E.g., I have ground beef, potatoes, and carrots. Want family-friendly comfort food recipes...",
  "E.g., I have salmon, asparagus, and lemon. Looking for healthy Mediterranean-style dishes...",
  "E.g., I have black beans, corn, and avocados. Need quick Mexican-inspired vegetarian meals..."
];

interface AnimatedPlaceholderProps {
  className?: string;
}

const AnimatedPlaceholder = ({ className = "" }: AnimatedPlaceholderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % examples.length);
    }, 4000); // Change text every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative h-[24px] ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="absolute text-brand-jet/50 text-sm"
        >
          {examples[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedPlaceholder;