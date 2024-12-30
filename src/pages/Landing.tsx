import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Clock, Cookie, Shield, Utensils, Wand2 } from 'lucide-react';

const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-white bg-opacity-50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="rounded-full w-12 h-12 bg-brand-aquamarine/20 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-brand-myrtleGreen">{title}</h3>
      <p className="text-gray-600">{description}</p>
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="relative z-10 bg-white bg-opacity-90 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold text-brand-myrtleGreen hover:text-brand-myrtleGreen/80 transition-colors duration-300">
              Recipe Generator
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/auth')}
                className="hover:text-brand-myrtleGreen hover:bg-brand-aquamarine/20 transition-all duration-300"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate('/auth')}
                className="bg-brand-myrtleGreen hover:bg-brand-myrtleGreen/90 transition-all duration-300 animate-shimmer"
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
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Your Personal{' '}
                <span className="text-brand-myrtleGreen bg-gradient-to-r from-brand-myrtleGreen to-brand-aquamarine bg-clip-text text-transparent animate-shimmer">
                  AI Recipe Assistant
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
                Transform your cooking experience with personalized recipes based on the ingredients you have.
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => navigate('/auth')}
                  className="bg-brand-myrtleGreen hover:bg-brand-myrtleGreen/90 transition-all duration-300 animate-shimmer"
                >
                  Start Cooking
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose{' '}
              <span className="text-brand-myrtleGreen bg-gradient-to-r from-brand-myrtleGreen to-brand-aquamarine bg-clip-text text-transparent animate-shimmer">
                Recipe Generator
              </span>
              ?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BenefitCard
                icon={<Sparkles className="w-6 h-6 text-brand-myrtleGreen" />}
                title="AI-Powered Suggestions"
                description="Get personalized recipe suggestions based on your available ingredients."
              />
              <BenefitCard
                icon={<Clock className="w-6 h-6 text-brand-myrtleGreen" />}
                title="Save Time"
                description="No more wondering what to cook - get instant recipe ideas."
              />
              <BenefitCard
                icon={<Cookie className="w-6 h-6 text-brand-myrtleGreen" />}
                title="Diverse Recipes"
                description="Access a variety of recipes from different cuisines."
              />
              <BenefitCard
                icon={<Shield className="w-6 h-6 text-brand-myrtleGreen" />}
                title="Smart Filtering"
                description="Find recipes that match your dietary preferences and restrictions."
              />
              <BenefitCard
                icon={<Utensils className="w-6 h-6 text-brand-myrtleGreen" />}
                title="Easy to Follow"
                description="Clear instructions and ingredient lists for every recipe."
              />
              <BenefitCard
                icon={<Wand2 className="w-6 h-6 text-brand-myrtleGreen" />}
                title="Customization"
                description="Adjust recipes to your liking with simple modifications."
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-aquamarine/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your{' '}
              <span className="text-brand-myrtleGreen bg-gradient-to-r from-brand-myrtleGreen to-brand-aquamarine bg-clip-text text-transparent animate-shimmer">
                Cooking Experience
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join now and start generating personalized recipes based on your ingredients.
            </p>
            <Button
              onClick={() => navigate('/auth')}
              className="bg-brand-myrtleGreen hover:bg-brand-myrtleGreen/90 transition-all duration-300 animate-shimmer"
            >
              Get Started Now
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Recipe Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;