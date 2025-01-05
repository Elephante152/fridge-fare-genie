import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ingredients, requirements, userId } = await req.json();
    
    // Initialize Supabase client with service role key
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);
    
    // Fetch user preferences
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) {
      throw new Error('Failed to fetch user preferences');
    }

    // Construct preference context
    const preferencesContext = `
      User Preferences:
      - Diet Type: ${profile.diet_type}
      - Allergies: ${profile.allergies?.join(', ') || 'None'}
      - Favorite Cuisines: ${profile.favorite_cuisines?.join(', ') || 'Any'}
      - Calorie Target: ${profile.calorie_intake} calories per day
      - Meals per Day: ${profile.meals_per_day}
      - Activity Level: ${profile.activity_level}
      - Available Cooking Tools: ${profile.preferred_cooking_tools?.join(', ') || 'Basic kitchen equipment'}
    `;

    const systemPrompt = `You are a helpful cooking assistant that generates recipes based on available ingredients, user requirements, and user preferences. 
    Generate exactly one recipe and return it in JSON format with the following structure:
    {
      "title": "Recipe Title",
      "description": "Brief description that mentions how it aligns with user preferences",
      "cookingTime": "30 minutes",
      "servings": 4,
      "ingredients": ["ingredient 1", "ingredient 2"],
      "instructions": ["step 1", "step 2"],
      "preferencesConsidered": {
        "dietType": "User's diet type",
        "allergies": ["considered allergies"],
        "caloriesPerServing": "estimated calories"
      }
    }
    Do not include any markdown formatting or code blocks in your response. Return only the JSON object.`;

    const userPrompt = `Generate a recipe with the following context:
    ${preferencesContext}
    ${ingredients.length > 0 ? `Available ingredients: ${ingredients.join(', ')}` : ''}
    ${requirements ? `Additional requirements: ${requirements}` : ''}
    
    Important: Unless explicitly overridden in the additional requirements, strictly adhere to:
    1. The user's diet type (${profile.diet_type})
    2. Avoid any listed allergies
    3. Consider their calorie intake goals
    4. Use available cooking tools
    5. Align with preferred cuisines when possible`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate recipe');
    }

    const data = await response.json();
    console.log('OpenAI response:', data);

    let recipe;
    try {
      const content = data.choices[0].message.content;
      recipe = JSON.parse(content);
      const recipes = [recipe];

      return new Response(JSON.stringify(recipes), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      console.error('Raw content:', data.choices[0].message.content);
      throw new Error('Failed to parse recipe data');
    }
  } catch (error) {
    console.error('Error in generate-recipes function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});