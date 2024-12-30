import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Experts() {
  const { data: experts, isLoading } = useQuery({
    queryKey: ['experts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experts')
        .select(`
          *,
          profile:profiles(company_name, contact_person),
          reviews:expert_reviews(rating)
        `);
      
      if (error) throw error;
      return data;
    }
  });

  const calculateAverageRating = (reviews: any[]) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-swiss-darkblue mb-4">
              Expertenrat
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Finden Sie qualifizierte Experten für Ihre geschäftlichen Herausforderungen
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <Card key={n} className="animate-pulse">
                  <CardHeader className="h-48 bg-gray-200" />
                  <CardContent className="space-y-3">
                    <div className="h-6 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experts?.map((expert) => (
                <Link key={expert.id} to={`/experts/${expert.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                        <img
                          src={expert.image_url || "/placeholder.svg"}
                          alt={expert.profile?.company_name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardTitle className="text-xl mb-2">
                        {expert.profile?.company_name || "Unbenanntes Unternehmen"}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-yellow-500 mb-2">
                        <Star className="h-5 w-5 fill-current" />
                        <span className="font-medium">
                          {calculateAverageRating(expert.reviews)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{expert.expertise_area}</p>
                      <div className="space-y-2 text-sm text-gray-500">
                        {expert.city && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{expert.city}</span>
                          </div>
                        )}
                        {expert.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{expert.phone}</span>
                          </div>
                        )}
                        {expert.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{expert.email}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}