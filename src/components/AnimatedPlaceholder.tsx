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
    let typingInterval: NodeJS.Timeout | null = null;
    let pauseTimeout: NodeJS.Timeout | null = null;

    const typeNextChar = () => {
      if (currentChar < currentText.length && isTyping) {
        setDisplayText(currentText.substring(0, currentChar + 1));
        currentChar++;
      } else if (currentChar >= currentText.length) {
        if (typingInterval) {
          clearInterval(typingInterval);
          typingInterval = null;
        }
        
        pauseTimeout = setTimeout(() => {
          setIsTyping(false);
          eraseText();
        }, 2000);
      }
    };

    const eraseText = () => {
      const eraseInterval = setInterval(() => {
        if (currentChar > 0) {
          currentChar--;
          setDisplayText(currentText.substring(0, currentChar));
        } else {
          clearInterval(eraseInterval);
          setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % examples.length);
            setIsTyping(true);
          }, 1000);
        }
      }, 100);

      return () => clearInterval(eraseInterval);
    };

    // Start typing animation
    typingInterval = setInterval(typeNextChar, 100);

    // Cleanup function
    return () => {
      if (typingInterval) clearInterval(typingInterval);
      if (pauseTimeout) clearTimeout(pauseTimeout);
    };
  }, [currentIndex, isTyping]);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center px-3 py-2 text-muted-foreground text-sm pointer-events-none"
        >
          {displayText}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-[2px] h-[14px] bg-muted-foreground/50 ml-[2px]"
          >
            |
          </motion.span>
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedPlaceholder;