import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver.tsx';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getContactInfo, submitContactForm } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const [infoRef, isInfoVisible] = useIntersectionObserver<HTMLDivElement>();
  const [formRef, isFormVisible] = useIntersectionObserver<HTMLDivElement>();
  const { toast } = useToast();
  
  // Fetch contact info from API
  const { data: contactInfo } = useQuery({
    queryKey: ['/api/contact-info'],
  });
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Handle form submission
  const submitMutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      toast({
        title: "Message envoyé",
        description: "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
        variant: "default",
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer plus tard.",
        variant: "destructive",
      });
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };
  
  return (
    <section id="contact" className="py-24 px-4 bg-gradient-to-b from-gray-50 to-light-green">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle title="Contactez-nous" />
        
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
            <div 
              ref={infoRef}
              className={`p-8 bg-white rounded-lg shadow-md ${isInfoVisible ? 'show-element' : 'hidden-element'}`}
            >
              <h3 className="text-2xl font-semibold mb-6 text-dark-blue">Prenons contact</h3>
              <p className="mb-8 text-gray-600">Vous souhaitez en savoir plus sur nos actions, participer à nos événements ou proposer un partenariat ? N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais.</p>
              
              <div className="flex items-start mb-6">
                <div className="w-10 h-10 flex-shrink-0 bg-light-blue rounded-full flex items-center justify-center text-primary mr-4">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Email</h4>
                  <p className="text-gray-600">{contactInfo?.email || 'contact@clean-nantes.org'}</p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="w-10 h-10 flex-shrink-0 bg-light-blue rounded-full flex items-center justify-center text-primary mr-4">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Téléphone</h4>
                  <p className="text-gray-600">{contactInfo?.phone || '+33 (0)6 XX XX XX XX'}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 flex-shrink-0 bg-light-blue rounded-full flex items-center justify-center text-primary mr-4">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Adresse</h4>
                  <p className="text-gray-600">{contactInfo?.address || 'Nantes, France'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 px-4">
            <div 
              ref={formRef}
              className={`p-8 bg-white rounded-lg shadow-md ${isFormVisible ? 'show-element' : 'hidden-element'}`}
            >
              <h3 className="text-2xl font-semibold mb-6 text-dark-blue">Envoyez-nous un message</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nom</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                    placeholder="Votre nom" 
                    required 
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                    placeholder="Votre email" 
                    required 
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Sujet</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                    placeholder="Sujet de votre message" 
                    required 
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                    placeholder="Votre message" 
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-dark-blue text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? 'Envoi en cours...' : 'Envoyer'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
