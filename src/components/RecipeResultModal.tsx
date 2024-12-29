import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Recipe } from '@/types/recipe';

interface RecipeResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: Recipe[];
  requirements: string;
  images: string[];
}

const RecipeResultModal = ({ isOpen, onClose, recipes, requirements, images }: RecipeResultModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Your Recipe Results</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full mt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Images Used</h3>
              <div className="flex gap-2 flex-wrap">
                {images.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`Ingredient ${index + 1}`} 
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
            
            {requirements && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Requirements</h3>
                <p className="text-muted-foreground">{requirements}</p>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Generated Recipes</h3>
              {recipes.map((recipe, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-semibold">{recipe.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{recipe.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeResultModal;