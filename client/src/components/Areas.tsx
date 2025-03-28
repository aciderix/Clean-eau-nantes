import React, { useRef, useEffect, useState } from 'react';
import SectionTitle from './SectionTitle';
import { useIsMobile } from '@/hooks/use-mobile';
import { MapPin, Navigation, Compass, Globe } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

// Type pour les zones d'intervention
interface Area {
  id: number;
  name: string;
  description: string | null;
  order: number;
  latitude: string;
  longitude: string;
}

// Fonction pour déterminer l'icône à utiliser
const getAreaIcon = (name: string) => {
  // Par défaut
  let Icon = MapPin;
  
  if (name.toLowerCase().includes('loire')) {
    Icon = Navigation;
  } else if (name.toLowerCase().includes('ile') || name.toLowerCase().includes('île')) {
    Icon = Globe;
  } else if (name.toLowerCase().includes('extension') || name.toLowerCase().includes('futur')) {
    Icon = Compass;
  }
  
  return Icon;
};

const Areas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  
  // Récupérer les données depuis l'API avec URL absolue
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/areas'],
    queryFn: async () => {
      const response = await fetch('https://clean-eau-nantes.onrender.com/api/areas');
      if (!response.ok) {
        throw new Error('Échec de chargement des zones d\'intervention');
      }
      return response.json();
    }
  });

  const areas = data || [];
  
  // Logs pour débogage
  useEffect(() => {
    console.log('Areas data:', areas);
  }, [areas]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Données statiques au cas où
  const staticAreas = [
    {
      id: 1,
      name: "L'Erdre",
      description: "Notre terrain d'action principal",
      order: 1,
      latitude: "47.2359",
      longitude: "-1.5497"
    },
    {
      id: 2,
      name: "La Loire",
      description: "Interventions ponctuelles",
      order: 2,
      latitude: "47.2073",
      longitude: "-1.5537"
    },
    {
      id: 3,
      name: "Extension future",
      description: "Nos ambitions",
      order: 3,
      latitude: "47.2183",
      longitude: "-1.5517"
    }
  ];

  // Utiliser les données de l'API ou les données statiques
  const displayAreas = areas.length > 0 ? areas : staticAreas;

  return (
    <section id="areas" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <SectionTitle title="Zones d'intervention" />
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            Une erreur est survenue lors du chargement des zones d'intervention
          </div>
        ) : (
          <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {displayAreas.map((area: Area) => {
              const Icon = getAreaIcon(area.name);
              return (
                <div key={area.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full mr-4 text-primary">
                      <Icon size={isMobile ? 20 : 24} />
                    </div>
                    <h3 className="text-xl font-semibold text-primary">{area.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {area.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {area.order === 1 ? "Zone d'intervention permanente" : 
                     area.order === 2 ? "Interventions ponctuelles" : 
                     "Projets en développement"}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Areas;