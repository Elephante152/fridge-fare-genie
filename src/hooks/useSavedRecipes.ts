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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      console.log('Fetching saved recipes for user:', user.id); // Debug log

      const { data, error } = await supabase
        .from("saved_recipes")
        .select("*")
        .eq('user_id', user.id);

      if (error) {
        console.error("Error fetching saved recipes:", error);
        throw error;
      }

      console.log('Fetched saved recipes:', data); // Debug log
      return data || [];
    },
  });

  const saveRecipe = useMutation({
    mutationFn: async (recipe: Recipe) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      console.log('Saving recipe with user_id:', user.id); // Debug log

      const recipeToSave = {
        ...recipe,
        user_id: user.id,
      };

      const { data, error } = await supabase
        .from("saved_recipes")
        .insert([recipeToSave])
        .select()
        .single();

      if (error) {
        console.error("Error saving recipe:", error);
        throw error;
      }

      console.log('Successfully saved recipe:', data); // Debug log
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedRecipes"] });
    },
    onError: (error) => {
      console.error('Mutation error:', error); // Debug log
      toast({
        title: "Error saving recipe",
        description: "There was a problem saving the recipe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const removeSavedRecipe = useMutation({
    mutationFn: async (recipeId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("saved_recipes")
        .delete()
        .eq("id", recipeId)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error removing saved recipe:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedRecipes"] });
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