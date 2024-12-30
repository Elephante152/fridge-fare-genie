import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ImageUpload';
import { useToast } from '@/components/ui/use-toast';

interface RecipeGenerationFormProps {
  onGenerate: (images: string[], requirements: string) => Promise<void>;
  isLoading: boolean;
}

const RecipeGenerationForm = ({ onGenerate, isLoading }: RecipeGenerationFormProps) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [requirements, setRequirements] = useState('');
  const { toast } = useToast();

  const handleImageUpload = (files: File[]) => {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
    
    toast({
      title: `${files.length} image${files.length > 1 ? 's' : ''} uploaded`,
      description: "Your ingredients have been added successfully.",
    });
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (uploadedImages.length === 0) {
      toast({
        title: "No images uploaded",
        description: "Please upload at least one image of your ingredients first.",
        variant: "destructive",
      });
      return;
    }

    await onGenerate(uploadedImages, requirements);
  };

  return (
    <motion.div 
      className="space-y-12 bg-[hsl(30,33%,98%)] backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border border-brand-aquamarine/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-myrtleGreen text-white font-semibold">1</span>
          <div className="space-y-4 flex-1">
            <h2 className="text-2xl font-serif text-brand-myrtleGreen">
              Capture Your Ingredients
            </h2>
            <p className="text-brand-jet/70 text-base leading-relaxed">
              Take a clear photo of your ingredients laid out on a clean surface, or upload an image of your grocery haul.
            </p>
            <ImageUpload 
              onImageUpload={handleImageUpload}
              uploadedImages={uploadedImages}
              onRemoveImage={handleRemoveImage}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-myrtleGreen text-white font-semibold">2</span>
          <div className="space-y-4 flex-1">
            <h2 className="text-2xl font-serif text-brand-myrtleGreen">
              Additional Requirements
            </h2>
            <p className="text-brand-jet/70 text-base leading-relaxed">
              Add any dietary preferences, restrictions, or specific requirements you have in mind.
            </p>
            <Textarea
              placeholder="E.g., vegetarian, gluten-free, quick meals under 30 minutes..."
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="min-h-[120px] resize-none bg-white/50 backdrop-blur-sm border-brand-aquamarine/20 focus:border-brand-myrtleGreen focus:ring-brand-myrtleGreen/20 transition-colors"
            />
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <div className="flex items-start space-x-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-myrtleGreen text-white font-semibold">3</span>
          <div className="space-y-4 flex-1">
            <h2 className="text-2xl font-serif text-brand-myrtleGreen">
              Generate Your Recipes
            </h2>
            <p className="text-brand-jet/70 text-base leading-relaxed">
              Click the button below to get personalized recipe suggestions based on your ingredients and requirements.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleSubmit}
                className={`w-full transition-all duration-300 py-6 text-lg font-medium rounded-2xl shadow-2xl hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed
                  ${isLoading 
                    ? 'bg-brand-myrtleGreen text-white' 
                    : 'bg-gradient-to-r from-brand-aquamarine via-brand-myrtleGreen to-brand-yellow text-white font-semibold tracking-wide hover:bg-gradient-to-l'
                  }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing ingredients...
                  </>
                ) : (
                  'Generate Recipes'
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeGenerationForm;