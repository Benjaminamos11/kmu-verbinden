
import { useState } from "react";
import { Link } from "react-router-dom";
import { ExpertPreview } from "@/components/experts/ExpertPreview";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Static expert data
const staticExperts = [
  {
    id: "1",
    company_name: "Digital Solutions AG",
    contact_person: "Maria Schmidt",
    expertise_area: "Digitale Transformation",
    description: "Spezialisiert auf die digitale Transformation von KMU mit über 15 Jahren Erfahrung. Wir bieten massgeschneiderte Lösungen für die Digitalisierung Ihres Unternehmens.",
    services: ["Digitalisierung", "Prozessoptimierung", "Cloud Migration", "IT-Beratung"],
    email: "contact@digitalsolutions.ch",
    phone: "+41 44 123 45 67",
    website: "www.digitalsolutions.ch",
    address: "Technikstrasse 123",
    postal_code: "8000",
    city: "Zürich",
    linkedin: "linkedin.com/company/digital-solutions",
    image_url: "/placeholder.svg",
    logo_url: "/placeholder.svg"
  },
  {
    id: "2",
    company_name: "KMU Consulting GmbH",
    contact_person: "Thomas Weber",
    expertise_area: "Unternehmensberatung",
    description: "Ganzheitliche Beratung für KMU mit Fokus auf nachhaltigem Wachstum. Wir unterstützen Sie bei der strategischen Entwicklung Ihres Unternehmens.",
    services: ["Strategieberatung", "Finanzplanung", "Organisationsentwicklung", "Prozessoptimierung"],
    email: "info@kmu-consulting.ch",
    phone: "+41 44 987 65 43",
    website: "www.kmu-consulting.ch",
    address: "Businessplatz 45",
    postal_code: "8400",
    city: "Winterthur",
    linkedin: "linkedin.com/company/kmu-consulting",
    image_url: "/placeholder.svg",
    logo_url: "/placeholder.svg"
  },
  {
    id: "3",
    company_name: "Innovation Labs AG",
    contact_person: "Sarah Müller",
    expertise_area: "Innovationsmanagement",
    description: "Ihr Partner für Innovation und Zukunftsfähigkeit. Wir helfen Ihnen dabei, neue Geschäftsmodelle zu entwickeln und Ihre Innovationskraft zu stärken.",
    services: ["Innovationsworkshops", "Design Thinking", "Geschäftsmodellentwicklung", "Trendanalysen"],
    email: "hello@innovation-labs.ch",
    phone: "+41 44 333 22 11",
    website: "www.innovation-labs.ch",
    address: "Innovationsweg 78",
    postal_code: "6300",
    city: "Zug",
    linkedin: "linkedin.com/company/innovation-labs",
    image_url: "/placeholder.svg",
    logo_url: "/placeholder.svg"
  }
];

// Get unique expertise areas from experts
const expertiseAreas = [...new Set(staticExperts.map(expert => expert.expertise_area))];

export default function Experts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState<string>("all_areas");
  const [selectedCompany, setSelectedCompany] = useState<string>("all_companies");

  // Filter experts based on search query and selected filters
  const filteredExperts = staticExperts.filter(expert => {
    const matchesSearch = searchQuery === "" || 
      Object.values(expert).some(value => 
        typeof value === 'string' && 
        value.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesExpertise = selectedExpertise === "all_areas" || 
      expert.expertise_area === selectedExpertise;
    
    const matchesCompany = selectedCompany === "all_companies" || 
      expert.company_name === selectedCompany;

    return matchesSearch && matchesExpertise && matchesCompany;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div 
        className="relative h-[400px] w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/lovable-uploads/e6fa6c1c-101e-4106-90a1-7ce1fca25636.png')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Expertenrat
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Profitieren Sie von unserem Netzwerk qualifizierter Experten für Ihr Unternehmen
            </p>
          </div>
        </div>
      </div>

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        {/* Coming Soon Message at the top */}
        <div className="max-w-2xl mx-auto mb-8 bg-white/90 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold text-swiss-darkblue mb-4">
            Demnächst verfügbar
          </h2>
          <p className="text-xl text-gray-700 mb-2">
            Wir arbeiten gerade daran, unsere Expertenplattform für Sie zu optimieren.
          </p>
          <p className="text-lg text-gray-600">
            Bitte besuchen Sie uns in ein paar Tagen wieder.
          </p>
        </div>

        <div className="max-w-7xl mx-auto blur-[2px]">
          {/* Filter Section */}
          <div className="mb-8 space-y-4 md:space-y-0 md:flex md:gap-4 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Suchen Sie nach Experten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="md:w-64">
              <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
                <SelectTrigger>
                  <SelectValue placeholder="Fachgebiet auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_areas">Alle Fachgebiete</SelectItem>
                  {expertiseAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:w-64">
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="Unternehmen auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_companies">Alle Unternehmen</SelectItem>
                  {staticExperts.map((expert) => (
                    <SelectItem key={expert.id} value={expert.company_name}>
                      {expert.company_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Section */}
          <div className="grid grid-cols-1 gap-8">
            {filteredExperts.map((expert) => (
              <Link key={expert.id} to={`/experts/${expert.id}`} className="block transition-transform hover:scale-[1.01]">
                <ExpertPreview formData={expert} />
              </Link>
            ))}
            {filteredExperts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Keine Experten gefunden, die Ihren Filterkriterien entsprechen.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
