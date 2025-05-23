
import BackgroundPattern from "@/components/BackgroundPattern";

const Impressum = () => {
  return (
    <BackgroundPattern>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto px-4 pt-32">
          <h1 className="text-4xl font-bold text-swiss-darkblue mb-8">Impressum</h1>
          <div className="prose max-w-none">
            <p>Schweizerischer KMU Verein (SKV)</p>
            <p>Dammweg 11D</p>
            <p>CH-3904 Naters</p>
          </div>
        </main>
      </div>
    </BackgroundPattern>
  );
};

export default Impressum;
