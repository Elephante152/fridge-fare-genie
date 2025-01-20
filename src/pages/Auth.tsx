import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AuthError, AuthChangeEvent } from '@supabase/supabase-js';
import { Button } from "@/components/ui/button";

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'sign-in';
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [view, setView] = useState<'sign_in' | 'sign_up'>(
    mode === 'sign-up' ? 'sign_up' : 'sign_in'
  );

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          toast({
            title: "Welcome back!",
            description: "Taking you to your recipes...",
          });
          navigate("/recipe");
        }
      } catch (err) {
        console.error("Session check error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session) => {
        if (event === 'SIGNED_IN' && session) {
          toast({
            title: "Welcome to Recipe Generator",
            description: "Let's create something delicious!",
          });
          navigate("/recipe");
        }
        if (event === 'SIGNED_OUT') {
          setError(null);
          navigate('/');
        }
        if (event === 'USER_UPDATED') {
          toast({
            title: "Profile Updated",
            description: "Your account information has been updated successfully.",
          });
        }
        if (event === 'PASSWORD_RECOVERY') {
          toast({
            title: "Check your inbox",
            description: "We've sent you instructions to reset your password.",
          });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'invalid_credentials':
        return "The email or password you entered doesn't match our records. Please check your credentials or create a new account.";
      case 'email_not_confirmed':
        return "Please verify your email address to continue. Check your inbox for the confirmation link.";
      case 'user_not_found':
        return "We couldn't find an account with this email. Would you like to create one?";
      case 'too_many_requests':
        return "Too many attempts. Please wait a moment before trying again.";
      case 'invalid_grant':
        return "Please enter both your email and password to continue.";
      case 'AuthApiError: Invalid login credentials':
        return "The email or password you entered doesn't match our records. Please try again or create a new account.";
      default:
        return "Something went wrong. Please try again or contact support if the issue persists.";
    }
  };

  const handleAuthError = (error: AuthError) => {
    setError(error.message);
    toast({
      title: "Authentication Error",
      description: getErrorMessage(error.message),
      variant: "destructive",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-brand-myrtleGreen" />
          <span className="text-brand-jet">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 font-serif">
            {view === 'sign_up' ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {view === 'sign_up' 
              ? 'Sign up to start creating delicious recipes'
              : 'Sign in to continue creating recipes'}
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <Button
            variant={view === 'sign_in' ? 'default' : 'outline'}
            onClick={() => setView('sign_in')}
            className="w-full"
          >
            Sign In
          </Button>
          <Button
            variant={view === 'sign_up' ? 'default' : 'outline'}
            onClick={() => setView('sign_up')}
            className="w-full"
          >
            Sign Up
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{getErrorMessage(error)}</AlertDescription>
          </Alert>
        )}

        <div className="mt-8 bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-brand-aquamarine/20">
          <Auth
            supabaseClient={supabase}
            view={view}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#1B4B43',
                    brandAccent: '#2A9D8F',
                  },
                },
              },
              className: {
                button: 'bg-brand-myrtleGreen hover:bg-brand-myrtleGreen/90',
                input: 'rounded-md border-gray-300 focus:border-brand-myrtleGreen focus:ring-brand-myrtleGreen',
                label: 'text-gray-700',
              },
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/recipe`}
            localization={{
              variables: {
                sign_in: {
                  email_input_placeholder: "Enter your email",
                  password_input_placeholder: "Enter your password",
                  email_label: "Email",
                  password_label: "Password",
                  button_label: "Sign In",
                  loading_button_label: "Signing in...",
                },
                sign_up: {
                  email_input_placeholder: "Enter your email",
                  password_input_placeholder: "Create a password",
                  email_label: "Email",
                  password_label: "Password",
                  button_label: "Create Account",
                  loading_button_label: "Creating your account...",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;