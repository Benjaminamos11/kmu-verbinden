import { Mail, Phone } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const offices = [
  {
    city: "Genf",
    phone: "022 / 518 05 09",
    email: "genf@kmu-verein.ch"
  },
  {
    city: "Luzern",
    phone: "041 / 588 22 49",
    email: "luzern@kmu-verein.ch"
  },
  {
    city: "Bern",
    phone: "031 / 528 05 51",
    email: "bern@kmu-verein.ch"
  },
  {
    city: "Naters",
    phone: "044 / 585 20 81",
    email: "naters@kmu-verein.ch"
  }
];

export const OfficeLocations = () => {
  return (
    <div className="flex flex-wrap gap-4 text-sm text-gray-300">
      <TooltipProvider>
        {offices.map((office) => (
          <Tooltip key={office.city}>
            <TooltipTrigger className="hover:text-swiss-red transition-colors">
              {office.city}
            </TooltipTrigger>
            <TooltipContent className="bg-swiss-darkblue border-swiss-red p-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-swiss-red" />
                  <span>{office.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-swiss-red" />
                  <a href={`mailto:${office.email}`} className="hover:text-swiss-red">
                    {office.email}
                  </a>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};