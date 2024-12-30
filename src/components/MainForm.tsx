import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import RecipeResultModal from '@/components/RecipeResultModal';
import { triggerConfetti } from '@/utils/confetti';
import { generateRecipes } from '@/services/openai';
import type { Recipe } from '@/types/recipe';
import { supabase } from '@/integrations/supabase/client';
import RecipeGenerationForm from './RecipeGenerationForm';

const MainForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [currentRequirements, setCurrentRequirements] = useState('');
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const { toast } = useToast();

  const handleGenerate = async (images: string[], requirements: string) => {
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to generate recipes.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // First, analyze the ingredients in the images
      const { data: ingredientsData, error: ingredientsError } = await supabase.functions.invoke(
        'analyze-ingredients',
        {
          body: { 
            images,
            requirements
          }
        }
      );

      if (ingredientsError) {
        throw new Error('Failed to analyze ingredients');
      }

      console.log('Identified ingredients:', ingredientsData.ingredients);
      
      // Then generate recipes based on the identified ingredients
      const generatedRecipes = await generateRecipes(ingredientsData.ingredients, requirements);
      
      // Transform the recipes to match the database schema
      const recipesToSave = generatedRecipes.map(recipe => ({
        title: recipe.title,
        description: recipe.description,
        cooking_time: recipe.cooking_time || '30 minutes',
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        user_id: user.id,
      }));

      setRecipes(recipesToSave);
      setCurrentRequirements(requirements);
      setCurrentImages(images);
      triggerConfetti();
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error generating recipes",
        description: "Something went wrong while generating your recipes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <RecipeGenerationForm 
        onGenerate={handleGenerate}
        isLoading={isLoading}
      />
      <RecipeResultModal
        isOpen={showResults}
        onClose={() => setShowResults(false)}
        recipes={recipes}
        requirements={currentRequirements}
        images={currentImages}
      />
    </>
  );
};

export default MainForm;