import React from 'react';
import { ChevronDown, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SaveRecipeButton from './SaveRecipeButton';
import { useSavedRecipes } from '@/hooks/useSavedRecipes';
import type { Recipe } from '@/types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  isExpanded: boolean;
  onToggle: () => void;
}

const RecipeCard = ({ recipe, isExpanded, onToggle }: RecipeCardProps) => {
  const { savedRecipes } = useSavedRecipes();
  const savedRecipe = savedRecipes.find(
    (saved) => saved.title === recipe.title && 
    saved.description === recipe.description
  );

  return (
    <Card className="w-full mb-4 animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1 cursor-pointer" onClick={onToggle}>
            <CardTitle className="text-xl font-serif">{recipe.title}</CardTitle>
            <CardDescription>{recipe.description}</CardDescription>
            <div className="flex gap-4 text-sm text-muted-foreground mt-2">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{recipe.cooking_time}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{recipe.servings} servings</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SaveRecipeButton 
              recipe={recipe}
              isSaved={!!savedRecipe}
              savedRecipeId={savedRecipe?.id}
            />
            <Button variant="ghost" size="icon" onClick={onToggle}>
              <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="animate-accordion-down">
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-lg mb-2">Ingredients</h3>
              <ul className="list-disc list-inside space-y-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-sm">{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-lg mb-2">Instructions</h3>
              <ol className="list-decimal list-inside space-y-2">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-sm">{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default RecipeCard;