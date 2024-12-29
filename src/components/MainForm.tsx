import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import ImageUpload from '@/components/ImageUpload';
import RecipeResultModal from '@/components/RecipeResultModal';
import { triggerConfetti } from '@/utils/confetti';
import type { Recipe } from '@/types/recipe';

const MainForm = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [requirements, setRequirements] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (files: File[]) => {
    const newImages = files.map(file => URL.createObjectURL(file));
    setUploadedImages(prev => [...prev, ...newImages]);
    toast({
      title: `${files.length} image${files.length > 1 ? 's' : ''} uploaded`,
      description: "Your ingredients have been added successfully.",
    });
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (uploadedImages.length === 0) {
      toast({
        title: "No images uploaded",
        description: "Please upload at least one image of your ingredients first.",
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
      triggerConfetti();
      setShowResults(true);
    }, 2000);
  };

  return (
    <motion.div 
      className="space-y-10 bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-lg border border-brand-aquamarine/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-serif text-brand-myrtleGreen">
            Capture Your Ingredients
          </h2>
          <p className="text-brand-jet/70 text-base leading-relaxed">
            Take a clear photo of your ingredients laid out on a clean surface, or upload an image of your grocery haul.
          </p>
        </div>
        <ImageUpload 
          onImageUpload={handleImageUpload}
          uploadedImages={uploadedImages}
          onRemoveImage={handleRemoveImage}
        />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-serif text-brand-myrtleGreen">
          Additional Requirements
        </h2>
        <Textarea
          placeholder="Add any dietary preferences, restrictions, or specific requirements..."
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="min-h-[120px] resize-none bg-white/50 backdrop-blur-sm border-brand-aquamarine/20 focus:border-brand-myrtleGreen focus:ring-brand-myrtleGreen/20 transition-colors"
        />
      </div>
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={handleGenerate}
          className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-jet transition-all duration-300 py-6 text-lg font-medium rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
      </motion.div>

      <RecipeResultModal
        isOpen={showResults}
        onClose={() => setShowResults(false)}
        recipes={recipes}
        requirements={requirements}
        images={uploadedImages}
      />
    </motion.div>
  );
};

export default MainForm;
