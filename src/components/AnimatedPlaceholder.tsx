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
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) {
      setDisplayText("");
      return;
    }

    let currentText = examples[currentIndex];
    let currentChar = 0;
    let typingInterval: NodeJS.Timeout | null = null;
    let pauseTimeout: NodeJS.Timeout | null = null;

    const typeNextChar = () => {
      if (currentChar < currentText.length && isTyping && isActive) {
        setDisplayText(currentText.substring(0, currentChar + 1));
        currentChar++;
      } else if (currentChar >= currentText.length) {
        if (typingInterval) {
          clearInterval(typingInterval);
          typingInterval = null;
        }
        
        pauseTimeout = setTimeout(() => {
          if (isActive) {
            setIsTyping(false);
            eraseText();
          }
        }, 500);
      }
    };

    const eraseText = () => {
      const eraseInterval = setInterval(() => {
        if (currentChar > 0 && isActive) {
          currentChar--;
          setDisplayText(currentText.substring(0, currentChar));
        } else {
          clearInterval(eraseInterval);
          if (isActive) {
            setTimeout(() => {
              setCurrentIndex((prev) => (prev + 1) % examples.length);
              setIsTyping(true);
            }, 250);
          }
        }
      }, 25);

      return () => clearInterval(eraseInterval);
    };

    typingInterval = setInterval(typeNextChar, 25);

    const handleFocus = () => setIsActive(false);
    const textArea = document.querySelector('textarea');
    if (textArea) {
      textArea.addEventListener('focus', handleFocus);
      textArea.addEventListener('click', handleFocus);
    }

    return () => {
      if (typingInterval) clearInterval(typingInterval);
      if (pauseTimeout) clearTimeout(pauseTimeout);
      if (textArea) {
        textArea.removeEventListener('focus', handleFocus);
        textArea.removeEventListener('click', handleFocus);
      }
    };
  }, [currentIndex, isTyping, isActive]);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.125 }}
            className="absolute inset-0 flex items-center px-3 py-2 text-muted-foreground text-sm pointer-events-none"
          >
            {displayText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.2, repeat: Infinity }}
              className="inline-block w-[2px] h-[14px] bg-muted-foreground/50 ml-[2px]"
            >
              |
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedPlaceholder;