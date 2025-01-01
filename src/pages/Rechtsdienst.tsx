import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Gavel, Shield, Briefcase, Building, HandshakeIcon } from "lucide-react";

export default function Rechtsdienst() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-luxury-gradient text-white py-16 mt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Orientierung und Sicherheit dank meinJurist</h1>
          <p className="text-lg max-w-3xl mb-8">
            Der Weg durch juristische Angelegenheiten kann mit Herausforderungen gespickt sein, die eine sorgfältige Navigation erfordern.
          </p>
          <Button 
            size="lg"
            className="bg-swiss-red hover:bg-red-700 text-white"
            onClick={() => window.location.href = 'mailto:termin@meinjurist.ch'}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Kostenlosen Termin vereinbaren
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Free Consultation Banner */}
        <div className="bg-swiss-darkblue text-white p-8 rounded-lg mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Kostenlose Rechtsberatung für Mitglieder</h2>
              <p className="text-lg">Jeden Mittwoch Nachmittag - Sichern Sie sich Ihren Termin</p>
            </div>
            <Button 
              size="lg" 
              className="mt-4 md:mt-0 bg-swiss-red hover:bg-red-700 text-white"
              onClick={() => window.location.href = 'mailto:termin@meinjurist.ch'}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Jetzt Termin vereinbaren
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <ServiceCard
            icon={<Gavel className="h-8 w-8 text-swiss-red" />}
            title="Strategische Rechtsberatung"
            description="Brauchen Sie einen Generalisten? Wir bieten kreative, agile Lösungen mit Blick über den Tellerrand."
          />
          <ServiceCard
            icon={<Building className="h-8 w-8 text-swiss-red" />}
            title="In-House Jurist"
            description="Moderne Unternehmen benötigen rechtliche Expertise. Wir sind Ihr verlässlicher Partner."
          />
          <ServiceCard
            icon={<Briefcase className="h-8 w-8 text-swiss-red" />}
            title="Gründung & Liquidation"
            description="Professionelle Begleitung bei Gründung, Überschuldung oder geordnetem Konkurs."
          />
          <ServiceCard
            icon={<HandshakeIcon className="h-8 w-8 text-swiss-red" />}
            title="Nachfolgeregelung"
            description="Kompetente Beratung bei Unternehmensverkauf und Nachfolgeplanung."
          />
          <ServiceCard
            icon={<Shield className="h-8 w-8 text-swiss-red" />}
            title="Verwaltungsrat"
            description="Professionelle Unterstützung für die oberste Führungsebene Ihres Unternehmens."
          />
          <ServiceCard
            icon={<Gavel className="h-8 w-8 text-swiss-red" />}
            title="Covid-Kredit Beratung"
            description="Expertise bei der Handhabung von Covid-Krediten und deren rechtlichen Folgen."
          />
        </div>

        {/* Covid Credit Section */}
        <div className="bg-gray-50 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-4">Drückt der Covid-Kredit?</h2>
          <p className="mb-4">
            Mitte Mai 2024 haben rund 75'000 Unternehmen ihre Covid-19-Kredite noch nicht zurückbezahlt. 
            Dies entspricht rund einem Drittel aller KMU, die einen Kredit erhalten haben.
          </p>
          <Button variant="outline" className="text-swiss-darkblue border-swiss-darkblue hover:bg-swiss-darkblue hover:text-white">
            Zum Artikel
          </Button>
        </div>

        {/* AGB Section */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Überprüfung oder Neufassung Ihrer AGB</h2>
          <p className="mb-4">
            Waren Sie schon einmal in einen Streit über Allgemeine Geschäftsbedingungen (AGB) verwickelt? 
            Wir helfen Ihnen, Ihre AGB professionell und rechtssicher zu gestalten.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">Unsere Offerte</h3>
            <p>
              Anpassung bestehender oder Erstellung neuer AGB in Abstimmung mit den AGB Ihrer Versicherungspolicen. 
              Wir formulieren Ihre AGB in verständlicher Sprache auf einer A4-Seite oder überprüfen bestehende AGB auf ihre Gültigkeit.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}