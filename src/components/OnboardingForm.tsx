import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Utensils, AlertTriangle, Globe, Activity, BarChart, Coffee, Wand2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface OnboardingFormProps {
  onComplete: () => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    dietType: 'Omnivore',
    allergies: '',
    favoriteCuisines: '',
    activityLevel: 'Moderately Active',
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

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      updateProfile();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Utensils className="w-5 h-5 text-brand-myrtleGreen" />
              <h2 className="text-xl font-semibold">Dietary Preferences</h2>
            </div>
            <RadioGroup
              value={formData.dietType}
              onValueChange={(value) => setFormData({ ...formData, dietType: value })}
              className="grid grid-cols-2 gap-4"
            >
              {['Omnivore', 'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo'].map((diet) => (
                <div key={diet} className="flex items-center space-x-2">
                  <RadioGroupItem value={diet} id={diet} />
                  <Label htmlFor={diet}>{diet}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-brand-myrtleGreen" />
              <h2 className="text-xl font-semibold">Allergies & Restrictions</h2>
            </div>
            <div className="space-y-2">
              <Label htmlFor="allergies">List any allergies (comma-separated)</Label>
              <Textarea
                id="allergies"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                placeholder="e.g., peanuts, shellfish, dairy"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-brand-myrtleGreen" />
              <h2 className="text-xl font-semibold">Cuisine Preferences</h2>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuisines">Favorite cuisines (comma-separated)</Label>
              <Textarea
                id="cuisines"
                value={formData.favoriteCuisines}
                onChange={(e) => setFormData({ ...formData, favoriteCuisines: e.target.value })}
                placeholder="e.g., Italian, Japanese, Mexican"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-brand-myrtleGreen" />
              <h2 className="text-xl font-semibold">Activity Level</h2>
            </div>
            <RadioGroup
              value={formData.activityLevel}
              onValueChange={(value) => setFormData({ ...formData, activityLevel: value })}
              className="space-y-2"
            >
              {['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extremely Active'].map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <RadioGroupItem value={level} id={level} />
                  <Label htmlFor={level}>{level}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BarChart className="w-5 h-5 text-brand-myrtleGreen" />
              <h2 className="text-xl font-semibold">Dietary Goals</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="calories">Daily Calorie Target</Label>
                <Input
                  id="calories"
                  type="number"
                  value={formData.calorieIntake}
                  onChange={(e) => setFormData({ ...formData, calorieIntake: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meals">Meals per Day</Label>
                <Input
                  id="meals"
                  type="number"
                  value={formData.mealsPerDay}
                  onChange={(e) => setFormData({ ...formData, mealsPerDay: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Coffee className="w-5 h-5 text-brand-myrtleGreen" />
              <h2 className="text-xl font-semibold">Kitchen Equipment</h2>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tools">Available cooking tools (comma-separated)</Label>
              <Textarea
                id="tools"
                value={formData.preferredCookingTools}
                onChange={(e) => setFormData({ ...formData, preferredCookingTools: e.target.value })}
                placeholder="e.g., air fryer, slow cooker, blender"
              />
            </div>
          </div>
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
        <h1 className="text-2xl font-bold text-brand-myrtleGreen">Personalize Your Experience</h1>
        <p className="text-gray-600">Step {step} of 6</p>
      </div>

      <div className="h-[300px]">
        {renderStep()}
      </div>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="bg-brand-myrtleGreen hover:bg-brand-myrtleGreen/90"
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
    </motion.div>
  );
};

export default OnboardingForm;