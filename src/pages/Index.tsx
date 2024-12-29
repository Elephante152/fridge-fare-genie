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
    <div className="min-h-screen bg-[#F9F7F3]">
      <div className="container max-w-4xl py-16 px-4 md:px-6 space-y-12 animate-fade-in">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-[#222222]">
            Recipe Genie
          </h1>
          <p className="text-[#555555] text-lg md:text-xl max-w-2xl mx-auto font-light">
            Transform your ingredients into culinary masterpieces with AI-powered recipe suggestions
          </p>
        </div>
        
        <div className="space-y-10 bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-serif text-[#333333]">
                Capture Your Ingredients
              </h2>
              <p className="text-[#666666] text-base leading-relaxed">
                Take a clear photo of your ingredients laid out on a clean surface, or upload an image of your grocery haul. For best results, ensure items are:
              </p>
              <ul className="text-[#666666] text-base space-y-2 ml-5 list-disc">
                <li>Well-lit and clearly visible</li>
                <li>Arranged with minimal overlap</li>
                <li>Labels facing the camera when possible</li>
              </ul>
            </div>
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-[#333333]">
              Additional Requirements
            </h2>
            <Textarea
              placeholder="Add any dietary preferences, restrictions, or specific requirements..."
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="min-h-[120px] resize-none bg-white/50 backdrop-blur-sm border-gray-200 focus:border-recipe-sage focus:ring-recipe-sage transition-colors"
            />
          </div>
          
          <Button
            onClick={handleGenerate}
            className="w-full bg-recipe-sage hover:bg-recipe-sage/90 transition-all duration-300 py-6 text-lg font-medium rounded-2xl"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Crafting your recipes...
              </>
            ) : (
              'Generate Recipes'
            )}
          </Button>
        </div>

        {recipes.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-3xl font-serif text-[#333333] text-center">
              Your Recipes
            </h2>
            <div className="grid gap-6">
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