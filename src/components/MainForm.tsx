import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import RecipeResultModal from '@/components/RecipeResultModal';
import { triggerConfetti } from '@/utils/confetti';
import { generateRecipes } from '@/services/openai';
import type { Recipe } from '@/types/recipe';
import { supabase } from '@/integrations/supabase/client';
import RecipeGenerationForm from './RecipeGenerationForm';
import ButtonStages from './ButtonStages';

const MainForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [currentRequirements, setCurrentRequirements] = useState('');
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isLoading) {
      // Start the stage animation sequence with longer delays
      setCurrentStage(0);
      timeout = setTimeout(() => {
        setCurrentStage(1);
        timeout = setTimeout(() => {
          setCurrentStage(2);
          timeout = setTimeout(() => {
            setCurrentStage(3);
          }, 2000); // Third stage
        }, 2000); // Second stage
      }, 2000); // First stage
    } else {
      setCurrentStage(-1);
    }
    return () => clearTimeout(timeout);
  }, [isLoading]);

  const handleGenerate = async (images: string[], requirements: string) => {
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
      let ingredientsData = { ingredients: [] };
      
      // Only analyze images if they are provided
      if (images.length > 0) {
        const { data, error: ingredientsError } = await supabase.functions.invoke(
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
        
        ingredientsData = data;
        console.log('Identified ingredients:', ingredientsData.ingredients);
      }
      
      // Generate recipes based on the identified ingredients and/or requirements
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

      // Add a longer delay before showing results for better UX
      setTimeout(() => {
        setRecipes(recipesToSave);
        setCurrentRequirements(requirements);
        setCurrentImages(images);
        triggerConfetti();
        setShowResults(true);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error generating recipes",
        description: "Something went wrong while generating your recipes. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <ButtonStages currentStage={currentStage} />
        <RecipeGenerationForm 
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />
      </div>
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
