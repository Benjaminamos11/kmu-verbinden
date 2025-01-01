import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ExpertSubmissionForm from "@/components/experts/ExpertSubmissionForm";
import { Card, CardContent } from "@/components/ui/card";

const ExpertSubmission = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-swiss-darkblue mb-4">
              Werden Sie SKV-Experte
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Teilen Sie Ihre Expertise mit Schweizer KMUs und werden Sie Teil unseres exklusiven Expertennetzwerks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">🎯 Reichweite</h3>
                <p className="text-gray-600">Erreichen Sie hunderte von KMUs in der Schweiz und bauen Sie Ihr Netzwerk aus.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">💼 Expertise</h3>
                <p className="text-gray-600">Positionieren Sie sich als Experte in Ihrem Fachgebiet und teilen Sie Ihr Wissen.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">🤝 Vertrauen</h3>
                <p className="text-gray-600">Profitieren Sie vom Vertrauen und der Reputation des Schweizer KMU-Vereins.</p>
              </CardContent>
            </Card>
          </div>

          <ExpertSubmissionForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ExpertSubmission;