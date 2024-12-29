import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import ImageUpload from '@/components/ImageUpload';
import RecipeCard from '@/components/RecipeCard';

interface Recipe {
  title: string;
  description: string;
  cookingTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
}

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [requirements, setRequirements] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    toast({
      title: "Image uploaded successfully",
      description: file.name,
    });
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      toast({
        title: "No image uploaded",
        description: "Please upload an image of your ingredients first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // TODO: Implement OpenAI API integration
    // For now, we'll use mock data
    setTimeout(() => {
      const mockRecipes: Recipe[] = [
        {
          title: "Creamy Mushroom Pasta",
          description: "A delicious vegetarian pasta dish with sautéed mushrooms and herbs",
          cookingTime: "25 mins",
          servings: 4,
          ingredients: [
            "8 oz pasta",
            "2 cups mushrooms, sliced",
            "3 cloves garlic, minced",
            "1 cup heavy cream",
            "Fresh parsley",
            "Salt and pepper to taste"
          ],
          instructions: [
            "Cook pasta according to package instructions",
            "Sauté mushrooms and garlic until golden",
            "Add cream and simmer until thickened",
            "Toss with pasta and garnish with parsley"
          ]
        },
        {
          title: "Mediterranean Quinoa Bowl",
          description: "Fresh and healthy quinoa bowl with roasted vegetables",
          cookingTime: "30 mins",
          servings: 3,
          ingredients: [
            "1 cup quinoa",
            "2 cups mixed vegetables",
            "Olive oil",
            "Lemon juice",
            "Fresh herbs"
          ],
          instructions: [
            "Cook quinoa in vegetable broth",
            "Roast vegetables with olive oil",
            "Combine and dress with lemon juice",
            "Top with fresh herbs"
          ]
        },
        {
          title: "Spiced Chickpea Stew",
          description: "Warming stew with aromatic spices and tender chickpeas",
          cookingTime: "40 mins",
          servings: 4,
          ingredients: [
            "2 cans chickpeas",
            "1 onion, diced",
            "2 tomatoes, chopped",
            "Spice blend",
            "Coconut milk"
          ],
          instructions: [
            "Sauté onions until translucent",
            "Add spices and toast briefly",
            "Add chickpeas and tomatoes",
            "Simmer with coconut milk"
          ]
        }
      ];
      
      setRecipes(mockRecipes);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F1F1F1]">
      <div className="container max-w-3xl py-12 px-4 md:px-0">
        <div className="space-y-6 text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-[#222222]">
            Recipe Genie
          </h1>
          <p className="text-[#555555] text-lg max-w-2xl mx-auto">
            Transform your ingredients into delicious recipes with AI-powered suggestions
          </p>
        </div>
        
        <div className="space-y-8 bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-[#333333] text-left">
              Upload Your Ingredients
            </h2>
            <p className="text-[#666666] text-sm text-left mb-4">
              Take a clear photo of your ingredients laid out on a clean surface, or upload an image of your grocery haul. Make sure items are visible and well-lit for the best results.
            </p>
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-[#333333] text-left">
              Additional Requirements
            </h2>
            <Textarea
              placeholder="Add any dietary preferences, restrictions, or specific requirements..."
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="min-h-[100px] resize-none border-gray-200 focus:border-recipe-sage focus:ring-recipe-sage"
            />
          </div>
          
          <Button
            onClick={handleGenerate}
            className="w-full bg-recipe-sage hover:bg-recipe-sage/90 transition-all duration-200 py-6 text-lg font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating recipes...
              </>
            ) : (
              'Generate Recipes'
            )}
          </Button>
        </div>

        {recipes.length > 0 && (
          <div className="space-y-6 mt-12">
            <h2 className="text-2xl font-serif font-medium text-[#333333] text-left">
              Your Recipes
            </h2>
            <div className="space-y-4">
              {recipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  recipe={recipe}
                  isExpanded={expandedIndex === index}
                  onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;