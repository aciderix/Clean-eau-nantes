import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { subscribeToNewsletter } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  
  // Handle newsletter subscription
  const subscribeMutation = useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: () => {
      toast({
        title: "Inscription réussie",
        description: "Vous êtes maintenant inscrit à notre newsletter.",
        variant: "default",
      });
      setEmail('');
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de votre inscription. Veuillez réessayer plus tard.",
        variant: "destructive",
      });
    }
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribeMutation.mutate(email);
  };
  
  return (
    <footer className="bg-[#003366] text-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="flex flex-col items-start">
              <img src="/images/Clean-logo-blanc.png" alt="C.L.E.A.N. Logo" className="h-12 w-auto mb-4" />
              <p className="mb-6 text-gray-300">Conservation de l'Eau À Nantes</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <h3 className="text-xl font-bold mb-6">Liens rapides</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300">À propos</a></li>
              <li><a href="#mission" className="text-gray-300 hover:text-white transition-colors duration-300">Nos missions</a></li>
              <li><a href="#activities" className="text-gray-300 hover:text-white transition-colors duration-300">Nos activités</a></li>
              <li><a href="#events" className="text-gray-300 hover:text-white transition-colors duration-300">Événements</a></li>
              <li><a href="#support" className="text-gray-300 hover:text-white transition-colors duration-300">Nous soutenir</a></li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="mt-1 mr-3 text-blue-400" size={18} />
                <span className="text-gray-300">contact@clean-nantes.org</span>
              </li>
              <li className="flex items-start">
                <Phone className="mt-1 mr-3 text-blue-400" size={18} />
                <span className="text-gray-300">+33 (0)6 XX XX XX XX</span>
              </li>
              <li className="flex items-start">
                <MapPin className="mt-1 mr-3 text-blue-400" size={18} />
                <span className="text-gray-300">Nantes, France</span>
              </li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="mb-6 text-gray-300">Inscrivez-vous pour recevoir nos actualités</p>
            <form onSubmit={handleSubmit} className="flex">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="px-4 py-2 w-full rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-accent px-6 py-2 rounded-r-lg text-white font-semibold transition-colors duration-300"
                disabled={subscribeMutation.isPending}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} C.L.E.A.N. - Conservation de l'Eau À Nantes. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
