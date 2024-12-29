import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Verbindungen schaffen für</span>
            <span className="block text-primary">Schweizer Unternehmen</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Stärken Sie Ihr Unternehmen mit dem SKV! Wir bieten innovative Lösungen für mehr Reichweite und neue Kunden.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Button className="rounded-md shadow px-8 py-3 bg-primary text-white hover:bg-primary-light transition-colors">
              ZUR MITGLIEDSCHAFT →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;