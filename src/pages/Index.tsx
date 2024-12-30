import React from 'react';
import Header from '@/components/Header';
import MainForm from '@/components/MainForm';
import EmojiBackground from '@/components/EmojiBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <EmojiBackground />
      
      <div className="container max-w-4xl py-16 px-4 md:px-6 space-y-12 relative z-10">
        <Header />
        <MainForm />
      </div>
    </div>
  );
};

export default Index;