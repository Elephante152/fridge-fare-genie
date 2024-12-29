import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ingredients, requirements } = await req.json();

    console.log('Received request with ingredients:', ingredients);
    console.log('Requirements:', requirements);

    const systemPrompt = `You are a helpful cooking assistant that generates recipes based on available ingredients and user requirements. 
    Generate exactly one recipe and return it in JSON format with the following structure:
    {
      "title": "Recipe Title",
      "description": "Brief description",
      "cookingTime": "30 minutes",
      "servings": 4,
      "ingredients": ["ingredient 1", "ingredient 2"],
      "instructions": ["step 1", "step 2"]
    }
    Do not include any markdown formatting or code blocks in your response. Return only the JSON object.`;

    const userPrompt = `Generate a recipe using these ingredients: ${ingredients.join(', ')}. 
    Additional requirements: ${requirements || 'None'}. 
    Focus on practical, easy-to-follow recipes that maximize the use of available ingredients.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
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
      // Get the content from the OpenAI response
      const content = data.choices[0].message.content;
      // Parse the content as JSON
      recipe = JSON.parse(content);
      // Ensure we always return an array of recipes
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