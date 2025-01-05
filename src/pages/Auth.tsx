import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AuthError, AuthChangeEvent } from '@supabase/supabase-js';

const AuthPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          toast({
            title: "Already in the kitchen! 🔥",
            description: "Redirecting you to your recipe workspace...",
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
            title: "Welcome to the kitchen! 🚀",
            description: "Time to create some culinary magic.",
          });
          navigate("/recipe");
        }
        if (event === 'SIGNED_OUT') {
          setError(null);
          navigate('/');
        }
        if (event === 'USER_UPDATED') {
          toast({
            title: "Profile fresh out the oven! ✨",
            description: "Your account has been updated with that special sauce.",
          });
        }
        if (event === 'PASSWORD_RECOVERY') {
          toast({
            title: "Check your inbox! 📬",
            description: "We've sent you the secret ingredient to reset your password.",
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
        return "Yo, those credentials aren't hitting right! Double-check and try again.";
      case 'email_not_confirmed':
        return "Hold up! You need to verify your email first. Check your inbox for the golden ticket.";
      case 'user_not_found':
        return "No account in the kitchen with that email. Time to sign up and join the crew!";
      case 'too_many_requests':
        return "Slow down, chef! Too many attempts. Take a breather and try again in a bit.";
      case 'invalid_grant':
        return "Hey! You're trying to cook without ingredients. Fill in both email and password!";
      default:
        return "Something's not simmering right. Let's try that again!";
    }
  };

  const handleAuthError = (error: AuthError) => {
    setError(error.message);
    toast({
      title: "Whoops! Kitchen mishap! 🔧",
      description: getErrorMessage(error.message),
      variant: "destructive",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-brand-myrtleGreen" />
          <span className="text-brand-jet">Preheating the oven...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 font-serif">
            Welcome to Recipe Generator
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to start cooking up some digital deliciousness
          </p>
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
                  email_input_placeholder: "Drop your email here",
                  password_input_placeholder: "Your secret recipe (password)",
                  email_label: "Email",
                  password_label: "Password",
                  button_label: "Let's Cook! 🔥",
                  loading_button_label: "Heating up...",
                },
                sign_up: {
                  email_input_placeholder: "Your email address",
                  password_input_placeholder: "Create a strong password",
                  email_label: "Email",
                  password_label: "Password",
                  button_label: "Join the Kitchen! 👩‍🍳",
                  loading_button_label: "Setting up your kitchen...",
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