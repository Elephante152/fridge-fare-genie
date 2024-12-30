import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Recipe } from "@/types/recipe";
import { useToast } from "@/hooks/use-toast";

export const useSavedRecipes = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: savedRecipes = [], isLoading } = useQuery({
    queryKey: ["savedRecipes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_recipes")
        .select("*");

      if (error) {
        console.error("Error fetching saved recipes:", error);
        throw error;
      }

      return data || [];
    },
  });

  const saveRecipe = useMutation({
    mutationFn: async (recipe: Recipe) => {
      const { error } = await supabase
        .from("saved_recipes")
        .insert([recipe]);

      if (error) {
        console.error("Error saving recipe:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedRecipes"] });
      toast({
        title: "Recipe saved!",
        description: "The recipe has been added to your favorites.",
      });
    },
    onError: () => {
      toast({
        title: "Error saving recipe",
        description: "There was a problem saving the recipe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const removeSavedRecipe = useMutation({
    mutationFn: async (recipeId: string) => {
      const { error } = await supabase
        .from("saved_recipes")
        .delete()
        .eq("id", recipeId);

      if (error) {
        console.error("Error removing saved recipe:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedRecipes"] });
      toast({
        title: "Recipe removed",
        description: "The recipe has been removed from your favorites.",
      });
    },
    onError: () => {
      toast({
        title: "Error removing recipe",
        description: "There was a problem removing the recipe. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    savedRecipes,
    isLoading,
    saveRecipe: saveRecipe.mutate,
    removeSavedRecipe: removeSavedRecipe.mutate,
    isSaving: saveRecipe.isPending,
    isRemoving: removeSavedRecipe.isPending,
  };
};