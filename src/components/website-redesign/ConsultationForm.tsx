
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight } from 'lucide-react';

interface FormData {
  step: number;
  platform: string;
  challenges: string;
  companyName: string;
  industry: string;
  employeeCount: string;
  monthlyVisitors: string;
  contactPerson: string;
  email: string;
  phone: string;
  preferredTime: string;
  newsletter: boolean;
  privacyAccepted: boolean;
}

interface ConsultationFormProps {
  formData: FormData;
  onFormChange: (updates: Partial<FormData>) => void;
  onPrevStep: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ConsultationForm = ({
  formData,
  onFormChange,
  onPrevStep,
  onSubmit
}: ConsultationFormProps) => {
  return (
    <div className="space-y-8">
      <div className="mb-12">
        <Progress value={formData.step * 50} className="h-3 bg-white/20" />
        <div className="flex justify-between mt-4 text-lg font-medium">
          <span className={formData.step >= 1 ? "text-swiss-red" : "text-white/60"}>Unternehmen</span>
          <span className={formData.step >= 2 ? "text-swiss-red" : "text-white/60"}>Kontakt</span>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        {formData.step === 1 && (
          <div className="space-y-6">
            <Input
              placeholder="Firmenname"
              value={formData.companyName}
              onChange={(e) => onFormChange({ companyName: e.target.value })}
              className="bg-white border-2 border-white/20 h-14 text-gray-900 text-lg placeholder:text-gray-500"
              required
            />
            <Select onValueChange={(value) => onFormChange({ industry: value })}>
              <SelectTrigger className="bg-white border-2 border-white/20 h-14 text-gray-900 text-lg">
                <SelectValue placeholder="Branche" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900">
                <SelectItem value="handel">Handel</SelectItem>
                <SelectItem value="dienstleistung">Dienstleistung</SelectItem>
                <SelectItem value="handwerk">Handwerk</SelectItem>
                <SelectItem value="other">Andere</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Anzahl Mitarbeiter (optional)"
              value={formData.employeeCount}
              onChange={(e) => onFormChange({ employeeCount: e.target.value })}
              className="bg-white border-2 border-white/20 h-14 text-gray-900 text-lg placeholder:text-gray-500"
            />
          </div>
        )}

        {formData.step === 2 && (
          <div className="space-y-6">
            <Input
              placeholder="Ansprechpartner"
              value={formData.contactPerson}
              onChange={(e) => onFormChange({ contactPerson: e.target.value })}
              className="bg-white border-2 border-white/20 h-14 text-gray-900 text-lg placeholder:text-gray-500"
              required
            />
            <Input
              type="email"
              placeholder="E-Mail"
              value={formData.email}
              onChange={(e) => onFormChange({ email: e.target.value })}
              className="bg-white border-2 border-white/20 h-14 text-gray-900 text-lg placeholder:text-gray-500"
              required
            />
            <Input
              type="tel"
              placeholder="Telefon (optional)"
              value={formData.phone}
              onChange={(e) => onFormChange({ phone: e.target.value })}
              className="bg-white border-2 border-white/20 h-14 text-gray-900 text-lg placeholder:text-gray-500"
            />
            <Select onValueChange={(value) => onFormChange({ preferredTime: value })}>
              <SelectTrigger className="bg-white border-2 border-white/20 h-14 text-gray-900 text-lg">
                <SelectValue placeholder="Bevorzugte Kontaktzeit" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900">
                <SelectItem value="morning">Vormittag</SelectItem>
                <SelectItem value="afternoon">Nachmittag</SelectItem>
                <SelectItem value="evening">Abend</SelectItem>
              </SelectContent>
            </Select>

            <div className="space-y-4 mt-8">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => 
                    onFormChange({ newsletter: checked as boolean })
                  }
                  className="border-2 border-white/20 data-[state=checked]:bg-swiss-red"
                />
                <label
                  htmlFor="newsletter"
                  className="text-lg text-white/80"
                >
                  Newsletter abonnieren (optional)
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="privacy"
                  required
                  checked={formData.privacyAccepted}
                  onCheckedChange={(checked) => 
                    onFormChange({ privacyAccepted: checked as boolean })
                  }
                  className="border-2 border-white/20 data-[state=checked]:bg-swiss-red"
                />
                <label
                  htmlFor="privacy"
                  className="text-lg text-white/80"
                >
                  Ich akzeptiere die Datenschutzerklärung
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-8">
          {formData.step > 1 && (
            <Button
              type="button"
              onClick={onPrevStep}
              variant="outline"
              className="h-14 px-8 bg-transparent border-2 border-white hover:bg-white/10 text-white text-lg"
            >
              Zurück
            </Button>
          )}
          <Button 
            type="submit"
            className={`h-14 px-8 bg-swiss-red hover:bg-swiss-red/90 text-white shine-effect text-lg ${formData.step === 1 ? 'ml-auto' : ''}`}
          >
            {formData.step === 2 ? 'Kostenloses Beratungsgespräch vereinbaren' : 'Weiter'}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </form>

      <div className="text-center text-white/80 text-sm">
        Unverbindliche Erstberatung • 100% Kostenlos • Keine versteckten Kosten
      </div>
    </div>
  );
};
