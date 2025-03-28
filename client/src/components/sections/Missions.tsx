import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Mission } from '@/lib/content';

interface MissionsSectionProps {
  missions: Mission[];
}

export default function MissionsSection({ missions }: MissionsSectionProps) {
  return (
    <section id="mission" className="py-24 bg-gradient-to-b from-gray-bg to-light-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">Nos missions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missions.map((mission, index) => (
            <MissionCard key={mission.id} mission={mission} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface MissionCardProps {
  mission: Mission;
  index: number;
}

function MissionCard({ mission, index }: MissionCardProps) {
  const { observedRef, isVisible } = useIntersectionObserver();
  
  return (
    <div 
      ref={observedRef}
      className={`mission-card transition-all duration-1000 delay-${index * 100} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="text-4xl text-green-500 mb-5">{mission.icon}</div>
      <h3 className="text-xl font-bold text-primary mb-4">{mission.title}</h3>
      <p className="text-gray-600">{mission.description}</p>
    </div>
  );
}
