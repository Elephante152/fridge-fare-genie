import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Recipe } from '@/types/recipe';
import SaveRecipeButton from '@/components/SaveRecipeButton';
import { useSavedRecipes } from '@/hooks/useSavedRecipes';

interface RecipeCardProps {
  recipe: Recipe;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

const RecipeCard = ({ recipe, isExpanded, onToggle, index }: RecipeCardProps) => {
  const { savedRecipes } = useSavedRecipes();
  const isSaved = savedRecipes.some(saved => saved.title === recipe.title);
  const savedRecipeId = savedRecipes.find(saved => saved.title === recipe.title)?.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-brand-aquamarine/20 overflow-hidden"
    >
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h4 className="text-lg sm:text-xl font-serif font-medium text-brand-myrtleGreen mb-2">
              {recipe.title}
            </h4>
            <p className="text-sm sm:text-base text-muted-foreground">
              {recipe.description}
            </p>
          </div>
          <SaveRecipeButton
            recipe={recipe}
            isSaved={isSaved}
            savedRecipeId={savedRecipeId}
          />
        </div>

        <button
          onClick={onToggle}
          className="flex items-center gap-2 text-sm text-brand-myrtleGreen/80 hover:text-brand-myrtleGreen mt-4 transition-colors"
        >
          {isExpanded ? (
            <>
              Show less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Show more <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-4"
          >
            <div>
              <h5 className="font-medium text-brand-myrtleGreen mb-2">Cooking Information</h5>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>🕒 {recipe.cooking_time}</span>
                <span>👥 Serves {recipe.servings}</span>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-brand-myrtleGreen mb-2">Ingredients</h5>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-medium text-brand-myrtleGreen mb-2">Instructions</h5>
              <ol className="list-decimal list-inside text-sm space-y-2 text-muted-foreground">
                {recipe.instructions.map((instruction, i) => (
                  <li key={i}>{instruction}</li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default RecipeCard;