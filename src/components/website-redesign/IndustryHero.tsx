
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

interface IndustryHeroProps {
  headline: string;
  subheadline: string;
  industry: string;
  imagePath?: string;
}

export const IndustryHero = ({
  headline,
  subheadline,
  industry,
  imagePath = '/placeholder.svg'
}: IndustryHeroProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-swiss-gray">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:pr-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-swiss-red/10 text-swiss-red">
              Branchenspezifische Lösung für {industry}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-swiss-darkblue leading-tight">
              {headline}
            </h1>
            
            <p className="text-lg text-gray-700">
              {subheadline}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-swiss-red mr-2 mt-0.5" />
                <p className="text-sm">Exklusiv für Verbandsmitglieder: Bis zu 50% Rabatt</p>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-swiss-red mr-2 mt-0.5" />
                <p className="text-sm">KI-gestützte SEO-Optimierung für lokale Sichtbarkeit</p>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-swiss-red mr-2 mt-0.5" />
                <p className="text-sm">Persönliche Betreuung durch Branchenexperten</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-swiss-red hover:bg-swiss-red/90 text-white font-medium"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({behavior: 'smooth'})}
              >
                Kostenlose Beratung <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-swiss-darkblue text-swiss-darkblue hover:bg-swiss-darkblue/5"
              >
                Beispiele ansehen
              </Button>
            </div>
          </div>
          
          <div className="relative rounded-lg shadow-2xl overflow-hidden">
            <img 
              src={imagePath} 
              alt={`${industry} Website Beispiel`} 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-swiss-darkblue/30 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
