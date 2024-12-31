import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const examples = [
  "E.g., Training for a marathon - need high-carb, protein-rich meals with sweet potatoes, quinoa, and lean proteins...",
  "E.g., Preparing for a fight - looking for anti-inflammatory foods like berries, leafy greens, and omega-3 rich fish...",
  "E.g., Managing blood pressure - need low-sodium recipes with potassium-rich foods like bananas and avocados...",
  "E.g., Supporting gut health during menstrual cycle - seeking fermented foods, fiber-rich grains, and iron-rich ingredients...",
  "E.g., Dealing with inflammation - need turmeric, ginger, and antioxidant-rich ingredients for healing meals..."
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
        }, 500); // Reduced from 2000ms to 500ms (75% faster)
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
          }, 250); // Reduced from 1000ms to 250ms (75% faster)
        }
      }, 25); // Reduced from 100ms to 25ms (75% faster)

      return () => clearInterval(eraseInterval);
    };

    // Start typing animation with increased speed
    typingInterval = setInterval(typeNextChar, 25); // Reduced from 100ms to 25ms (75% faster)

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
          transition={{ duration: 0.125 }} // Reduced from 0.5s to 0.125s (75% faster)
          className="absolute inset-0 flex items-center px-3 py-2 text-muted-foreground text-sm pointer-events-none"
        >
          {displayText}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.2, repeat: Infinity }} // Reduced from 0.8s to 0.2s (75% faster)
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