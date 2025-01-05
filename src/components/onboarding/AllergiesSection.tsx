import { AlertTriangle } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from 'framer-motion';

interface AllergiesSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const AllergiesSection = ({ value, onChange }: AllergiesSectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2 text-brand-myrtleGreen">
        <AlertTriangle className="w-5 h-5" />
        <Label className="text-xl font-semibold">Allergies</Label>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., peanuts, shellfish, dairy"
        className="min-h-[100px] border-2 focus:border-brand-myrtleGreen focus:ring-brand-aquamarine"
      />
    </motion.div>
  );
};

export default AllergiesSection;