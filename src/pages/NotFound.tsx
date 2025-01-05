import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/auth");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <h1 className="text-4xl font-serif text-brand-myrtleGreen mb-4">404</h1>
      <p className="text-lg text-brand-jet/70 text-center mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <p className="text-sm text-brand-jet/50 mb-4">
        Redirecting you to the login page...
      </p>
      <Loader2 className="h-6 w-6 animate-spin text-brand-myrtleGreen" />
    </div>
  );
};

export default NotFound;