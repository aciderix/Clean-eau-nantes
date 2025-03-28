import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Activity } from '@/lib/content';

interface ActivitiesSectionProps {
  activities: Activity[];
}

export default function ActivitiesSection({ activities }: ActivitiesSectionProps) {
  return (
    <section id="activities" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">Nos activités phares</h2>
        
        <div className="space-y-12">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ActivityCardProps {
  activity: Activity;
}

function ActivityCard({ activity }: ActivityCardProps) {
  const { observedRef, isVisible } = useIntersectionObserver();
  
  return (
    <div 
      ref={observedRef}
      className={`activity-card transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div 
        className={`md:w-2/5 h-64 md:h-auto overflow-hidden ${
          activity.imageRight ? 'md:order-last' : ''
        }`}
      >
        <img 
          src={activity.image} 
          alt={activity.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-8 md:w-3/5">
        <h3 className="text-2xl font-bold text-primary mb-4">{activity.title}</h3>
        <p 
          className="text-gray-600 mb-4"
          dangerouslySetInnerHTML={{ __html: activity.description }}
        ></p>
        <a 
          href={activity.linkUrl} 
          className="inline-block text-secondary font-semibold hover:text-green-500 group"
        >
          {activity.linkText}
          <span className="ml-1 transition-transform duration-300 inline-block group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
}
