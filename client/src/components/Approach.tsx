import React from 'react';
import SectionTitle from './SectionTitle';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver.tsx';
import { useQuery } from '@tanstack/react-query';

const ApproachCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>();
  
  return (
    <div 
      ref={ref}
      className={`bg-white p-8 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-primary before:transition-all hover:before:w-2 ${
        isVisible ? 'show-element' : 'hidden-element'
      }`}
      style={{ transitionDelay: `${delay * 0.1}s` }}
    >
      <div className="text-4xl mb-6 text-nature-green">{icon}</div>
      <h3 className="text-xl font-semibold mb-4 text-primary">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Approach: React.FC = () => {
  // Fetch approach items from API avec URL absolue
  const { data: approachItems, isLoading, error } = useQuery({
    queryKey: ['/api/approach-items'],
    queryFn: async () => {
      const response = await fetch('https://clean-eau-nantes.onrender.com/api/approach-items');
      if (!response.ok) {
        throw new Error('Échec de chargement des données');
      }
      return response.json();
    }
  });
  
  console.log('approachItems:', approachItems);
  console.log('isLoading:', isLoading);
  console.log('error:', error);
  
  return (
    <section id="approach" className="py-24 px-4 bg-gradient-to-b from-gray-50 to-light-green">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle title="Notre Approche : Agir à Tous les Niveaux" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md animate-pulse">
                <div className="w-12 h-12 rounded-full bg-gray-200 mb-6"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))
          ) : error ? (
            // Affichage des erreurs
            <div className="col-span-3 text-center text-red-500">
              Une erreur est survenue lors du chargement des données
            </div>
          ) : (
            // Actual content
            approachItems?.map((item: any, index: number) => (
              <ApproachCard
                key={item.id}
                icon={item.icon}
                title={item.title}
                description={item.description}
                delay={index}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Approach;
