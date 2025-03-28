import { useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Contact } from '@/lib/content';
import { submitContactForm } from '@/lib/content';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

interface ContactSectionProps {
  contact?: Contact;
}

export default function ContactSection({ contact }: ContactSectionProps) {
  const { observedRef: textRef, isVisible: textVisible } = useIntersectionObserver();
  const { observedRef: formRef, isVisible: formVisible } = useIntersectionObserver();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitContactForm(formData);
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!contact) {
    return null;
  }
  
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-bg to-light-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">Contactez-nous</h2>
        
        <div className="flex flex-wrap gap-10">
          <div 
            ref={textRef}
            className={`flex-1 min-w-[300px] transition-all duration-1000 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h3 className="text-2xl font-bold text-dark-blue mb-5">Restons en contact</h3>
            <p className="mb-8 text-gray-600">
              Vous avez des questions, des suggestions ou vous souhaitez participer à nos actions ? 
              N'hésitez pas à nous contacter. Notre équipe sera ravie d'échanger avec vous sur nos 
              projets et de vous accueillir dans notre communauté.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <i className="fas fa-envelope w-8 text-primary text-xl"></i>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-600">{contact.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt w-8 text-primary text-xl"></i>
                <div>
                  <h4 className="font-semibold">Adresse</h4>
                  <p className="text-gray-600">{contact.address}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <i className="fas fa-clock w-8 text-primary text-xl"></i>
                <div>
                  <h4 className="font-semibold">Réunions</h4>
                  <p className="text-gray-600">{contact.meetingInfo}</p>
                </div>
              </div>
              
              <div className="mt-8 flex space-x-4">
                {contact.facebook && (
                  <a 
                    href={contact.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-dark-blue transition-colors duration-300"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                )}
                
                {contact.instagram && (
                  <a 
                    href={contact.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-dark-blue transition-colors duration-300"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                )}
                
                {contact.linkedin && (
                  <a 
                    href={contact.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-dark-blue transition-colors duration-300"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <div 
            ref={formRef}
            className={`flex-1 min-w-[300px] transition-all duration-1000 delay-300 ${
              formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-6">
                <Label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nom</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Votre nom"
                  required
                />
              </div>
              
              <div className="mb-6">
                <Label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Votre email"
                  required
                />
              </div>
              
              <div className="mb-6">
                <Label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Sujet</Label>
                <select 
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Sélectionner un sujet</option>
                  <option value="Devenir bénévole">Devenir bénévole</option>
                  <option value="Proposition de partenariat">Proposition de partenariat</option>
                  <option value="Organiser un événement">Organiser un événement</option>
                  <option value="Demande d'information">Demande d'information</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              
              <div className="mb-6">
                <Label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Votre message"
                  required
                />
              </div>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-dark-blue text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  "Envoyer"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
