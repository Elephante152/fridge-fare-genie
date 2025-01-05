import { Utensils } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from 'framer-motion';
import { DietType } from '@/types/preferences';

interface DietTypeSectionProps {
  value: DietType;
  onChange: (value: DietType) => void;
  dietTypes: DietType[];
}

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
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-2 gap-4"
      >
        {dietTypes.map((diet) => (
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
    </motion.div>
  );
};

export default DietTypeSection;