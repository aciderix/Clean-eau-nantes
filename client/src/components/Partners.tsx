import React, { useRef, useEffect, useState } from 'react';
import SectionTitle from './SectionTitle';
import { useQuery } from '@tanstack/react-query';
import { Partner } from '@shared/schema';

const Partners: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Récupérer les partenaires depuis l'API avec URL absolue
  const { data: partners = [], isLoading, error } = useQuery<Partner[]>({
    queryKey: ['/api/partners'],
    queryFn: async () => {
      const response = await fetch('https://clean-eau-nantes.onrender.com/api/partners');
      if (!response.ok) {
        throw new Error('Échec de chargement des partenaires');
      }
      return response.json();
    },
    staleTime: 60000, // 1 minute
  });

  // Partenaires par défaut si l'API ne renvoie rien
  const defaultPartners: Partner[] = [
    {
      id: 1,
      name: "Ville de Nantes",
      logo: "https://placehold.co/200x100?text=Logo+Nantes",
      url: "https://metropole.nantes.fr",
      order: 1
    },
    {
      id: 2,
      name: "Région Pays de la Loire",
      logo: "https://placehold.co/200x100?text=Logo+Region",
      url: "https://www.paysdelaloire.fr",
      order: 2
    },
    {
      id: 3,
      name: "Université de Nantes",
      logo: "https://placehold.co/200x100?text=Logo+Université",
      url: "https://www.univ-nantes.fr",
      order: 3
    },
    {
      id: 4,
      name: "FNE Pays de la Loire",
      logo: "https://placehold.co/200x100?text=Logo+FNE",
      url: "https://www.fne-pays-de-la-loire.fr",
      order: 4
    },
    {
      id: 5,
      name: "EcoCène",
      logo: "https://placehold.co/200x100?text=Logo+EcoCène",
      url: "https://www.eco-cene.fr",
      order: 5
    },
    {
      id: 6,
      name: "Entreprise Verte",
      logo: "https://placehold.co/200x100?text=Logo+Entreprise",
      url: "https://example.com/entreprise-verte",
      order: 6
    }
  ];

  // Utiliser les partenaires de l'API ou les partenaires par défaut si la liste est vide
  const displayPartners = partners.length > 0 ? partners : defaultPartners;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Une fois visible, arrêter d'observer
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

  return (
    <section id="partners" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Nos Partenaires" />
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            Une erreur est survenue lors du chargement des partenaires
          </div>
        ) : (
          <div 
            ref={containerRef}
            className={`mt-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="text-center mb-10">
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                La réussite de nos actions repose sur la collaboration avec différents acteurs engagés pour la protection de l'environnement.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {displayPartners.map((partner) => (
                <a 
                  key={partner.id}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-center transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                >
                  <img 
                    src={partner.logo} 
                    alt={`Logo ${partner.name}`} 
                    className="max-w-full max-h-20 object-contain" 
                  />
                </a>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-primary font-medium mb-6">Vous souhaitez devenir partenaire de C.L.E.A.N. ?</p>
              <a href="#contact" className="inline-block bg-primary hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300">
                Contactez-nous
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;