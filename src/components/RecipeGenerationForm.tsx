import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ImageUpload';
import { useToast } from '@/components/ui/use-toast';
import AnimatedPlaceholder from './AnimatedPlaceholder';

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
    if (uploadedImages.length === 0 && !requirements.trim()) {
      toast({
        title: "No input provided",
        description: "Please either upload images of your ingredients or describe your requirements.",
        variant: "destructive",
      });
      return;
    }

    await onGenerate(uploadedImages, requirements);
  };

  return (
    <motion.div 
      className="space-y-8 sm:space-y-12 bg-[hsl(30,33%,98%)] backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-xl border border-brand-aquamarine/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-myrtleGreen text-white font-semibold text-sm sm:text-base">1</span>
          <div className="space-y-3 sm:space-y-4 flex-1">
            <h2 className="text-xl sm:text-2xl font-serif text-brand-myrtleGreen">
              Capture Your Ingredients (Optional)
            </h2>
            <p className="text-sm sm:text-base text-brand-jet/70 leading-relaxed">
              Take a clear photo of your ingredients laid out on a clean surface, or upload an image of your grocery haul.
              You can skip this step if you prefer to describe your ingredients in text below.
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
        <div className="flex items-start space-x-3 sm:space-x-4">
          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-myrtleGreen text-white font-semibold text-sm sm:text-base">2</span>
          <div className="space-y-3 sm:space-y-4 flex-1">
            <h2 className="text-xl sm:text-2xl font-serif text-brand-myrtleGreen">
              Additional Requirements
            </h2>
            <div className="text-sm sm:text-base text-brand-jet/70 leading-relaxed">
              <AnimatedPlaceholder className="relative h-6 !inset-auto" />
            </div>
            <div className="relative">
              <Textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="min-h-[120px] resize-none bg-white/50 backdrop-blur-sm border-brand-aquamarine/20 focus:border-brand-myrtleGreen focus:ring-brand-myrtleGreen/20 transition-colors text-sm sm:text-base"
                placeholder="Enter your requirements here..."
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-2 sm:pt-4">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-myrtleGreen text-white font-semibold text-sm sm:text-base">3</span>
          <div className="space-y-3 sm:space-y-4 flex-1">
            <h2 className="text-xl sm:text-2xl font-serif text-brand-myrtleGreen">
              Generate Your Recipes
            </h2>
            <p className="text-sm sm:text-base text-brand-jet/70 leading-relaxed">
              Click the button below to get personalized recipe suggestions based on your input.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleSubmit}
                className={`w-full transition-all duration-300 py-4 sm:py-6 text-base sm:text-lg font-medium rounded-xl sm:rounded-2xl shadow-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden
                  ${isLoading 
                    ? 'bg-brand-myrtleGreen text-white' 
                    : 'animate-gradient-x text-white font-semibold tracking-wide before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-aquamarine before:via-brand-myrtleGreen before:to-brand-yellow before:animate-gradient-x before:bg-[length:200%_100%]'
                  }`}
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      <span>Analyzing input...</span>
                    </>
                  ) : (
                    'Generate Recipes'
                  )}
                </span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeGenerationForm;