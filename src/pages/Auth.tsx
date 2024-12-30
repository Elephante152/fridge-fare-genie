import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { AuthError } from "@supabase/supabase-js";

const AuthPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already authenticated
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          navigate("/");
        }
        if (event === "SIGNED_OUT") {
          setError(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 font-serif">
            Welcome to Recipe Generator
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to save and manage your favorite recipes
          </p>
        </div>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
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
            }}
            providers={[]}
            redirectTo={window.location.origin}
            onError={(error: AuthError) => {
              setError(error.message);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;