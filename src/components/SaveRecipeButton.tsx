import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Heart, HeartOff } from "lucide-react";
import { useSavedRecipes } from "@/hooks/useSavedRecipes";
import { useToast } from "@/components/ui/use-toast";
import type { Recipe } from "@/types/recipe";
import { motion } from "framer-motion";

interface SaveRecipeButtonProps {
  recipe: Recipe;
  isSaved: boolean;
  savedRecipeId?: string;
}

const SaveRecipeButton = ({ recipe, isSaved, savedRecipeId }: SaveRecipeButtonProps) => {
  const { saveRecipe, removeSavedRecipe, isSaving, isRemoving } = useSavedRecipes();
  const { toast } = useToast();

  const handleToggleSave = async () => {
    try {
      if (isSaved && savedRecipeId) {
        await removeSavedRecipe(savedRecipeId);
        toast({
          title: "Recipe removed",
          description: "Recipe has been removed from your favorites",
        });
      } else {
        await saveRecipe(recipe);
        toast({
          title: "Recipe saved!",
          description: "Recipe has been added to your favorites",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save recipe. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isLoading = isSaving || isRemoving;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant={isSaved ? "destructive" : "secondary"}
        size="sm"
        onClick={handleToggleSave}
        disabled={isLoading}
        className="gap-2 min-w-[160px] relative overflow-hidden"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isSaved ? (
          <HeartOff className="h-4 w-4" />
        ) : (
          <Heart className="h-4 w-4" />
        )}
        {isSaved ? "Remove from favorites" : "Save recipe"}
        
        {isLoading && (
          <motion.div
            className="absolute inset-0 bg-foreground/10"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear"
            }}
          />
        )}
      </Button>
    </motion.div>
  );
};

export default SaveRecipeButton;