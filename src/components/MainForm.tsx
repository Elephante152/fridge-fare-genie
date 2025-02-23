import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import RecipeResultModal from '@/components/RecipeResultModal';
import ProcessingStagesModal from '@/components/ProcessingStagesModal';
import { triggerConfetti } from '@/utils/confetti';
import { generateRecipes } from '@/services/openai';
import type { Recipe } from '@/types/recipe';
import { supabase } from '@/integrations/supabase/client';
import RecipeGenerationForm from './RecipeGenerationForm';

const MainForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);
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
    setShowProcessing(true);

    try {
      let ingredientsData = { ingredients: [] };
      
      // Only analyze images if they are provided
      if (images.length > 0) {
        const { data, error: ingredientsError } = await supabase.functions.invoke(
          'analyze-ingredients',
          {
            body: { 
              images,
              requirements,
              userId: user.id // Pass user ID for preferences context
            }
          }
        );

        if (ingredientsError) {
          throw new Error('Failed to analyze ingredients');
        }
        
        ingredientsData = data;
        console.log('Identified ingredients:', ingredientsData.ingredients);
      }
      
      // Generate recipes based on the identified ingredients and/or requirements
      const generatedRecipes = await generateRecipes(ingredientsData.ingredients, requirements, user.id);
      
      // Transform the recipes to match the database schema
      const recipesToSave = generatedRecipes.map(recipe => ({
        title: recipe.title,
        description: recipe.description,
        cooking_time: recipe.cooking_time || '30 minutes',
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        user_id: user.id,
        preferences_considered: recipe.preferences_considered // Updated property name here
      }));

      setRecipes(recipesToSave);
      setCurrentRequirements(requirements);
      setCurrentImages(images);
      
      // Show success message with preferences considered
      toast({
        title: "Recipes generated successfully!",
        description: "Your preferences have been taken into account.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error generating recipes",
        description: "Something went wrong while generating your recipes. Please try again.",
        variant: "destructive",
      });
      setShowProcessing(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProcessingComplete = () => {
    setShowProcessing(false);
    triggerConfetti();
    setShowResults(true);
  };

  return (
    <>
      <RecipeGenerationForm 
        onGenerate={handleGenerate}
        isLoading={isLoading}
      />
      <ProcessingStagesModal
        isOpen={showProcessing}
        onComplete={handleProcessingComplete}
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