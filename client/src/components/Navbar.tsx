import React, { useState, useEffect } from 'react';
import { useNavbarScrollEffect } from '@/lib/animations';
import { useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { scrollToSection, handleLinkNavigation } from '@/lib/scroll';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  
  // Set up scroll effects for navbar
  useNavbarScrollEffect();
  
  // Close mobile menu when clicking a nav link
  const handleNavLinkClick = (target: string) => {
    setIsMobileMenuOpen(false);
    
    // Utiliser notre utilitaire de navigation
    handleLinkNavigation(target);
  };
  
  // Toggle body class when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen]);
  
  return (
    <nav id="navbar" className="sticky top-0 z-50 bg-white shadow-md transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center" onClick={(e) => { e.preventDefault(); handleNavLinkClick('/'); }}>
          <img src="/images/Clean-logo.png" alt="C.L.E.A.N. Logo" className="h-8 w-auto" />
        </a>
        
        <button 
          className="lg:hidden text-gray-700 focus:outline-none p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <Menu size={24} />
        </button>
        
        <ul className="hidden lg:flex items-center space-x-6">
          <li>
            <a 
              href="#about" 
              className="font-medium text-gray-800 hover:text-primary transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              onClick={(e) => { e.preventDefault(); handleNavLinkClick('/#about'); }}
            >
              À propos
            </a>
          </li>
          <li>
            <a 
              href="#approach" 
              className="font-medium text-gray-800 hover:text-primary transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              onClick={(e) => { e.preventDefault(); handleNavLinkClick('/#approach'); }}
            >
              Notre Approche
            </a>
          </li>
          <li>
            <a 
              href="#events" 
              className="font-medium text-gray-800 hover:text-primary transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              onClick={(e) => { e.preventDefault(); handleNavLinkClick('/#events'); }}
            >
              Événements
            </a>
          </li>
          <li>
            <a 
              href="#mission" 
              className="font-medium text-gray-800 hover:text-primary transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              onClick={(e) => { e.preventDefault(); handleNavLinkClick('/#mission'); }}
            >
              Missions
            </a>
          </li>
          <li>
            <a 
              href="#activities" 
              className="font-medium text-gray-800 hover:text-primary transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              onClick={(e) => { e.preventDefault(); handleNavLinkClick('/#activities'); }}
            >
              Activités
            </a>
          </li>
          <li>
            <a 
              href="#areas" 
              className="font-medium text-gray-800 hover:text-primary transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              onClick={(e) => { e.preventDefault(); handleNavLinkClick('/#areas'); }}
            >
              Zones d'intervention
            </a>
          </li>
          <li>
            <a 
              href="#partners" 
              className="font-medium text-gray-800 hover:text-primary transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              onClick={(e) => { e.preventDefault(); handleNavLinkClick('/#partners'); }}
            >
              Partenaires
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className="font-medium text-gray-800 hover:text-primary transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              onClick={(e) => { e.preventDefault(); handleNavLinkClick('/#contact'); }}
            >
              Contact
            </a>
          </li>
          <li>
            <a 
              href="#support" 
              className="font-medium text-gray-800 hover:text-primary transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              onClick={(e) => { e.preventDefault(); handleNavLinkClick('/#support'); }}
            >
              Soutenir
            </a>
          </li>
        </ul>
        
        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center text-center space-y-6 transform transition-transform duration-300 lg:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <button 
            className="absolute top-5 right-5 p-1"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          >
            <X size={24} />
          </button>
          <a 
            href="#about" 
            className="block text-xl font-medium"
            onClick={(e) => { e.preventDefault(); handleNavLinkClick('/#about'); }}
          >
            À propos
          </a>
          <a 
            href="#approach" 
            className="block text-xl font-medium"
            onClick={(e) => { e.preventDefault(); handleNavLinkClick('/#approach'); }}
          >
            Notre Approche
          </a>
          <a 
            href="#events" 
            className="block text-xl font-medium"
            onClick={(e) => { e.preventDefault(); handleNavLinkClick('/#events'); }}
          >
            Événements
          </a>
          <a 
            href="#mission" 
            className="block text-xl font-medium"
            onClick={(e) => { e.preventDefault(); handleNavLinkClick('/#mission'); }}
          >
            Missions
          </a>
          <a 
            href="#activities" 
            className="block text-xl font-medium"
            onClick={(e) => { e.preventDefault(); handleNavLinkClick('/#activities'); }}
          >
            Activités
          </a>
          <a 
            href="#areas" 
            className="block text-xl font-medium"
            onClick={(e) => { e.preventDefault(); handleNavLinkClick('/#areas'); }}
          >
            Zones d'intervention
          </a>
          <a 
            href="#partners" 
            className="block text-xl font-medium"
            onClick={(e) => { e.preventDefault(); handleNavLinkClick('/#partners'); }}
          >
            Partenaires
          </a>
          <a 
            href="#contact" 
            className="block text-xl font-medium"
            onClick={(e) => { e.preventDefault(); handleNavLinkClick('/#contact'); }}
          >
            Contact
          </a>
          <a 
            href="#support" 
            className="block text-xl font-medium"
            onClick={(e) => { e.preventDefault(); handleNavLinkClick('/#support'); }}
          >
            Soutenir
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
