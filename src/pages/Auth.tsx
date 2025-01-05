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
            title: "Yo, you're already in the kitchen! 🔥",
            description: "Taking you to where the magic happens...",
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
            title: "Now we're cooking! 🚀",
            description: "Time to disrupt some recipes, chef!",
          });
          navigate("/recipe");
        }
        if (event === 'SIGNED_OUT') {
          setError(null);
          navigate('/');
        }
        if (event === 'USER_UPDATED') {
          toast({
            title: "Profile upgraded! ✨",
            description: "Your kitchen just got a Michelin star upgrade!",
          });
        }
        if (event === 'PASSWORD_RECOVERY') {
          toast({
            title: "Check your inbox! 📬",
            description: "We've sent you the secret sauce to reset your password.",
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
        return "Yo fam, this recipe ain't clicking! Either your email's not in our kitchen or the password's not your signature dish. Need to sign up first?";
      case 'email_not_confirmed':
        return "Hold up chef! You gotta verify that email first - check your inbox for the golden ticket! 🎫";
      case 'user_not_found':
        return "Looks like you're not in our chef's roster yet! Time to sign up and join the culinary revolution! 🚀";
      case 'too_many_requests':
        return "Slow down, master chef! Too many attempts. Take a breather, like letting the dough rest. Try again in a bit. 🕒";
      case 'invalid_grant':
        return "Yo! You can't cook without ingredients! Drop your email AND password in there! 📝";
      case 'AuthApiError: Invalid login credentials':
        return "This kitchen doesn't recognize these credentials! Either sign up first or double-check your secret recipe (password)! 🔑";
      default:
        return "Something's not simmering right in the kitchen. Let's try that again! 🔧";
    }
  };

  const handleAuthError = (error: AuthError) => {
    setError(error.message);
    toast({
      title: "Kitchen Mishap! 🔧",
      description: getErrorMessage(error.message),
      variant: "destructive",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-brand-myrtleGreen" />
          <span className="text-brand-jet">Preheating the kitchen...</span>
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
            Sign in to start disrupting the culinary game 🔥
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
                  email_input_placeholder: "Drop your chef's email here",
                  password_input_placeholder: "Your signature secret sauce (password)",
                  email_label: "Email",
                  password_label: "Password",
                  button_label: "Let's Disrupt Some Recipes! 🔥",
                  loading_button_label: "Firing up the kitchen...",
                },
                sign_up: {
                  email_input_placeholder: "Your future chef's email",
                  password_input_placeholder: "Create your secret recipe (password)",
                  email_label: "Email",
                  password_label: "Password",
                  button_label: "Join the Culinary Revolution! 👨‍🍳",
                  loading_button_label: "Setting up your innovative kitchen...",
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