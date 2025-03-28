import React from 'react';
import SectionTitle from './SectionTitle';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver.tsx';
import { useQuery } from '@tanstack/react-query';
import { getAboutContent } from '@/lib/api';

const About: React.FC = () => {
  const [textRef, isTextVisible] = useIntersectionObserver<HTMLDivElement>();
  const [imageRef, isImageVisible] = useIntersectionObserver<HTMLDivElement>();
  
  // Fetch about content from API
  const { data: aboutContent, isLoading } = useQuery({
    queryKey: ['/api/about-content'],
  });
  
  // Function to render HTML content safely
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };
  
  return (
    <section id="about" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle title="À propos de nous" />
        
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div 
            ref={textRef}
            className={`w-full md:w-1/2 ${isTextVisible ? 'show-element' : 'hidden-element'}`}
          >
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-semibold text-dark-blue mb-6">
                  {aboutContent?.title || "Qui sommes-nous ?"}
                </h3>
                <div dangerouslySetInnerHTML={createMarkup(aboutContent?.content || "")} />
              </>
            )}
          </div>
          
          <div 
            ref={imageRef}
            className={`w-full md:w-1/2 ${isImageVisible ? 'show-element' : 'hidden-element'}`}
          >
            <div className="rounded-lg overflow-hidden shadow-xl transition-all duration-500 hover:scale-105">
              <img 
                src={aboutContent?.image || "/rive.jpeg"} 
                alt="Vue d'une rivière nantaise" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
