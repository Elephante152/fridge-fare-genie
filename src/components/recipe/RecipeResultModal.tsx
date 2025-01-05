import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Recipe } from '@/types/recipe';
import { motion } from 'framer-motion';
import RecipeCard from './RecipeCard';

interface RecipeResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: Recipe[];
  requirements: string;
  images: string[];
}

const RecipeResultModal = ({ isOpen, onClose, recipes, requirements, images }: RecipeResultModalProps) => {
  const [expandedRecipeIndex, setExpandedRecipeIndex] = useState<number | null>(null);

  const toggleRecipe = (index: number) => {
    setExpandedRecipeIndex(expandedRecipeIndex === index ? null : index);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] p-0 gap-0 bg-white/95 backdrop-blur-sm mx-auto">
        <DialogHeader className="p-4 sm:p-6 pb-2">
          <DialogTitle className="text-xl sm:text-2xl font-serif">Your Recipe Results</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-full max-h-[calc(90vh-4rem)]">
          <div className="p-4 sm:p-6 pt-2 space-y-6 sm:space-y-8">
            {images.length > 0 && (
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-base sm:text-lg font-semibold font-serif text-brand-myrtleGreen">Images Used</h3>
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  {images.map((image, index) => (
                    <motion.img 
                      key={index}
                      src={image} 
                      alt={`Ingredient ${index + 1}`} 
                      className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg shadow-sm border border-brand-aquamarine/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {requirements && (
              <motion.div 
                className="space-y-2 sm:space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-base sm:text-lg font-semibold font-serif text-brand-myrtleGreen">Requirements</h3>
                <p className="text-sm sm:text-base text-muted-foreground bg-brand-platinum/30 p-3 sm:p-4 rounded-lg">
                  {requirements}
                </p>
              </motion.div>
            )}

            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold font-serif text-brand-myrtleGreen">Generated Recipes</h3>
              {recipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  recipe={recipe}
                  isExpanded={expandedRecipeIndex === index}
                  onToggle={() => toggleRecipe(index)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeResultModal;