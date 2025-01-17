import { Activity } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from 'framer-motion';

interface ActivitySectionProps {
  value: string;
  onChange: (value: string) => void;
  activityLevels: string[];
}

const ActivitySection = ({ value, onChange, activityLevels }: ActivitySectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2 text-brand-myrtleGreen">
        <Activity className="w-5 h-5" />
        <Label className="text-xl font-semibold">Activity Level</Label>
      </div>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="space-y-2"
      >
        {activityLevels.map((level) => (
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
    </motion.div>
  );
};

export default ActivitySection;