import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Database } from '@/integrations/supabase/types';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Utensils, AlertTriangle, Globe, Activity, BarChart, Coffee } from 'lucide-react';

type DietType = Database['public']['Enums']['diet_type'];
type ActivityLevel = Database['public']['Enums']['activity_level'];
type Profile = Database['public']['Tables']['profiles']['Row'];

interface PreferencesFormProps {
  initialData: Profile;
  onComplete: () => void;
}

const DIET_TYPES: DietType[] = ['Omnivore', 'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo'];
const ACTIVITY_LEVELS: ActivityLevel[] = ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extremely Active'];

const PreferencesForm: React.FC<PreferencesFormProps> = ({ initialData, onComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    dietType: initialData.diet_type || 'Omnivore',
    allergies: (initialData.allergies || []).join(', '),
    favoriteCuisines: (initialData.favorite_cuisines || []).join(', '),
    activityLevel: initialData.activity_level || 'Moderately Active',
    calorieIntake: initialData.calorie_intake || 2000,
    mealsPerDay: initialData.meals_per_day || 3,
    preferredCookingTools: (initialData.preferred_cooking_tools || []).join(', '),
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .update({
          diet_type: formData.dietType as DietType,
          allergies: formData.allergies.split(',').map(item => item.trim()),
          favorite_cuisines: formData.favoriteCuisines.split(',').map(item => item.trim()),
          activity_level: formData.activityLevel as ActivityLevel,
          calorie_intake: formData.calorieIntake,
          meals_per_day: formData.mealsPerDay,
          preferred_cooking_tools: formData.preferredCookingTools.split(',').map(item => item.trim()),
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Preferences updated successfully!",
        description: "Your changes have been saved.",
      });
      
      onComplete();
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast({
        title: "Error updating preferences",
        description: "There was a problem saving your changes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-8"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-brand-myrtleGreen">Your Preferences</h1>
        <p className="text-gray-600">Update your dietary and cooking preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-brand-myrtleGreen">
              <Utensils className="w-5 h-5" />
              <Label className="text-xl font-semibold">Diet Type</Label>
            </div>
            <RadioGroup
              value={formData.dietType}
              onValueChange={(value: DietType) => setFormData({ ...formData, dietType: value })}
              className="grid grid-cols-2 gap-4"
            >
              {DIET_TYPES.map((diet) => (
                <div key={diet} className="relative">
                  <RadioGroupItem value={diet} id={diet} className="peer sr-only" />
                  <Label
                    htmlFor={diet}
                    className="flex items-center justify-center px-4 py-3 bg-white border-2 border-gray-200 rounded-lg cursor-pointer transition-all peer-checked:border-brand-myrtleGreen peer-checked:bg-brand-aquamarine/20 hover:bg-gray-50"
                  >
                    {diet}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-brand-myrtleGreen">
              <AlertTriangle className="w-5 h-5" />
              <Label className="text-xl font-semibold">Allergies</Label>
            </div>
            <Textarea
              value={formData.allergies}
              onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
              placeholder="e.g., peanuts, shellfish, dairy"
              className="min-h-[100px] border-2 focus:border-brand-myrtleGreen focus:ring-brand-aquamarine"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-brand-myrtleGreen">
              <Globe className="w-5 h-5" />
              <Label className="text-xl font-semibold">Favorite Cuisines</Label>
            </div>
            <Textarea
              value={formData.favoriteCuisines}
              onChange={(e) => setFormData({ ...formData, favoriteCuisines: e.target.value })}
              placeholder="e.g., Italian, Japanese, Mexican"
              className="min-h-[100px] border-2 focus:border-brand-myrtleGreen focus:ring-brand-aquamarine"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-brand-myrtleGreen">
              <Activity className="w-5 h-5" />
              <Label className="text-xl font-semibold">Activity Level</Label>
            </div>
            <RadioGroup
              value={formData.activityLevel}
              onValueChange={(value: ActivityLevel) => setFormData({ ...formData, activityLevel: value })}
              className="space-y-2"
            >
              {ACTIVITY_LEVELS.map((level) => (
                <div key={level} className="relative">
                  <RadioGroupItem value={level} id={level} className="peer sr-only" />
                  <Label
                    htmlFor={level}
                    className="flex items-center justify-center px-4 py-3 bg-white border-2 border-gray-200 rounded-lg cursor-pointer transition-all peer-checked:border-brand-myrtleGreen peer-checked:bg-brand-aquamarine/20 hover:bg-gray-50"
                  >
                    {level}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-brand-myrtleGreen">
              <BarChart className="w-5 h-5" />
              <Label className="text-xl font-semibold">Dietary Goals</Label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="calories">Daily Calorie Target</Label>
                <Input
                  id="calories"
                  type="number"
                  value={formData.calorieIntake}
                  onChange={(e) => setFormData({ ...formData, calorieIntake: parseInt(e.target.value) })}
                  className="border-2 focus:border-brand-myrtleGreen focus:ring-brand-aquamarine"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meals">Meals per Day</Label>
                <Input
                  id="meals"
                  type="number"
                  value={formData.mealsPerDay}
                  onChange={(e) => setFormData({ ...formData, mealsPerDay: parseInt(e.target.value) })}
                  className="border-2 focus:border-brand-myrtleGreen focus:ring-brand-aquamarine"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-brand-myrtleGreen">
              <Coffee className="w-5 h-5" />
              <Label className="text-xl font-semibold">Kitchen Equipment</Label>
            </div>
            <Textarea
              value={formData.preferredCookingTools}
              onChange={(e) => setFormData({ ...formData, preferredCookingTools: e.target.value })}
              placeholder="e.g., air fryer, slow cooker, blender"
              className="min-h-[100px] border-2 focus:border-brand-myrtleGreen focus:ring-brand-aquamarine"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-brand-myrtleGreen hover:bg-brand-myrtleGreen/90 h-12 text-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Save Changes'
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default PreferencesForm;