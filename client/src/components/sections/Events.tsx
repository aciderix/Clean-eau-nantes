import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Event } from '@/lib/content';

interface EventsSectionProps {
  events: Event[];
}

export default function EventsSection({ events }: EventsSectionProps) {
  const { observedRef, isVisible } = useIntersectionObserver();
  
  return (
    <section id="events" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">Événements à venir</h2>
        
        <div 
          ref={observedRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface EventCardProps {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  const { observedRef, isVisible } = useIntersectionObserver();
  
  return (
    <div 
      ref={observedRef}
      className={`event-card transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="p-6">
        <h4 className="text-sm font-semibold text-gray-500 mb-2">{event.dateText}</h4>
        <h3 className="text-xl font-bold text-primary mb-3">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <a 
          href={event.linkUrl} 
          className="inline-block text-secondary font-semibold hover:text-green-500 group"
        >
          {event.linkText}
          <span className="ml-1 transition-transform duration-300 inline-block group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
}
