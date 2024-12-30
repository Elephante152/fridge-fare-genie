import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { images, requirements } = await req.json()
    
    if (!images || images.length === 0) {
      throw new Error('No images provided')
    }

    console.log('Analyzing ingredients with requirements:', requirements);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 1000,
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant that identifies cooking ingredients in images. 
            Return a JSON array of ingredient names, being as specific as possible about quantities when visible. 
            Consider any dietary restrictions or preferences in your analysis.
            IMPORTANT: Return ONLY a valid JSON array of strings, with no additional formatting or markdown.`,
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `What ingredients do you see in these images? Please identify them specifically. 
                Consider these additional requirements/preferences: ${requirements || 'None'}`,
              },
              ...images.map((base64Image: string) => ({
                type: 'image_url',
                image_url: {
                  url: base64Image
                }
              })),
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    console.log('OpenAI Raw Response:', data);

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to analyze images')
    }

    // Parse the content as JSON, removing any potential markdown formatting
    let ingredients;
    try {
      const content = data.choices[0].message.content;
      console.log('Raw content from OpenAI:', content);
      
      // Remove any markdown code block formatting if present
      const cleanContent = content.replace(/```json\n|\n```|```/g, '').trim();
      console.log('Cleaned content:', cleanContent);
      
      ingredients = JSON.parse(cleanContent);
      
      if (!Array.isArray(ingredients)) {
        throw new Error('OpenAI response is not an array');
      }
      
      console.log('Parsed ingredients:', ingredients);
    } catch (error) {
      console.error('Error parsing ingredients:', error);
      throw new Error(`Failed to parse ingredients from response: ${error.message}`);
    }
    
    return new Response(
      JSON.stringify({ ingredients }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    );
  }
});