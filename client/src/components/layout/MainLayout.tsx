import { ReactNode, useState, useEffect } from 'react';
import { Link } from 'wouter';
import MobileMenu from '../ui/MobileMenu';
import Footer from '../sections/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav 
        id="navbar" 
        className={`bg-white shadow-md sticky top-0 z-[1000] transition-all duration-300 ${
          scrolled ? 'py-2 bg-white/95 backdrop-blur-md' : 'py-4'
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto px-5">
          <Link href="/" className="font-bold text-2xl text-primary flex items-center">
            <img 
              src="https://placehold.co/200x50/004f9f/white?text=C.L.E.A.N." 
              alt="C.L.E.A.N. Logo" 
              className="h-8 w-auto" 
            />
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-2xl focus:outline-none"
            onClick={() => setMobileMenuOpen(true)}
          >
            ☰
          </button>
          
          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex space-x-6 items-center">
            <li><a href="#about" className="nav-link">À propos</a></li>
            <li><a href="#approach" className="nav-link">Notre Approche</a></li>
            <li><a href="#events" className="nav-link">Événements</a></li>
            <li><a href="#mission" className="nav-link">Missions</a></li>
            <li><a href="#activities" className="nav-link">Activités</a></li>
            <li><a href="#areas" className="nav-link">Zones d'intervention</a></li>
            <li><a href="#partners" className="nav-link">Partenaires</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
            <li><a href="#support" className="nav-link">Soutenir</a></li>
          </ul>
        </div>
      </nav>
      
      {/* Mobile Menu (Hidden by default) */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
