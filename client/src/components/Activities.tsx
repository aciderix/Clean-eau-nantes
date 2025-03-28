import React from 'react';
import SectionTitle from './SectionTitle';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver.tsx';
import { useQuery } from '@tanstack/react-query';
import { getActivities } from '@/lib/api';

const ActivityCard: React.FC<{
  image: string;
  title: string;
  description: string;
  actionText: string;
  actionLink: string;
  imagePosition: string;
  delay: number;
}> = ({ image, title, description, actionText, actionLink, imagePosition, delay }) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>();
  
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };
  
  return (
    <div 
      ref={ref}
      className={`flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden ${
        isVisible ? 'show-element' : 'hidden-element'
      }`}
      style={{ transitionDelay: `${delay * 0.1}s` }}
    >
      <div className={`w-full md:w-2/5 h-64 md:h-auto ${imagePosition === 'right' ? 'md:order-2' : ''}`}>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className={`w-full md:w-3/5 p-8 ${imagePosition === 'right' ? 'md:order-1' : ''}`}>
        <h3 className="text-2xl font-semibold mb-4 text-primary">{title}</h3>
        <p 
          className="text-gray-600 mb-6"
          dangerouslySetInnerHTML={createMarkup(description)}
        ></p>
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

const Activities: React.FC = () => {
  // Fetch activities from API
  const { data: activities, isLoading } = useQuery({
    queryKey: ['/api/activities'],
  });
  
  return (
    <section id="activities" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle title="Nos activités phares" />
        
        <div className="space-y-16">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="w-full md:w-2/5 h-64 md:h-auto bg-gray-200"></div>
                <div className="w-full md:w-3/5 p-8">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-6 w-2/3"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))
          ) : (
            // Actual content
            activities?.map((activity, index) => (
              <ActivityCard
                key={activity.id}
                image={activity.image}
                title={activity.title}
                description={activity.description}
                actionText={activity.actionText}
                actionLink={activity.actionLink}
                imagePosition={activity.imagePosition}
                delay={index}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Activities;
