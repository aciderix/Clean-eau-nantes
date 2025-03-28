import React from 'react';
import SectionTitle from './SectionTitle';

const Support: React.FC = () => {
  return (
    <section id="support" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Soutenez notre action" />
        
        <div className="flex flex-col md:flex-row gap-8 mt-12">
          <div className="w-full md:w-3/5 order-2 md:order-1 animation-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-primary">Votre soutien est essentiel</h3>
            <p className="mb-6 text-gray-700">
              Votre soutien est précieux pour nous permettre de poursuivre et développer nos actions sur l'Erdre et la Loire. 
              Vous pouvez contribuer de différentes manières :
            </p>
            
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-3 text-primary">Faire un don</h4>
              <p className="mb-4 text-gray-700">
                Votre don financier, même modeste, nous aide concrètement à financer l'achat de matériel pour les collectes 
                et le déploiement du projet BADS (bacs à déchets). Vous pouvez faire un don en ligne via la plateforme HelloAsso, 
                partenaire solidaire des associations :
              </p>
              <a 
                href="https://www.helloasso.com/associations/clean-conservation-de-l-eau-a-nantes/formulaires/1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-accent hover:bg-primary text-white font-medium rounded-md transition-colors duration-300"
              >
                Faire un don sur HelloAsso
              </a>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-3 text-primary">Devenir bénévole</h4>
              <p className="mb-4 text-gray-700">
                Rejoignez notre équipe sur le terrain ! Nous avons besoin de bénévoles pour nos collectes de déchets sur l'Erdre 
                et la Loire, les Éco-Navigations, et pour nous aider à entretenir les BADS. Chaque contribution compte, quelle que 
                soit sa forme. Contactez-nous pour connaître les prochaines opportunités de bénévolat.
              </p>
              <a 
                href="#contact" 
                className="inline-block px-6 py-3 bg-primary hover:bg-accent text-white font-medium rounded-md transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Devenir bénévole
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-2/5 order-1 md:order-2 animation-fade-in">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/images/visuel-clean.png" 
                alt="Soutenez C.L.E.A.N."
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;