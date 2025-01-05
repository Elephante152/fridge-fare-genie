import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, BarChart, Coffee } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import DietTypeSection from './preferences/DietTypeSection';
import AllergiesSection from './preferences/AllergiesSection';
import CuisinesSection from './preferences/CuisinesSection';
import ActivitySection from './preferences/ActivitySection';
import AnimatedPlaceholder from './AnimatedPlaceholder';
import { DietType, ActivityLevel } from '@/types/preferences';

const DIET_TYPES: DietType[] = ['Omnivore', 'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo'];
const ACTIVITY_LEVELS: ActivityLevel[] = ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extremely Active'];

interface OnboardingFormProps {
  onComplete: () => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    dietType: 'Omnivore' as DietType,
    allergies: '',
    favoriteCuisines: '',
    activityLevel: 'Moderately Active' as ActivityLevel,
    calorieIntake: 2000,
    mealsPerDay: 3,
    preferredCookingTools: '',
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const updateProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .update({
          diet_type: formData.dietType,
          allergies: formData.allergies.split(',').map(item => item.trim()),
          favorite_cuisines: formData.favoriteCuisines.split(',').map(item => item.trim()),
          activity_level: formData.activityLevel,
          calorie_intake: formData.calorieIntake,
          meals_per_day: formData.mealsPerDay,
          preferred_cooking_tools: formData.preferredCookingTools.split(',').map(item => item.trim()),
          onboarding_completed: true
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Profile updated successfully!",
        description: "Your preferences have been saved.",
      });
      
      onComplete();
      navigate('/recipe');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: "There was a problem saving your preferences.",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <DietTypeSection
            value={formData.dietType}
            onChange={(value: DietType) => setFormData({ ...formData, dietType: value })}
            dietTypes={DIET_TYPES}
          />
        );
      case 2:
        return (
          <AllergiesSection
            value={formData.allergies}
            onChange={(value) => setFormData({ ...formData, allergies: value })}
          />
        );
      case 3:
        return (
          <CuisinesSection
            value={formData.favoriteCuisines}
            onChange={(value) => setFormData({ ...formData, favoriteCuisines: value })}
          />
        );
      case 4:
        return (
          <ActivitySection
            value={formData.activityLevel}
            onChange={(value: ActivityLevel) => setFormData({ ...formData, activityLevel: value })}
            activityLevels={ACTIVITY_LEVELS}
          />
        );
      case 5:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-brand-myrtleGreen">
                <BarChart className="w-5 h-5" />
                <Label className="text-xl font-semibold">Dietary Goals</Label>
              </div>
              <div className="space-y-4">
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
          </motion.div>
        );
      case 6:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 text-brand-myrtleGreen">
              <Coffee className="w-5 h-5" />
              <Label className="text-xl font-semibold">Kitchen Equipment</Label>
            </div>
            <div className="relative">
              <Textarea
                value={formData.preferredCookingTools}
                onChange={(e) => setFormData({ ...formData, preferredCookingTools: e.target.value })}
                className="min-h-[100px] border-2 focus:border-brand-myrtleGreen focus:ring-brand-aquamarine"
              />
              {!formData.preferredCookingTools && <AnimatedPlaceholder />}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-8"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-brand-myrtleGreen">Personalize Your Experience</h1>
        <p className="text-gray-600">Step {step} of 6</p>
      </div>

      <div className="min-h-[400px] flex flex-col justify-between">
        <div className="flex-1">
          {renderStep()}
        </div>

        <div className="flex justify-between pt-8">
          <Button
            variant="outline"
            onClick={() => step > 1 && setStep(step - 1)}
            disabled={step === 1}
            className="border-2 hover:bg-brand-aquamarine/20"
          >
            Back
          </Button>
          <Button
            onClick={() => step === 6 ? updateProfile() : setStep(step + 1)}
            className="bg-brand-myrtleGreen hover:bg-brand-myrtleGreen/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {step === 6 ? (
              <div className="flex items-center space-x-2">
                <span>Complete</span>
                <Wand2 className="w-4 h-4" />
              </div>
            ) : (
              'Next'
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default OnboardingForm;