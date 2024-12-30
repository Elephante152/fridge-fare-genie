import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Heart, HeartOff } from "lucide-react";
import { useSavedRecipes } from "@/hooks/useSavedRecipes";
import type { Recipe } from "@/types/recipe";

interface SaveRecipeButtonProps {
  recipe: Recipe;
  isSaved: boolean;
  savedRecipeId?: string;
}

const SaveRecipeButton = ({ recipe, isSaved, savedRecipeId }: SaveRecipeButtonProps) => {
  const { saveRecipe, removeSavedRecipe, isSaving, isRemoving } = useSavedRecipes();

  const handleToggleSave = () => {
    if (isSaved && savedRecipeId) {
      removeSavedRecipe(savedRecipeId);
    } else {
      saveRecipe(recipe);
    }
  };

  const isLoading = isSaving || isRemoving;

  return (
    <Button
      variant={isSaved ? "destructive" : "secondary"}
      size="sm"
      onClick={handleToggleSave}
      disabled={isLoading}
      className="gap-2"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isSaved ? (
        <HeartOff className="h-4 w-4" />
      ) : (
        <Heart className="h-4 w-4" />
      )}
      {isSaved ? "Remove from favorites" : "Save recipe"}
    </Button>
  );
};

export default SaveRecipeButton;