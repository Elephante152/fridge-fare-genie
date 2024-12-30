import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from "@/integrations/supabase/client";
import { motion } from 'framer-motion';
import { Sparkles, Clock, Cookie, Shield, Utensils, Wand2 } from 'lucide-react';

const GenieAnimation = () => {
  return (
    <div className="relative w-24 h-24 mx-auto mb-8">
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-turmericOrange via-brand-naplesYellow to-brand-mustardYellow"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 800,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute inset-2 rounded-full bg-white flex items-center justify-center"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 800,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Wand2 className="w-8 h-8 text-brand-turmericOrange" />
      </motion.div>
    </div>
  );
};

const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 80 }}
      className="bg-white bg-opacity-50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
    >
      <div className="rounded-full w-12 h-12 bg-brand-beige/20 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-brand-turmericOrange">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate('/recipe');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-beige/20 to-white">
      <header className="relative z-10 bg-white bg-opacity-90 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-brand-turmericOrange to-brand-mustardYellow bg-clip-text text-transparent animate-shimmer">
              MealPrepGenie v3
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/auth')}
                className="hover:text-brand-turmericOrange hover:bg-brand-beige/20 transition-all duration-500"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-brand-turmericOrange to-brand-mustardYellow hover:opacity-90 transition-all duration-500 text-white animate-shimmer"
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <GenieAnimation />
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Your Personal{' '}
                <span className="bg-gradient-to-r from-brand-turmericOrange to-brand-mustardYellow bg-clip-text text-transparent animate-shimmer">
                  AI Recipe Assistant
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
                Transform your cooking experience with personalized recipes based on the ingredients you have.
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-brand-turmericOrange to-brand-mustardYellow hover:opacity-90 transition-all duration-500 text-white animate-shimmer"
                >
                  Start Cooking
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-beige/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-brand-turmericOrange to-brand-mustardYellow bg-clip-text text-transparent animate-shimmer">
                MealPrepGenie v3
              </span>
              ?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BenefitCard
                icon={<Sparkles className="w-6 h-6 text-brand-turmericOrange" />}
                title="AI-Powered Suggestions"
                description="Get personalized recipe suggestions based on your available ingredients."
              />
              <BenefitCard
                icon={<Clock className="w-6 h-6 text-brand-turmericOrange" />}
                title="Save Time"
                description="No more wondering what to cook - get instant recipe ideas."
              />
              <BenefitCard
                icon={<Cookie className="w-6 h-6 text-brand-turmericOrange" />}
                title="Diverse Recipes"
                description="Access a variety of recipes from different cuisines."
              />
              <BenefitCard
                icon={<Shield className="w-6 h-6 text-brand-turmericOrange" />}
                title="Smart Filtering"
                description="Find recipes that match your dietary preferences and restrictions."
              />
              <BenefitCard
                icon={<Utensils className="w-6 h-6 text-brand-turmericOrange" />}
                title="Easy to Follow"
                description="Clear instructions and ingredient lists for every recipe."
              />
              <BenefitCard
                icon={<Wand2 className="w-6 h-6 text-brand-turmericOrange" />}
                title="Customization"
                description="Adjust recipes to your liking with simple modifications."
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-beige/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your{' '}
              <span className="bg-gradient-to-r from-brand-turmericOrange to-brand-mustardYellow bg-clip-text text-transparent animate-shimmer">
                Cooking Experience
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join now and start generating personalized recipes based on your ingredients.
            </p>
            <Button
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-brand-turmericOrange to-brand-mustardYellow hover:opacity-90 transition-all duration-500 text-white animate-shimmer"
            >
              Get Started Now
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} MealPrepGenie v3. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;