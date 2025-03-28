import React, { useEffect } from 'react';
import { useWaterAnimations } from '@/lib/animations';

const Header: React.FC = () => {
  // Initialize water drop animation
  useWaterAnimations();
  
  return (
    <header className="relative bg-gradient-to-r from-primary to-secondary text-white text-center py-24 px-4 overflow-hidden">
      <div id="drops-container" className="absolute inset-0 z-0"></div>
      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">Zéro Déchet pour les Rivières de Nantes</h1>
        <p className="text-2xl font-light mb-8">Agissons ensemble pour des rivières plus propres</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="#support" 
            className="inline-block bg-primary hover:bg-dark-blue text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Nous soutenir
          </a>
          <a 
            href="#activities" 
            className="inline-block bg-primary border-2 border-white hover:bg-dark-blue text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Découvrir nos actions
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
