import WaterEffects from '../animations/WaterEffects';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white text-center py-24 px-4 relative overflow-hidden">
      <WaterEffects />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-wide">
          Zéro Déchet pour les Rivières de Nantes
        </h1>
        <p className="text-2xl font-light mb-8">
          Agissons ensemble pour des rivières plus propres
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="#support" 
            className="cta-button"
          >
            Nous soutenir
          </a>
          <a 
            href="#activities" 
            className="cta-button border-2 border-white"
          >
            Découvrir nos actions
          </a>
        </div>
      </div>
    </header>
  );
}
