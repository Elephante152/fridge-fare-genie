import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import Header from "@/components/Header";
import PreferencesForm from "@/components/PreferencesForm";
import { Loader2 } from "lucide-react";
import EmojiBackground from "@/components/EmojiBackground";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error fetching profile",
        description: "There was a problem loading your preferences.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-myrtleGreen" />
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
          {profile && <PreferencesForm initialData={profile} onComplete={fetchProfile} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;