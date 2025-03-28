import React from 'react';
import SectionTitle from './SectionTitle';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver.tsx';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '@/lib/api';

const EventCard: React.FC<{
  status: string;
  title: string;
  description: string;
  actionText: string;
  actionLink: string;
  image?: string;
  delay: number;
}> = ({ status, title, description, actionText, actionLink, image, delay }) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>();
  
  return (
    <div 
      ref={ref}
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
        isVisible ? 'show-element' : 'hidden-element'
      }`}
      style={{ transitionDelay: `${delay * 0.1}s` }}
    >
      {image && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="bg-light-blue p-4">
        <h4 className="text-lg text-gray-600">{status}</h4>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-primary">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <a 
          href={actionLink} 
          className="text-secondary font-semibold inline-flex items-center transition-all hover:text-nature-green group"
        >
          {actionText}
          <span className="ml-1 transform transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
};

const Events: React.FC = () => {
  // Fetch events from API
  const { data: events, isLoading } = useQuery({
    queryKey: ['/api/events'],
  });
  
  return (
    <section id="events" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle title="Événements à venir" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="bg-gray-200 p-4">
                  <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                </div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-6 w-2/3"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))
          ) : (
            // Actual content
            events?.map((event, index) => (
              <EventCard
                key={event.id}
                status={event.status}
                title={event.title}
                description={event.description}
                actionText={event.actionText}
                actionLink={event.actionLink}
                image={event.image}
                delay={index}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Events;
