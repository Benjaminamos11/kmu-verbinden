import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";

const AdminAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("[AdminAuth] Session error:", sessionError);
          return;
        }

        if (session?.user) {
          console.log("[AdminAuth] Session found, checking admin status");
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', session.user.id)
            .maybeSingle();

          if (profileError) {
            console.error("[AdminAuth] Profile query error:", profileError);
            throw profileError;
          }

          console.log("[AdminAuth] Profile data:", profile);

          if (profile?.is_admin) {
            console.log("[AdminAuth] Admin status confirmed, redirecting to dashboard");
            navigate('/admin');
          } else {
            console.log("[AdminAuth] User is not an admin");
            toast({
              title: "Zugriff verweigert",
              description: "Sie haben keine Administratorrechte.",
              variant: "destructive",
            });
            await supabase.auth.signOut();
          }
        }
      } catch (error) {
        console.error("[AdminAuth] Auth check error:", error);
        handleAuthError(error as AuthError);
      }
    };

    checkAuthStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[AdminAuth] Auth state changed:", event, "Session:", session?.user?.id);

      if (event === 'SIGNED_IN' && session) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', session.user.id)
            .maybeSingle();

          if (profileError) {
            console.error("[AdminAuth] Profile query error:", profileError);
            throw profileError;
          }

          console.log("[AdminAuth] Profile data after sign in:", profile);

          if (profile?.is_admin) {
            console.log("[AdminAuth] Admin access confirmed, redirecting");
            navigate('/admin');
          } else {
            console.log("[AdminAuth] User is not an admin, signing out");
            toast({
              title: "Zugriff verweigert",
              description: "Sie haben keine Administratorrechte.",
              variant: "destructive",
            });
            await supabase.auth.signOut();
          }
        } catch (error) {
          console.error("[AdminAuth] Error in auth change handler:", error);
          handleAuthError(error as AuthError);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleAuthError = (error: AuthError | Error) => {
    console.error("[AdminAuth] Auth error:", error);
    toast({
      title: "Fehler bei der Anmeldung",
      description: error.message,
      variant: "destructive",
    });
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
            },
          },
          className: {
            container: 'w-full',
            button: 'w-full px-4 py-2.5 rounded-lg font-medium',
            input: 'w-full px-4 py-2.5 rounded-lg border focus:ring-2',
            label: 'block text-sm font-medium text-gray-700 mb-2',
          },
        }}
        theme="light"
        providers={[]}
        redirectTo={window.location.origin + '/admin/auth'}
        showLinks={false}
        magicLink={false}
        localization={{
          variables: {
            sign_in: {
              email_label: "E-Mail",
              password_label: "Passwort",
              button_label: "Anmelden",
              email_input_placeholder: "Ihre E-Mail-Adresse",
              password_input_placeholder: "Ihr Passwort",
            },
          },
        }}
      />
    </div>
  );
};

export default AdminAuth;