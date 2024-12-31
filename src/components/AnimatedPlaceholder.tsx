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
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentText = examples[currentIndex];
    let currentChar = 0;
    let typingInterval: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;

    const typeNextChar = () => {
      if (currentChar < currentText.length && isTyping) {
        setDisplayText(currentText.substring(0, currentChar + 1));
        currentChar++;
      } else if (currentChar >= currentText.length) {
        // Longer pause at the end of typing
        pauseTimeout = setTimeout(() => {
          setIsTyping(false);
          // Start erasing
          currentChar = currentText.length;
          typingInterval = setInterval(eraseChar, 50); // Slightly slower erasing
        }, 3000); // Longer pause at the end (3 seconds)
      }
    };

    const eraseChar = () => {
      if (currentChar > 0) {
        setDisplayText(currentText.substring(0, currentChar - 1));
        currentChar--;
      } else {
        clearInterval(typingInterval);
        // Add a small pause before starting the next example
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % examples.length);
          setIsTyping(true);
        }, 1000); // 1 second pause before next example
      }
    };

    // Slower typing speed (70ms between characters)
    typingInterval = setInterval(typeNextChar, 70);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(pauseTimeout);
    };
  }, [currentIndex, isTyping]);

  return (
    <div className={`relative h-[24px] ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }} // Smoother fade transition
          className="absolute text-brand-jet/50 text-sm"
        >
          {displayText}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-[2px] h-[14px] bg-brand-jet/50 ml-[2px]"
          >
            |
          </motion.span>
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedPlaceholder;