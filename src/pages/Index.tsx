import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import MainForm from '@/components/MainForm';
import OnboardingForm from '@/components/OnboardingForm';
import EmojiBackground from '@/components/EmojiBackground';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      setShowOnboarding(!profile.onboarding_completed);
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-myrtleGreen"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      <EmojiBackground />
      
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="py-4 sm:py-6 md:py-8">
          <Header />
        </div>
        
        <div className="pb-8 sm:pb-12 md:pb-16">
          {showOnboarding ? (
            <OnboardingForm onComplete={() => setShowOnboarding(false)} />
          ) : (
            <MainForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;