import { Building, MapPin, Mail, Phone, Clock, Calendar } from "lucide-react";
import BackgroundPattern from "@/components/BackgroundPattern";

const Geschaeftsstelle = () => {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <BackgroundPattern>
        <div className="bg-swiss-red text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Unsere Geschäftsstelle</h1>
          </div>
        </div>
      </BackgroundPattern>

      <div className="container mx-auto px-4 py-12">
        {/* Main Office Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-swiss-darkblue mb-6">
            Hauptgeschäftsstelle Naters
          </h2>
          <p className="text-gray-700 mb-8">
            Die Geschäftsstelle in Naters ist das Herzstück des Schweizerischen KMU Vereins (SKV). Von hier
            aus koordinieren wir sämtliche strategischen Aktivitäten, unterstützen unsere Mitglieder und Partner,
            und stellen sicher, dass unsere Publikationen und Angebote höchsten Ansprüchen gerecht werden.
            Hier laufen alle Fäden zusammen – sei es bei der Organisation von Events, der Planung von
            Publikationen oder der Betreuung unserer Mitglieder.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-swiss-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Adresse:</h3>
                  <p>Dammweg 11D, 3904 Naters</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-6 w-6 text-swiss-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">E-Mail:</h3>
                  <p>info@kmu-verein.ch (Erreichbar rund um die Uhr)</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-6 w-6 text-swiss-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Telefon:</h3>
                  <p>+41 (0) 27 585 20 81</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-6 w-6 text-swiss-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Öffnungszeiten:</h3>
                  <p>Montag bis Freitag, 08:00 - 12:00 Uhr</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-swiss-darkblue mb-4">Was wir bieten</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="text-swiss-red">•</span>
                  <span>Unterstützung bei Publikationen und Medienpräsenz</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-swiss-red">•</span>
                  <span>Organisation und Betreuung von Events und Netzwerkanlässen</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-swiss-red">•</span>
                  <span>Allgemeine Anfragen zu Mitgliedschaft, Partnerangeboten und weiteren Dienstleistungen</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Other Offices Section */}
        <div>
          <h2 className="text-2xl font-bold text-swiss-darkblue mb-6">
            Weitere Sekretariate in der Schweiz
          </h2>
          <p className="text-gray-700 mb-8">
            Neben unserer Hauptgeschäftsstelle in Naters haben wir weitere Sekretariate in der Schweiz
            eingerichtet, um unseren Mitgliedern schweizweit persönlichen Service zu bieten. Unsere Standorte
            in Bern, Luzern und Genf ermöglichen es uns, nahe bei unseren Mitgliedern und Partnern zu sein
            und sie effizient zu unterstützen.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {["Bern", "Luzern", "Genf"].map((city) => (
              <div key={city} className="bg-gray-100 p-6 rounded-lg">
                <div className="flex items-center space-x-2 text-swiss-darkblue">
                  <MapPin className="h-5 w-5 text-swiss-red" />
                  <span className="font-semibold">{city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-4">
            Ob telefonisch, per E-Mail oder vor Ort – wir stehen Ihnen tatkräftig zur Seite und arbeiten mit Ihnen
            daran, Ihre Ziele zu erreichen.
          </p>
          <p className="text-swiss-darkblue font-semibold">
            Wir freuen uns, Sie in einer unserer Sekretariate oder in der Geschäftsstelle Naters willkommen zu
            heißen! Kontaktieren Sie uns jederzeit, wir sind für Sie da.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Geschaeftsstelle;
