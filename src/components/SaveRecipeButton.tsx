import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Heart, HeartOff } from "lucide-react";
import { useSavedRecipes } from "@/hooks/useSavedRecipes";
import { useToast } from "@/components/ui/use-toast";
import type { Recipe } from "@/types/recipe";
import { motion, AnimatePresence } from "framer-motion";

interface SaveRecipeButtonProps {
  recipe: Recipe;
  isSaved: boolean;
  savedRecipeId?: string;
}

const SaveRecipeButton = ({ recipe, isSaved, savedRecipeId }: SaveRecipeButtonProps) => {
  const { saveRecipe, removeSavedRecipe, isSaving, isRemoving } = useSavedRecipes();
  const { toast } = useToast();
  const [isClicked, setIsClicked] = React.useState(false);
  const [showFeedback, setShowFeedback] = React.useState(false);

  const handleToggleSave = async () => {
    setIsClicked(true);
    setShowFeedback(true);
    
    try {
      if (isSaved && savedRecipeId) {
        await removeSavedRecipe(savedRecipeId);
        toast({
          title: "Recipe removed",
          description: "Recipe has been removed from your favorites",
          duration: 1500, // 1.5 seconds
        });
      } else {
        console.log('Saving recipe:', recipe);
        await saveRecipe(recipe);
        toast({
          title: "Recipe saved!",
          description: "Recipe has been added to your favorites",
          duration: 1500, // 1.5 seconds
        });
      }
    } catch (error) {
      console.error('Error saving/removing recipe:', error);
      toast({
        title: "Error",
        description: "Failed to save recipe. Please try again.",
        variant: "destructive",
        duration: 1500, // 1.5 seconds
      });
    } finally {
      setTimeout(() => {
        setIsClicked(false);
        setShowFeedback(false);
      }, 300);
    }
  };

  const isLoading = isSaving || isRemoving;

  const getButtonStyles = () => {
    if (isLoading) return "bg-gray-200";
    if (isSaved) {
      return "bg-red-500 hover:bg-red-600 text-white";
    }
    return isClicked 
      ? "bg-green-500 text-white animate-pulse" 
      : "bg-secondary hover:bg-secondary/80";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={handleToggleSave}
            disabled={isLoading}
            className={`gap-2 min-w-[160px] relative overflow-hidden transition-all duration-300 ${getButtonStyles()}`}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isSaved ? (
              <HeartOff className="h-4 w-4" />
            ) : (
              <Heart className={`h-4 w-4 ${showFeedback ? 'animate-ping' : ''}`} />
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

            {showFeedback && !isLoading && !isSaved && (
              <motion.div
                className="absolute inset-0 bg-green-500/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default SaveRecipeButton;