import React, { useState } from 'react';
import { useSavedRecipes } from '@/hooks/useSavedRecipes';
import RecipeCard from '@/components/RecipeCard';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const SavedRecipes = () => {
  const { savedRecipes, isLoading } = useSavedRecipes();
  const [expandedRecipeIds, setExpandedRecipeIds] = useState<Set<string>>(new Set());

  const toggleRecipe = (recipeId: string) => {
    setExpandedRecipeIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(recipeId)) {
        newSet.delete(recipeId);
      } else {
        newSet.add(recipeId);
      }
      return newSet;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-myrtleGreen" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="container max-w-4xl py-16 px-4 md:px-6 space-y-12">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-brand-myrtleGreen">
            Saved Recipes
          </h1>
          <p className="mt-4 text-lg text-brand-jet/70">
            Your collection of favorite recipes
          </p>
        </header>

        {savedRecipes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-lg text-brand-jet/70">
              You haven't saved any recipes yet.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-6"
          >
            {savedRecipes.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe}
                isExpanded={expandedRecipeIds.has(recipe.id || '')}
                onToggle={() => toggleRecipe(recipe.id || '')}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;