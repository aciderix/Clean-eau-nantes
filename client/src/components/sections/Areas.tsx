import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Area } from '@/lib/content';

interface AreasSectionProps {
  areas: Area[];
}

export default function AreasSection({ areas }: AreasSectionProps) {
  return (
    <section id="areas" className="py-24 bg-gradient-to-b from-gray-bg to-light-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">Zones d'intervention</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {areas.map((area, index) => (
            <AreaCard key={area.id} area={area} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface AreaCardProps {
  area: Area;
  index: number;
}

function AreaCard({ area, index }: AreaCardProps) {
  const { observedRef, isVisible } = useIntersectionObserver();
  
  return (
    <div 
      ref={observedRef}
      className={`area-card transition-all duration-1000 delay-${index % 2 * 100} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="flex items-center mb-5">
        <div className="w-12 h-12 bg-light-blue rounded-full flex items-center justify-center mr-4 text-2xl text-primary">
          {area.icon}
        </div>
        <h3 className="text-xl font-bold text-primary">{area.title}</h3>
      </div>
      <p className="text-gray-600">
        {area.description}
      </p>
    </div>
  );
}
