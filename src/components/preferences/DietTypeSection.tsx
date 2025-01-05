import { Utensils, Salad, Fish, Beef, Leaf, Apple } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { motion } from 'framer-motion';
import { DietType } from '@/types/preferences';

interface DietTypeSectionProps {
  value: DietType;
  onChange: (value: DietType) => void;
  dietTypes: DietType[];
}

const getDietIcon = (diet: DietType) => {
  switch (diet) {
    case 'Vegan':
      return <Leaf className="w-6 h-6" />;
    case 'Vegetarian':
      return <Salad className="w-6 h-6" />;
    case 'Pescatarian':
      return <Fish className="w-6 h-6" />;
    case 'Omnivore':
      return <Beef className="w-6 h-6" />;
    case 'Keto':
    case 'Paleo':
      return <Apple className="w-6 h-6" />;
    default:
      return <Utensils className="w-6 h-6" />;
  }
};

const DietTypeSection = ({ value, onChange, dietTypes }: DietTypeSectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2 text-brand-myrtleGreen">
        <Utensils className="w-5 h-5" />
        <Label className="text-xl font-semibold">Diet Type</Label>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {dietTypes.map((diet) => (
          <button
            key={diet}
            type="button"
            onClick={() => onChange(diet)}
            className={`flex flex-col items-center justify-center p-4 space-y-2 rounded-lg border-2 transition-all duration-200 ${
              value === diet 
                ? 'border-brand-myrtleGreen bg-brand-aquamarine/20 shadow-md' 
                : 'border-gray-200 hover:border-brand-myrtleGreen/50 hover:bg-gray-50'
            }`}
          >
            <div className={`text-brand-myrtleGreen ${value === diet ? 'scale-110' : ''} transition-transform duration-200`}>
              {getDietIcon(diet)}
            </div>
            <span className="font-medium text-sm text-center">{diet}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default DietTypeSection;