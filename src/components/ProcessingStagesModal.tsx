import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Database, CookingPot } from 'lucide-react';

interface ProcessingStagesModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

const stages = [
  {
    title: "Analyzing Ingredients",
    icon: FlaskConical,
    description: "Identifying and processing your ingredients..."
  },
  {
    title: "Evaluating Requirements",
    icon: Database,
    description: "Analyzing your preferences and dietary needs..."
  },
  {
    title: "Cooking Up",
    icon: CookingPot,
    description: "Creating personalized recipes just for you..."
  }
];

const ProcessingStagesModal = ({ isOpen, onComplete }: ProcessingStagesModalProps) => {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStage(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStage(prev => {
        if (prev >= stages.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm mx-auto p-4 sm:p-6">
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
          <AnimatePresence mode="wait">
            {stages.map((stage, index) => (
              currentStage === index && (
                <motion.div
                  key={stage.title}
                  className="flex flex-col items-center text-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-3 sm:p-4 rounded-full bg-brand-myrtleGreen/10"
                  >
                    <stage.icon className="w-8 h-8 sm:w-12 sm:h-12 text-brand-myrtleGreen" />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-serif text-brand-myrtleGreen">
                    {stage.title}
                  </h3>
                  <p className="text-sm sm:text-base text-brand-jet/70">
                    {stage.description}
                  </p>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessingStagesModal;