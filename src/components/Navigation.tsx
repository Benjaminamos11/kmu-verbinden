import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { NavigationMenuDemo } from './NavigationMenu';
import { NavigationMobileMenu } from './NavigationMobileMenu';
import { NavigationLogo } from './NavigationLogo';
import { NavigationAuthItems } from './NavigationAuthItems';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get the initial session
        const { data: { session } } = await supabase.auth.getSession();
        console.log("[Navigation] Initial session check:", session);
        
        if (session?.user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', session.user.id)
            .single();
          
          if (error) {
            console.error("[Navigation] Error fetching profile:", error);
            return;
          }
          
          setIsAdmin(!!profile?.is_admin);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("[Navigation] Error during auth initialization:", error);
      }
    };

    initializeAuth();

    // Set up the auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[Navigation] Auth state changed:", event);
      console.log("[Navigation] Session data:", session);
      
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', session.user.id)
            .single();
          
          if (error) {
            console.error("[Navigation] Error fetching profile:", error);
            return;
          }
          
          setIsAdmin(!!profile?.is_admin);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("[Navigation] Error handling auth change:", error);
        }
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Erfolgreich abgemeldet",
        description: "Auf Wiedersehen!",
      });
      navigate('/');
    } catch (error: any) {
      console.error("[Navigation] Logout error:", error);
      toast({
        title: "Fehler beim Abmelden",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <NavigationLogo />
          <NavigationMenuDemo isLoggedIn={isLoggedIn} isAdmin={isAdmin} handleLogout={handleLogout} />
          <div className="hidden md:flex items-center space-x-4">
            <NavigationAuthItems 
              isLoggedIn={isLoggedIn} 
              isAdmin={isAdmin} 
              handleLogout={handleLogout} 
            />
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-swiss-darkblue hover:text-swiss-red transition-colors duration-300 p-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <NavigationMobileMenu
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          handleLogout={handleLogout}
          onClose={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navigation;