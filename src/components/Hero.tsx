import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-white via-[#EBF8FF] to-[#BFDBFE] min-h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMjBMMjAgME0yMCAyMEw0MCAwTTAgMEwtMjAgMjBNMjAgNDBMMCAyMCIgc3Ryb2tlPSIjOTNDNUZEIiBzdHJva2Utd2lkdGg9IjAuMyIgc3Ryb2tlLW9wYWNpdHk9IjAuMyIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')] opacity-60"></div>
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-swiss-darkblue leading-tight">
              Werden Sie Mitglied im KMU Verein
            </h1>
            <p className="text-lg sm:text-xl text-swiss-darkblue/90 leading-relaxed max-w-2xl">
              Nutzen Sie exklusive Vorteile, vernetzen Sie sich mit Branchenführern und treiben Sie Ihr Unternehmen voran.
            </p>
            <div className="pt-4">
              <Button 
                className="w-full sm:w-auto shine-effect text-lg px-6 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-swiss-red to-swiss-red/80 hover:from-swiss-red/90 hover:to-swiss-red/70 text-white border-none shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105"
              >
                Mitglied werden
              </Button>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2 lg:pl-12">
            <img
              src="https://static.wixstatic.com/media/0c82d3_2ad093992c9042fbaffe72bf4ea724c9~mv2.png"
              alt="KMU Magazine"
              className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;