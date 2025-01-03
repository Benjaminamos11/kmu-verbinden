import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PartnerSection } from "@/components/PartnerSection";
import BackgroundPattern from "@/components/BackgroundPattern";
import { 
  nationalPartners, 
  regionalPartners, 
  cooperationPartners, 
  patronagePartners 
} from "@/data/partners";

const Partners = () => {
  return (
    <BackgroundPattern>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow pt-20">
          <header className="w-full bg-swiss-darkblue text-white">
            <div className="container mx-auto px-4 py-16">
              <h1 className="text-4xl font-bold mb-4">Unsere Partner</h1>
              <p className="text-xl max-w-3xl">
                Entdecken Sie unser Netzwerk von vertrauenswürdigen Partnern, die den Schweizerischen KMU Verein unterstützen
              </p>
            </div>
          </header>

          <div className="container mx-auto px-4 py-8 bg-white/90">
            <PartnerSection
              title="Nationale Partner"
              description="Größere Unternehmen mit landesweiter Präsenz, die Dienstleistungen in der ganzen Schweiz anbieten"
              partners={nationalPartners}
            />

            <PartnerSection
              title="Regionale Partner"
              description="Lokale Unternehmen, die spezifische Regionen bedienen und personalisierte, standortbezogene Dienstleistungen anbieten"
              partners={regionalPartners}
            />

            <PartnerSection
              title="Kooperationspartner"
              description="Strategische Geschäftspartnerschaften mit gegenseitigen Dienstleistungsangeboten"
              partners={cooperationPartners}
            />

            <PartnerSection
              title="Patronatspartner"
              description="Unterstützende Organisationen, Branchenführer und Verbände"
              partners={patronagePartners}
            />
          </div>
        </main>
        <Footer />
      </div>
    </BackgroundPattern>
  );
};

export default Partners;