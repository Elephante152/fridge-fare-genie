import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Recipe } from '@/types/recipe';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      <DialogContent className="max-w-3xl max-h-[80vh] p-0 gap-0 bg-white/95 backdrop-blur-sm">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-serif">Your Recipe Results</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-full max-h-[calc(80vh-4rem)]">
          <div className="p-6 pt-2 space-y-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold font-serif text-brand-myrtleGreen">Images Used</h3>
              <div className="flex gap-3 flex-wrap">
                {images.map((image, index) => (
                  <motion.img 
                    key={index}
                    src={image} 
                    alt={`Ingredient ${index + 1}`} 
                    className="w-24 h-24 object-cover rounded-lg shadow-sm border border-brand-aquamarine/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  />
                ))}
              </div>
            </div>
            
            {requirements && (
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold font-serif text-brand-myrtleGreen">Requirements</h3>
                <p className="text-muted-foreground bg-brand-platinum/30 p-4 rounded-lg">
                  {requirements}
                </p>
              </motion.div>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-semibold font-serif text-brand-myrtleGreen">Generated Recipes</h3>
              {recipes.map((recipe, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border rounded-lg overflow-hidden bg-white/80 shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleRecipe(index)}
                    className="w-full p-4 flex justify-between items-center gap-4 text-left hover:bg-brand-yellow/10 transition-colors"
                  >
                    <div>
                      <h4 className="font-semibold text-lg font-serif">{recipe.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{recipe.description}</p>
                    </div>
                    {expandedRecipeIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-brand-myrtleGreen flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-brand-myrtleGreen flex-shrink-0" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedRecipeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 border-t bg-brand-platinum/10">
                          <div className="grid md:grid-cols-2 gap-6">
                            <motion.div 
                              className="space-y-3"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                            >
                              <h5 className="font-medium text-brand-myrtleGreen">Ingredients</h5>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                {recipe.ingredients?.map((ingredient, i) => (
                                  <motion.li 
                                    key={i} 
                                    className="text-muted-foreground"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                  >
                                    {ingredient}
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                            <motion.div 
                              className="space-y-3"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                            >
                              <h5 className="font-medium text-brand-myrtleGreen">Instructions</h5>
                              <ol className="list-decimal list-inside space-y-2 text-sm">
                                {recipe.instructions?.map((instruction, i) => (
                                  <motion.li 
                                    key={i} 
                                    className="text-muted-foreground"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                  >
                                    {instruction}
                                  </motion.li>
                                ))}
                              </ol>
                            </motion.div>
                          </div>
                          <motion.div 
                            className="mt-4 flex gap-4 text-sm text-muted-foreground"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            {recipe.cookingTime && (
                              <span>🕒 {recipe.cookingTime}</span>
                            )}
                            {recipe.servings && (
                              <span>👥 Serves {recipe.servings}</span>
                            )}
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeResultModal;