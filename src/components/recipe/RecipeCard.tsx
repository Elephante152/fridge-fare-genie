import React from 'react';
import { motion } from 'framer-motion';
import { Recipe } from '@/types/recipe';
import { Button } from '@/components/ui/button';

interface RecipeCardProps {
  recipe: Recipe;
  isExpanded: boolean;
  onToggle: () => void;
  onSave: (recipe: Recipe) => Promise<void>;
  index: number;
}

const RecipeCard = ({ recipe, isExpanded, onToggle, onSave, index }: RecipeCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border rounded-lg overflow-hidden bg-white/80 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
        <button
          onClick={onToggle}
          className="flex-1 text-left hover:bg-brand-yellow/10 transition-colors rounded-lg p-2 w-full"
        >
          <h4 className="font-semibold text-base sm:text-lg font-serif">{recipe.title}</h4>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">{recipe.description}</p>
        </button>
        <Button
          onClick={() => onSave(recipe)}
          variant="secondary"
          size="sm"
          className="flex-shrink-0 w-full sm:w-auto"
        >
          Save Recipe
        </Button>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-3 sm:p-4 pt-0 border-t bg-brand-platinum/10">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <RecipeSection
                title="Ingredients"
                items={recipe.ingredients}
                index={index}
              />
              <RecipeSection
                title="Instructions"
                items={recipe.instructions}
                index={index}
                ordered
              />
            </div>
            <RecipeMetadata recipe={recipe} />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const RecipeSection = ({ 
  title, 
  items, 
  index, 
  ordered = false 
}: { 
  title: string; 
  items?: string[]; 
  index: number;
  ordered?: boolean;
}) => {
  const ListComponent = ordered ? 'ol' : 'ul';
  const listClass = ordered ? 'list-decimal' : 'list-disc';

  return (
    <motion.div 
      className="space-y-2 sm:space-y-3"
      initial={{ opacity: 0, x: ordered ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <h5 className="font-medium text-brand-myrtleGreen">{title}</h5>
      <ListComponent className={`${listClass} list-inside space-y-1 text-xs sm:text-sm`}>
        {items?.map((item, i) => (
          <motion.li 
            key={i} 
            className="text-muted-foreground"
            initial={{ opacity: 0, x: ordered ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            {item}
          </motion.li>
        ))}
      </ListComponent>
    </motion.div>
  );
};

const RecipeMetadata = ({ recipe }: { recipe: Recipe }) => {
  return (
    <motion.div 
      className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      {recipe.cooking_time && (
        <span>🕒 {recipe.cooking_time}</span>
      )}
      {recipe.servings && (
        <span>👥 Serves {recipe.servings}</span>
      )}
    </motion.div>
  );
};

export default RecipeCard;