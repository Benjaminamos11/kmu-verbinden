import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("[AdminAuth] Initial session check:", session);
      if (session) {
        handleAuthChange('SIGNED_IN', session);
      }
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAuthChange = async (event: string, session: any) => {
    console.log("[AdminAuth] Auth state changed:", event);
    console.log("[AdminAuth] Session data:", session);
    
    if (event === 'SIGNED_IN' && session) {
      try {
        console.log("[AdminAuth] Checking profile for user:", session.user.id);
        
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error("[AdminAuth] Profile query error:", error);
          throw error;
        }

        console.log("[AdminAuth] Profile data:", profile);

        if (profile?.is_admin) {
          console.log("[AdminAuth] User is admin, redirecting to admin dashboard");
          navigate('/admin');
        } else {
          console.log("[AdminAuth] User is not admin, showing error");
          toast({
            title: "Zugriff verweigert",
            description: "Sie haben keine Administratorrechte.",
            variant: "destructive",
          });
          await supabase.auth.signOut();
        }
      } catch (error: any) {
        console.error("[AdminAuth] Error in auth change handler:", error);
        toast({
          title: "Fehler",
          description: "Es gab ein Problem beim Überprüfen Ihres Profils. Bitte versuchen Sie es erneut.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-xl border border-gray-100">
      <div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-swiss-darkblue">
          Admin Anmeldung
        </h2>
        <p className="mt-3 text-center text-sm text-gray-600">
          Bitte melden Sie sich mit Ihren Admin-Zugangsdaten an
        </p>
      </div>
      <Auth
        supabaseClient={supabase}
        view="sign_in"
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#DC2626',
                brandAccent: '#B91C1C',
                brandButtonText: 'white',
              },
              borderWidths: {
                buttonBorderWidth: '1px',
                inputBorderWidth: '1px',
              },
              radii: {
                borderRadiusButton: '0.5rem',
                buttonBorderRadius: '0.5rem',
                inputBorderRadius: '0.5rem',
              },
            },
          },
          className: {
            container: 'w-full',
            button: 'w-full px-4 py-2.5 rounded-lg font-medium transition-colors duration-200',
            input: 'w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-swiss-red focus:border-transparent transition-shadow duration-200',
            label: 'block text-sm font-medium text-gray-700 mb-2',
            anchor: 'text-swiss-red hover:text-swiss-darkblue transition-colors duration-200',
          },
        }}
        theme="light"
        providers={[]}
        redirectTo={window.location.origin + '/admin-auth'}
        localization={{
          variables: {
            sign_in: {
              email_label: "E-Mail Adresse",
              password_label: "Passwort",
              button_label: "Anmelden",
              loading_button_label: "Anmeldung...",
            },
            forgotten_password: {
              button_label: "Passwort zurücksetzen",
              loading_button_label: "Sende Anweisungen...",
              confirmation_text: "Überprüfen Sie Ihre E-Mail für den Reset-Link",
            },
          },
        }}
      />
    </div>
  );
};

export default AdminAuth;