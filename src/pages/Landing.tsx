import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, ChevronRight, Cookie, Clock, Sparkles, Utensils } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AnimatedGradientText = ({ text, className = '' }: { text: string, className?: string }) => {
  return (
    <motion.span
      className={`bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundImage: [
          'linear-gradient(to right, #85FFC7, #297373, #E3B448)',
          'linear-gradient(to right, #E3B448, #85FFC7, #297373)',
          'linear-gradient(to right, #297373, #E3B448, #85FFC7)',
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      {text}
    </motion.span>
  );
};

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const BenefitCard = ({ icon, title, description, delay = 0 }: BenefitCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white bg-opacity-50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="rounded-full w-12 h-12 bg-brand-aquamarine/20 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  delay?: number;
}

const StepCard = ({ number, title, description, delay = 0 }: StepCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-start space-x-4"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-myrtleGreen text-white flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const SignUpFlow = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsDialogOpen(false);
      setIsSubmitted(false);
      navigate('/auth');
    }, 1000);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 text-white hover:bg-emerald-600">
          Get Started <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogDescription>
            Create an account to get started with FridgeFareGenie.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">
              {isSubmitted ? 'Submitting...' : 'Sign Up'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="relative z-10 bg-white bg-opacity-90 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <AnimatedGradientText text="FridgeFareGenie" className="text-2xl font-bold" />
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/auth" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <SignUpFlow />
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Your Personal
                <AnimatedGradientText text=" AI Recipe " className="inline-block" />
                Assistant
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Transform your leftover ingredients into delicious meals with AI-powered recipe recommendations.
              </p>
              <div className="flex justify-center space-x-4">
                <SignUpFlow />
                <Button 
                  variant="outline"
                  onClick={() => navigate('/auth')}
                >
                  Try Demo <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose <AnimatedGradientText text="FridgeFareGenie" />?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BenefitCard
                icon={<Sparkles className="w-6 h-6 text-brand-myrtleGreen" />}
                title="AI-Powered Suggestions"
                description="Get personalized recipe suggestions based on the ingredients you have."
                delay={0.1}
              />
              <BenefitCard
                icon={<Clock className="w-6 h-6 text-brand-myrtleGreen" />}
                title="Save Time & Money"
                description="Reduce food waste and save time deciding what to cook."
                delay={0.2}
              />
              <BenefitCard
                icon={<Cookie className="w-6 h-6 text-brand-myrtleGreen" />}
                title="Diverse Recipes"
                description="Access a vast collection of recipes from various cuisines."
                delay={0.3}
              />
              <BenefitCard
                icon={<Utensils className="w-6 h-6 text-brand-myrtleGreen" />}
                title="Smart Recipe Generation"
                description="Generate recipes that match your available ingredients perfectly."
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              How <AnimatedGradientText text="FridgeFareGenie" /> Works
            </h2>
            <div className="max-w-2xl mx-auto space-y-8">
              <StepCard
                number={1}
                title="Upload Your Ingredients"
                description="Take a photo of your ingredients or enter them manually."
                delay={0.1}
              />
              <StepCard
                number={2}
                title="Get Recipe Suggestions"
                description="Receive AI-generated recipes tailored to your ingredients."
                delay={0.2}
              />
              <StepCard
                number={3}
                title="Cook & Enjoy"
                description="Follow the easy cooking instructions and enjoy your meal."
                delay={0.3}
              />
              <StepCard
                number={4}
                title="Save Your Favorites"
                description="Save and organize your favorite recipes for future use."
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-emerald-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your
              <AnimatedGradientText text=" Cooking Experience" className="inline-block" />?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join now and start turning your ingredients into delicious meals.
            </p>
            <SignUpFlow />
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center space-x-2">
                <AnimatedGradientText text="FridgeFareGenie" className="text-xl font-bold" />
              </Link>
              <p className="text-gray-600 mt-4">
                Your personal AI recipe assistant.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/auth" className="text-gray-600 hover:text-gray-900">Features</Link></li>
                <li><Link to="/auth" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
                <li><Link to="/auth" className="text-gray-600 hover:text-gray-900">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/auth" className="text-gray-600 hover:text-gray-900">About</Link></li>
                <li><Link to="/auth" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                <li><Link to="/auth" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/auth" className="text-gray-600 hover:text-gray-900">Privacy</Link></li>
                <li><Link to="/auth" className="text-gray-600 hover:text-gray-900">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} FridgeFareGenie. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
