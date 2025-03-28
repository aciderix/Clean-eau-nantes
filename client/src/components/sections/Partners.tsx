import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Partner } from '@/lib/content';

interface PartnersSectionProps {
  partners: Partner[];
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
  const { observedRef: gridRef, isVisible: gridVisible } = useIntersectionObserver();
  const { observedRef: textRef, isVisible: textVisible } = useIntersectionObserver();
  
  // If no partners, don't show the section
  if (!partners || partners.length === 0) return null;
  
  return (
    <section id="partners" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">Nos partenaires</h2>
        
        <div 
          ref={gridRef}
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center items-center transition-all duration-1000 ${
            gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {partners.map((partner) => (
            <PartnerLogo key={partner.id} partner={partner} />
          ))}
        </div>
        
        <div 
          ref={textRef}
          className={`mt-16 text-center transition-all duration-1000 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <p className="text-gray-600 mb-8">
            Vous souhaitez devenir partenaire ou soutenir nos actions ? 
            Contactez-nous pour discuter des possibilités de collaboration.
          </p>
          <a href="#contact" className="cta-button">
            Devenir partenaire
          </a>
        </div>
      </div>
    </section>
  );
}

interface PartnerLogoProps {
  partner: Partner;
}

function PartnerLogo({ partner }: PartnerLogoProps) {
  return (
    <div className="p-4 grayscale hover:grayscale-0 transition-all duration-300">
      {partner.website ? (
        <a href={partner.website} target="_blank" rel="noopener noreferrer">
          <img 
            src={partner.logo} 
            alt={`Logo ${partner.name}`} 
            className="max-h-16 w-auto"
          />
        </a>
      ) : (
        <img 
          src={partner.logo} 
          alt={`Logo ${partner.name}`} 
          className="max-h-16 w-auto"
        />
      )}
    </div>
  );
}
