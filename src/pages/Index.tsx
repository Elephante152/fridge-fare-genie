import React from 'react';
import Header from '@/components/Header';
import MainForm from '@/components/MainForm';
import EmojiBackground from '@/components/EmojiBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      <EmojiBackground />
      
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="py-4 sm:py-6 md:py-8">
          <Header />
        </div>
        
        <div className="pb-8 sm:pb-12 md:pb-16">
          <MainForm />
        </div>
      </div>
    </div>
  );
};

export default Index;