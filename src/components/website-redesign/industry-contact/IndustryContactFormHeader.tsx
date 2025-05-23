
import React from 'react';

interface IndustryContactFormHeaderProps {
  industry: string;
}

export const IndustryContactFormHeader = ({ industry }: IndustryContactFormHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-4">
        Jetzt unverbindliche und kostenlose Beratung für {industry} einholen
      </h2>
      <p className="text-gray-600">
        Erfahren Sie, wie wir Ihren Online-Auftritt optimieren können. 
        Füllen Sie das Formular aus, und wir melden uns innerhalb von 24 Stunden bei Ihnen.
      </p>
    </div>
  );
};
