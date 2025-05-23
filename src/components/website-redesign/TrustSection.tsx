
import { Star, Award, Users } from 'lucide-react';
import { nationalPartners, regionalPartners } from "@/data/partners";
import { IndustryLinks } from './IndustryLinks';
import { FrontendPartner } from '@/types/database/partners';

interface TrustSectionProps {
  satisfactionRate: number;
}

export const TrustSection = ({ satisfactionRate }: TrustSectionProps) => {
  // Updated to include 6 partners in total
  const selectedPartners: FrontendPartner[] = [
    ...nationalPartners.filter(partner => 
      ['hhomepage', 'artemia', 'kensignton', 'rankist', 'youstream'].includes(partner.id)
    ),
    ...regionalPartners.filter(partner => 
      ['webagentur-forster'].includes(partner.id)
    )
  ];

  return (
    <div className="text-center space-y-8 mt-16">
      <h2 className="text-2xl font-semibold text-swiss-darkblue">Vertrauen Sie den Experten</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <Star className="h-8 w-8 text-swiss-red mx-auto" />
          <p className="text-xl font-semibold">{satisfactionRate}%</p>
          <p className="text-gray-600">Kundenzufriedenheit</p>
        </div>
        <div className="space-y-2">
          <Award className="h-8 w-8 text-swiss-red mx-auto" />
          <p className="text-xl font-semibold">15+ Jahre</p>
          <p className="text-gray-600">Branchenerfahrung</p>
        </div>
        <div className="space-y-2">
          <Users className="h-8 w-8 text-swiss-red mx-auto" />
          <p className="text-xl font-semibold">500+</p>
          <p className="text-gray-600">Zufriedene Kunden</p>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8 mt-12">
        {selectedPartners.map((partner) => (
          <div 
            key={partner.id} 
            className="bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition-all duration-300 border border-gray-100 w-[200px] h-[100px] flex items-center justify-center"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-h-10 w-auto object-contain"
            />
          </div>
        ))}
      </div>

      {/* Industry-specific links */}
      <IndustryLinks />
    </div>
  );
};
