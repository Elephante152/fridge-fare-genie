import React, { useState } from 'react';
import { useSavedRecipes } from '@/hooks/useSavedRecipes';
import RecipeCard from '@/components/RecipeCard';
import { Loader2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
      <div className="container max-w-4xl py-8 md:py-16 px-4 md:px-6 space-y-8 md:space-y-12">
        <div className="flex flex-col space-y-6">
          <Link to="/">
            <Button 
              variant="ghost" 
              className="w-fit text-brand-myrtleGreen hover:text-brand-myrtleGreen/80 hover:bg-brand-aquamarine/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Generator
            </Button>
          </Link>
          
          <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-medium bg-clip-text text-transparent animate-gradient-x bg-gradient-to-r from-brand-aquamarine via-brand-myrtleGreen to-brand-yellow bg-[length:200%_100%]">
              Saved Recipes
            </h1>
            <p className="mt-4 text-lg text-brand-jet/70">
              Your collection of favorite recipes
            </p>
          </header>
        </div>

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