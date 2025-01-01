import { ProfileSection } from "./ProfileSection";
import { ServicesSection } from "./ServicesSection";
import { BenefitsMenu } from "./BenefitsMenu";
import { InvoicesSection } from "./InvoicesSection";
import AIChat from "@/components/AIChat";
import FinancingSimulator from "@/components/FinancingSimulator";
import { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;
type Service = Tables<"services">;

interface DashboardContentProps {
  profile: Profile | null;
  services: Service[];
  claimedServices: Service[];
  setProfile: (profile: Profile) => void;
  setClaimedServices: (services: Service[]) => void;
}

export const DashboardContent = ({
  profile,
  services,
  claimedServices,
  setProfile,
  setClaimedServices,
}: DashboardContentProps) => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <ProfileSection profile={profile} setProfile={setProfile} />
      
      <BenefitsMenu
        services={services}
        claimedServices={claimedServices}
        onClaimService={async (serviceId) => {
          if (!profile) return;
          const { error } = await supabase
            .from("profile_services")
            .insert({
              profile_id: profile.id,
              service_id: serviceId,
            });

          if (error) {
            toast({
              title: "Fehler",
              description: "Service konnte nicht aktiviert werden",
              variant: "destructive",
            });
            return;
          }

          const updatedClaimedServices = services.filter(
            (service) =>
              service.id === serviceId ||
              claimedServices.some((cs) => cs.id === service.id)
          );
          setClaimedServices(updatedClaimedServices);

          toast({
            title: "Erfolg",
            description: "Service wurde erfolgreich aktiviert",
          });
        }}
      />

      <InvoicesSection profile={profile} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FinancingSimulator />
        <AIChat />
      </div>

      <ServicesSection 
        profile={profile}
        services={services}
        claimedServices={claimedServices}
        setClaimedServices={setClaimedServices}
      />
    </div>
  );
};