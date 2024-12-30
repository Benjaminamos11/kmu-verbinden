import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log("Current session:", session);
      
      if (error) {
        console.error("Session check error:", error);
        toast({
          title: "Fehler",
          description: "Es gab einen Fehler beim Überprüfen Ihrer Sitzung.",
          variant: "destructive",
        });
        return;
      }

      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();

        console.log("Profile data:", profile);
        
        if (profile?.is_admin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();

        if (profile?.is_admin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Anmelden
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Melden Sie sich an, um fortzufahren
            </p>
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#DC2626',
                    brandAccent: '#B91C1C',
                  },
                },
              },
              className: {
                container: 'w-full',
                button: 'w-full',
                input: 'w-full px-3 py-2 border border-gray-300 rounded-md',
                label: 'block text-sm font-medium text-gray-700 mb-1',
              },
            }}
            theme="light"
            providers={[]}
            redirectTo={window.location.origin + '/auth'}
            localization={{
              variables: {
                sign_up: {
                  email_label: "E-Mail Adresse",
                  password_label: "Passwort",
                  button_label: "Registrieren",
                  loading_button_label: "Registrierung...",
                  social_provider_text: "Anmelden mit {{provider}}",
                  link_text: "Noch kein Konto? Registrieren",
                },
                sign_in: {
                  email_label: "E-Mail Adresse",
                  password_label: "Passwort",
                  button_label: "Anmelden",
                  loading_button_label: "Anmeldung...",
                  social_provider_text: "Anmelden mit {{provider}}",
                  link_text: "Bereits ein Konto? Anmelden",
                },
              },
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;