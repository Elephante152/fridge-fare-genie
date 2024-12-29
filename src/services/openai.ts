import { Recipe } from '@/types/recipe';

const SYSTEM_PROMPT = `You are a helpful cooking assistant that suggests recipes based on available ingredients and user requirements. 
Always respond with exactly 3 recipes in JSON format. Each recipe should include:
- title: string
- description: string
- cookingTime: string (e.g. "30 mins")
- servings: number
- ingredients: string[]
- instructions: string[]

Keep recipes practical and achievable with common kitchen equipment.`;

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function generateRecipes(ingredients: string[], requirements: string): Promise<Recipe[]> {
  const userPrompt = `
    Available ingredients: ${ingredients.join(', ')}
    ${requirements ? `Additional requirements: ${requirements}` : ''}
    
    Please suggest 3 recipes I can make with these ingredients, considering any dietary requirements specified.
    Respond in JSON format as an array of recipe objects.
  `;

  const messages: OpenAIMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: userPrompt }
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate recipes');
    }

    const data = await response.json();
    const recipesString = data.choices[0].message.content;
    
    try {
      const recipes: Recipe[] = JSON.parse(recipesString);
      return recipes;
    } catch (error) {
      console.error('Failed to parse OpenAI response:', error);
      throw new Error('Failed to parse recipe suggestions');
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}