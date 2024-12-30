import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const navigate = useNavigate();

  const SignUpFlow = () => {
    const [email, setEmail] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitted(true);
      setTimeout(() => {
        setIsDialogOpen(false);
        setIsSubmitted(false);
        setEmail('');
        navigate('/auth'); // Redirect to auth page after form submission
      }, 2000);
    };

    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <Button type="submit" disabled={isSubmitted}>
            {isSubmitted ? 'Submitting...' : 'Sign Up'}
          </Button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <h1>Welcome to Recipe Generator</h1>
      <SignUpFlow />
    </div>
  );
};

export default Landing;
