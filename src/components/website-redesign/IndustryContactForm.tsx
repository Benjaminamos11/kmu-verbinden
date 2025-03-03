
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send, ArrowRight, ArrowLeft, Check, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface IndustryContactFormProps {
  industry: string;
  industrySlug: string;
}

export const IndustryContactForm = ({
  industry,
  industrySlug
}: IndustryContactFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [recentBookings, setRecentBookings] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    message: '',
    address: '',
    privacyAccepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Generate a random number between 4 and 9 for bookings
    const updateBookings = () => {
      setRecentBookings(Math.floor(Math.random() * 6) + 4);
    };
    
    // Initial call
    updateBookings();
    
    // Update every hour
    const interval = setInterval(updateBookings, 3600000);
    
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const nextStep = () => {
    if (currentStep === 1 && !formData.companyName) {
      toast({
        title: "Bitte geben Sie Ihren Praxisnamen ein",
        description: "Dieser Wert ist erforderlich, um fortzufahren.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 2 && !formData.contactPerson) {
      toast({
        title: "Bitte geben Sie Ihren Namen ein",
        description: "Dieser Wert ist erforderlich, um fortzufahren.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 2 && !formData.email) {
      toast({
        title: "Bitte geben Sie Ihre E-Mail ein",
        description: "Dieser Wert ist erforderlich, um fortzufahren.",
        variant: "destructive"
      });
      return;
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacyAccepted) {
      toast({
        title: "Datenschutz-Bestätigung erforderlich",
        description: "Bitte akzeptieren Sie die Datenschutzbestimmungen.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('industry_inquiries')
        .insert({
          company_name: formData.companyName,
          contact_person: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          website: formData.website,
          message: formData.message,
          address: formData.address,
          industry: industrySlug
        });
      
      if (error) throw error;
      
      toast({
        title: "Anfrage erfolgreich gesendet",
        description: "Wir werden uns in Kürze bei Ihnen melden.",
      });
      
      // Reset form
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        website: '',
        message: '',
        address: '',
        privacyAccepted: false
      });
      setCurrentStep(1);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderBookingsBanner = () => (
    <div className="bg-swiss-darkblue/5 border border-swiss-darkblue/10 rounded-lg p-3 flex items-center justify-center gap-2 mb-6">
      <div className="flex items-center">
        <span className="inline-block h-2 w-2 rounded-full bg-green-400 mr-2 animate-ping"></span>
        <span className="text-sm text-swiss-darkblue font-medium">
          {recentBookings} Anfragen in den letzten 24 Stunden
        </span>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            {renderBookingsBanner()}
            
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-lg font-medium">Name Ihrer Praxis *</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                placeholder="z.B. Zahnarztpraxis Dr. Müller"
                className="h-12 text-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address" className="text-lg font-medium">Adresse *</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Straße, PLZ, Ort"
                className="h-12 text-lg"
              />
            </div>
            
            <div className="pt-4">
              <Button
                type="button"
                onClick={nextStep}
                className="w-full bg-swiss-red hover:bg-swiss-red/90 text-white font-medium h-14 text-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                Weiter <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactPerson" className="text-lg font-medium">Ansprechpartner *</Label>
                <Input
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  placeholder="Vor- und Nachname"
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg font-medium">E-Mail *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="ihre-email@beispiel.ch"
                  className="h-12"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-lg font-medium">Telefon</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website" className="text-lg font-medium">Aktuelle Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://www.ihre-website.ch"
                  className="h-12"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={prevStep}
                variant="outline"
                className="w-1/3 border-swiss-darkblue text-swiss-darkblue"
              >
                <ArrowLeft className="mr-2" /> Zurück
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="w-2/3 bg-swiss-red hover:bg-swiss-red/90 text-white font-medium"
              >
                Weiter <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="message" className="text-lg font-medium">Ihre Nachricht</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Beschreiben Sie kurz Ihre Anforderungen oder Fragen"
                rows={4}
              />
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="privacyAccepted"
                  name="privacyAccepted"
                  type="checkbox"
                  checked={formData.privacyAccepted}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-300 text-swiss-red focus:ring-swiss-red"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="privacyAccepted" className="text-gray-600">
                  Ich akzeptiere die <a href="/datenschutz" className="text-swiss-red hover:underline" target="_blank">Datenschutzbestimmungen</a> *
                </label>
              </div>
            </div>
            
            <div className="bg-swiss-darkblue/5 border border-swiss-darkblue/10 rounded-lg p-4 flex items-start gap-3">
              <MapPin className="text-swiss-red flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-swiss-darkblue">Praxis-Adresse: {formData.address}</p>
                <p className="text-sm text-gray-600">Ihre Anfrage wird an einen Berater mit lokaler Expertise weitergeleitet</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={prevStep}
                variant="outline"
                className="w-1/3 border-swiss-darkblue text-swiss-darkblue"
              >
                <ArrowLeft className="mr-2" /> Zurück
              </Button>
              <Button
                type="submit"
                className="w-2/3 bg-swiss-red hover:bg-swiss-red/90 text-white font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Wird gesendet...</>
                ) : (
                  <>Jetzt unverbindliche & kostenlose Beratung einholen <Send className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div id="contact-form" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-4">
              Kostenlose Beratung für Ihre {industry}-Website
            </h2>
            <p className="text-gray-600">
              Füllen Sie das Formular aus und erhalten Sie eine unverbindliche Einschätzung und Beratung von unseren Experten.
            </p>
          </div>
          
          {/* Progress bar */}
          <div className="mb-10">
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-swiss-red h-full transition-all duration-500 ease-in-out"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span className={currentStep >= 1 ? "text-swiss-red font-medium" : ""}>Praxis</span>
              <span className={currentStep >= 2 ? "text-swiss-red font-medium" : ""}>Kontakt</span>
              <span className={currentStep >= 3 ? "text-swiss-red font-medium" : ""}>Anfrage</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              {renderCurrentStep()}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
