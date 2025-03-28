import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Approach } from '@/lib/content';

interface ApproachSectionProps {
  approaches: Approach[];
}

export default function ApproachSection({ approaches }: ApproachSectionProps) {
  return (
    <section id="approach" className="py-24 bg-gradient-to-b from-gray-bg to-light-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">Notre Approche : Agir à Tous les Niveaux</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {approaches.map((approach, index) => (
            <ApproachCard key={approach.id} approach={approach} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ApproachCardProps {
  approach: Approach;
  index: number;
}

function ApproachCard({ approach, index }: ApproachCardProps) {
  const { observedRef, isVisible } = useIntersectionObserver();
  
  return (
    <div 
      ref={observedRef}
      className={`mission-card transition-all duration-1000 delay-${index % 3 * 100} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="text-4xl text-green-500 mb-5">{approach.icon}</div>
      <h3 className="text-xl font-bold text-primary mb-4">{approach.title}</h3>
      <p className="text-gray-600">{approach.description}</p>
    </div>
  );
}
