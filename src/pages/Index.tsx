import React from 'react';
import Header from '@/components/Header';
import MainForm from '@/components/MainForm';
import EmojiBackground from '@/components/EmojiBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <EmojiBackground />
      
      <div className="container max-w-4xl px-4 md:px-6 relative z-10">
        <div className="py-8 md:py-12 mb-8">
          <Header />
        </div>
        
        <div className="pb-16">
          <MainForm />
        </div>
      </div>
    </div>
  );
};

export default Index;