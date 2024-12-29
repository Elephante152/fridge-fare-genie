import { Recipe } from '@/types/recipe';
import { supabase } from '@/integrations/supabase/client';

export async function generateRecipes(ingredients: string[], requirements: string): Promise<Recipe[]> {
  try {
    const { data, error } = await supabase.functions.invoke('generate-recipes', {
      body: { ingredients, requirements }
    });

    if (error) {
      console.error('Error generating recipes:', error);
      throw new Error('Failed to generate recipes');
    }

    return data;
  } catch (error) {
    console.error('Error calling generate-recipes function:', error);
    throw error;
  }
}