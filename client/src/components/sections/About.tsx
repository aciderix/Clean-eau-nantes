import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Section } from '@/lib/content';

interface AboutProps {
  data?: Section;
}

export default function About({ data }: AboutProps) {
  const { observedRef: textRef, isVisible: textVisible } = useIntersectionObserver();
  const { observedRef: imageRef, isVisible: imageVisible } = useIntersectionObserver();
  
  if (!data) return null;

  const content = data.content as {
    subtitle: string;
    paragraphs: string[];
    image: string;
  };

  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">{data.title}</h2>
        
        <div className="flex flex-wrap items-center gap-10">
          <div 
            ref={textRef}
            className={`flex-1 min-w-[300px] transition-all duration-1000 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h3 className="text-2xl font-bold text-dark-blue mb-5">{content.subtitle}</h3>
            {content.paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          <div 
            ref={imageRef}
            className={`flex-1 min-w-[300px] rounded-lg overflow-hidden shadow-xl transition-all duration-1000 ${
              imageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <img 
              src={content.image} 
              alt="Vue d'une rivière nantaise" 
              className="w-full h-auto rounded-lg transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
