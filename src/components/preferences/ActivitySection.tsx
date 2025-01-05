import { Activity, Bed, Bike, Dumbbell, PersonStanding, Footprints } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { motion } from 'framer-motion';
import { ActivityLevel } from '@/types/preferences';

interface ActivitySectionProps {
  value: ActivityLevel;
  onChange: (value: ActivityLevel) => void;
  activityLevels: ActivityLevel[];
}

const getActivityIcon = (level: ActivityLevel) => {
  switch (level) {
    case 'Sedentary':
      return <Bed className="w-6 h-6" />;
    case 'Lightly Active':
      return <PersonStanding className="w-6 h-6" />;
    case 'Moderately Active':
      return <Footprints className="w-6 h-6" />;
    case 'Very Active':
      return <Bike className="w-6 h-6" />;
    case 'Extremely Active':
      return <Dumbbell className="w-6 h-6" />;
    default:
      return <Activity className="w-6 h-6" />;
  }
};

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
      <div className="space-y-3">
        {activityLevels.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={`flex items-center w-full p-4 space-x-3 rounded-lg border-2 transition-all duration-200 ${
              value === level 
                ? 'border-brand-myrtleGreen bg-brand-aquamarine/20 shadow-md' 
                : 'border-gray-200 hover:border-brand-myrtleGreen/50 hover:bg-gray-50'
            }`}
          >
            <div className={`text-brand-myrtleGreen ${value === level ? 'scale-110' : ''} transition-transform duration-200`}>
              {getActivityIcon(level)}
            </div>
            <span className="font-medium">{level}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default ActivitySection;