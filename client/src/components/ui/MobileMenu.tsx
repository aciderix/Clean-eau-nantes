import { useEffect } from 'react';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <div 
      className={`lg:hidden fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-end p-4">
        <button 
          className="text-2xl focus:outline-none"
          onClick={onClose}
        >
          <X />
        </button>
      </div>
      <ul className="flex flex-col items-center space-y-4 p-4">
        <li>
          <a 
            href="#about" 
            className="font-medium text-lg py-2"
            onClick={onClose}
          >
            À propos
          </a>
        </li>
        <li>
          <a 
            href="#approach" 
            className="font-medium text-lg py-2"
            onClick={onClose}
          >
            Notre Approche
          </a>
        </li>
        <li>
          <a 
            href="#events" 
            className="font-medium text-lg py-2"
            onClick={onClose}
          >
            Événements
          </a>
        </li>
        <li>
          <a 
            href="#mission" 
            className="font-medium text-lg py-2"
            onClick={onClose}
          >
            Missions
          </a>
        </li>
        <li>
          <a 
            href="#activities" 
            className="font-medium text-lg py-2"
            onClick={onClose}
          >
            Activités
          </a>
        </li>
        <li>
          <a 
            href="#areas" 
            className="font-medium text-lg py-2"
            onClick={onClose}
          >
            Zones d'intervention
          </a>
        </li>
        <li>
          <a 
            href="#partners" 
            className="font-medium text-lg py-2"
            onClick={onClose}
          >
            Partenaires
          </a>
        </li>
        <li>
          <a 
            href="#contact" 
            className="font-medium text-lg py-2"
            onClick={onClose}
          >
            Contact
          </a>
        </li>
        <li>
          <a 
            href="#support" 
            className="font-medium text-lg py-2"
            onClick={onClose}
          >
            Soutenir
          </a>
        </li>
      </ul>
    </div>
  );
}
