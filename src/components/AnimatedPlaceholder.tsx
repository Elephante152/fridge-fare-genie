import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const examplesByType = {
  cuisines: [
    "E.g., Italian, Japanese, Mediterranean, Thai...",
    "E.g., Mexican, Indian, French, Korean...",
    "E.g., Chinese, Greek, Lebanese, Spanish...",
    "E.g., Vietnamese, Brazilian, Turkish, Moroccan...",
    "E.g., American, Ethiopian, Persian, Caribbean..."
  ],
  allergies: [
    "E.g., peanuts, shellfish, dairy...",
    "E.g., celiac disease, lactose intolerance...",
    "E.g., kosher dietary restrictions...",
    "E.g., tree nuts, soy products...",
    "E.g., egg allergies, fish allergies..."
  ],
  cookingTools: [
    "E.g., air fryer, instant pot, food processor...",
    "E.g., blender, slow cooker, stand mixer...",
    "E.g., wok, cast iron skillet, dutch oven...",
    "E.g., microwave, toaster oven, rice cooker...",
    "E.g., grill, smoker, sous vide machine..."
  ],
  requirements: [
    "E.g., Training for a marathon - need high-carb, protein-rich meals with sweet potatoes, quinoa, and lean proteins...",
    "E.g., Preparing for a fight - looking for anti-inflammatory foods like berries, leafy greens, and omega-3 rich fish...",
    "E.g., Managing blood pressure - need low-sodium recipes with potassium-rich foods like bananas and avocados...",
    "E.g., Supporting gut health during menstrual cycle - seeking fermented foods, fiber-rich grains, and iron-rich ingredients...",
    "E.g., Dealing with inflammation - need turmeric, ginger, and antioxidant-rich ingredients for healing meals..."
  ]
};

interface AnimatedPlaceholderProps {
  className?: string;
  type?: keyof typeof examplesByType;
}

const AnimatedPlaceholder = ({ className = "", type = "requirements" }: AnimatedPlaceholderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const examples = examplesByType[type];

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
          }, 500);
        }
      }, 25);

      return () => clearInterval(eraseInterval);
    };

    typingInterval = setInterval(typeNextChar, 50);

    return () => {
      if (typingInterval) clearInterval(typingInterval);
      if (pauseTimeout) clearTimeout(pauseTimeout);
    };
  }, [currentIndex, isTyping, examples]);

  return (
    <div className={`relative min-h-[3rem] sm:min-h-[2rem] mb-2 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.125 }}
          className="absolute inset-0 flex items-center text-muted-foreground text-sm pointer-events-none break-words whitespace-pre-wrap px-1"
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
      </AnimatePresence>
    </div>
  );
};

export default AnimatedPlaceholder;