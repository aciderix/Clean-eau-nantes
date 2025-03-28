import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { SupportOption } from '@/lib/content';

interface SupportSectionProps {
  supportOptions: SupportOption[];
}

export default function SupportSection({ supportOptions }: SupportSectionProps) {
  if (!supportOptions || supportOptions.length === 0) {
    return null;
  }
  
  return (
    <section id="support" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">Nous soutenir</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {supportOptions.map((option, index) => (
            <SupportCard key={option.id} option={option} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface SupportCardProps {
  option: SupportOption;
  index: number;
}

function SupportCard({ option, index }: SupportCardProps) {
  const { observedRef, isVisible } = useIntersectionObserver();
  
  return (
    <div 
      ref={observedRef}
      className={`support-card transition-all duration-1000 delay-${index * 100} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-light-blue rounded-full flex items-center justify-center text-3xl text-primary">
          <i className={option.icon}></i>
        </div>
      </div>
      <h3 className="text-xl font-bold text-primary mb-4 text-center">{option.title}</h3>
      <p className="text-gray-600 mb-6 text-center">
        {option.description}
      </p>
      <div className="text-center">
        <a 
          href={option.buttonUrl} 
          className="cta-button"
        >
          {option.buttonText}
        </a>
      </div>
    </div>
  );
}
