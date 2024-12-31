import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Search, CookingPot, Package } from 'lucide-react';

interface ButtonStagesProps {
  currentStage: number;
}

const stages = [
  { icon: Activity, text: "Analyzing Ingredients" },
  { icon: Search, text: "Evaluating Requirements" },
  { icon: CookingPot, text: "Cooking Up" },
  { icon: Package, text: "Preparing Your Recipes" }
];

const ButtonStages = ({ currentStage }: ButtonStagesProps) => {
  return (
    <AnimatePresence mode="wait">
      {currentStage > -1 && currentStage < 4 && (
        <motion.div
          key={currentStage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-center gap-3 text-brand-myrtleGreen font-medium bg-white/50 backdrop-blur-sm rounded-lg p-3 shadow-sm"
        >
          {React.createElement(stages[currentStage].icon, {
            className: "w-6 h-6 animate-pulse text-brand-myrtleGreen"
          })}
          <span className="text-lg">{stages[currentStage].text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ButtonStages;