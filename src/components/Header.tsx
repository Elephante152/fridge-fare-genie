import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.div 
      className="space-y-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-brand-jet">
        Recipe Genie
      </h1>
      <p className="text-brand-jet/80 text-lg md:text-xl max-w-2xl mx-auto font-light">
        Transform your ingredients into culinary masterpieces with AI-powered recipe suggestions
      </p>
    </motion.div>
  );
};

export default Header;