import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Clock, Cookie, Shield, Utensils, Wand2 } from 'lucide-react';
import EmojiBackground from '@/components/EmojiBackground';

const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-white bg-opacity-50 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] text-center group">
      <div className="rounded-full w-12 md:w-16 h-12 md:h-16 bg-brand-aquamarine/20 flex items-center justify-center mb-4 md:mb-6 mx-auto group-hover:bg-brand-aquamarine/30 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-brand-myrtleGreen group-hover:text-brand-myrtleGreen/80 transition-colors">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm md:text-base">{description}</p>
    </div>
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
    <div className="min-h-screen bg-gradient-radial from-brand-platinum via-white to-brand-platinum relative overflow-hidden">
      <EmojiBackground />
      
      <header className="relative z-10 bg-white/95 backdrop-blur-md border-b border-brand-myrtleGreen/10 shadow-lg fixed w-full top-0">
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
          <nav className="flex justify-between items-center">
            <div className="relative">
              <div className="text-xl md:text-3xl font-bold relative z-10 bg-clip-text text-transparent animate-gradient-x bg-gradient-to-r from-brand-aquamarine via-brand-myrtleGreen to-brand-yellow bg-[length:200%_100%]">
                MealPrepGenie v3
              </div>
            </div>
            <div className="flex items-center space-x-3 md:space-x-6">
              <Button
                variant="ghost"
                onClick={() => navigate('/auth')}
                className="text-base md:text-lg hover:text-brand-myrtleGreen hover:bg-brand-aquamarine/20 transition-all duration-300 px-3 md:px-4"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate('/auth')}
                className="text-base md:text-lg bg-brand-myrtleGreen hover:bg-brand-myrtleGreen/90 text-white transition-all duration-300 animate-shimmer shadow-lg hover:shadow-xl hover:scale-105 px-3 md:px-4"
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <main className="relative z-10 pt-24 md:pt-32">
        <section className="relative py-16 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-4xl mx-auto animate-fade-in bg-white/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl">
              <h1 className="text-4xl md:text-7xl font-bold mb-6 md:mb-8 text-brand-myrtleGreen leading-tight">
                Your{' '}
                <span className="bg-gradient-to-r from-brand-myrtleGreen via-brand-yellow to-brand-aquamarine bg-clip-text text-transparent animate-shimmer block md:inline">
                  Personal AI Recipe Assistant
                </span>
              </h1>
              <p className="text-lg md:text-xl text-brand-jet/70 mb-8 md:mb-12 max-w-3xl mx-auto">
                Transform your cooking experience with personalized recipes based on the ingredients you have.
              </p>
              <Button
                onClick={() => navigate('/auth')}
                className="text-lg bg-brand-myrtleGreen hover:bg-brand-myrtleGreen/90 text-white px-8 py-6 h-auto transition-all duration-300 animate-shimmer shadow-xl hover:shadow-2xl hover:scale-105 w-full md:w-auto"
              >
                Start Cooking
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-32 bg-gradient-to-b from-white to-brand-platinum/30">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16">
              Why Choose{' '}
              <span className="text-brand-myrtleGreen bg-gradient-to-r from-brand-myrtleGreen to-brand-aquamarine bg-clip-text text-transparent animate-shimmer">
                Recipe Generator
              </span>
              ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
              <BenefitCard
                icon={<Sparkles className="w-6 h-6 md:w-8 md:h-8 text-brand-myrtleGreen" />}
                title="AI-Powered Suggestions"
                description="Get personalized recipe suggestions based on your available ingredients."
              />
              <BenefitCard
                icon={<Clock className="w-6 h-6 md:w-8 md:h-8 text-brand-myrtleGreen" />}
                title="Save Time"
                description="No more wondering what to cook - get instant recipe ideas."
              />
              <BenefitCard
                icon={<Cookie className="w-6 h-6 md:w-8 md:h-8 text-brand-myrtleGreen" />}
                title="Diverse Recipes"
                description="Access a variety of recipes from different cuisines."
              />
              <BenefitCard
                icon={<Shield className="w-6 h-6 md:w-8 md:h-8 text-brand-myrtleGreen" />}
                title="Smart Filtering"
                description="Find recipes that match your dietary preferences and restrictions."
              />
              <BenefitCard
                icon={<Utensils className="w-6 h-6 md:w-8 md:h-8 text-brand-myrtleGreen" />}
                title="Easy to Follow"
                description="Clear instructions and ingredient lists for every recipe."
              />
              <BenefitCard
                icon={<Wand2 className="w-6 h-6 md:w-8 md:h-8 text-brand-myrtleGreen" />}
                title="Customization"
                description="Adjust recipes to your liking with simple modifications."
              />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-32 bg-brand-aquamarine/10">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8">
              Ready to Transform Your{' '}
              <span className="text-brand-myrtleGreen bg-gradient-to-r from-brand-myrtleGreen to-brand-aquamarine bg-clip-text text-transparent animate-shimmer">
                Cooking Experience
              </span>
              ?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto">
              Join now and start generating personalized recipes based on your ingredients.
            </p>
            <Button
              onClick={() => navigate('/auth')}
              className="text-lg bg-brand-myrtleGreen hover:bg-brand-myrtleGreen/90 text-white px-8 py-6 h-auto transition-all duration-300 animate-shimmer shadow-xl hover:shadow-2xl hover:scale-105 w-full md:w-auto"
            >
              Get Started Now
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-8 md:py-12 relative z-10">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Recipe Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
