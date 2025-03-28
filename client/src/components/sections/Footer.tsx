import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">C.L.E.A.N.</h3>
            <p className="mb-4">Association de Conservation de l'Eau À Nantes - Créée le 4 avril 2022</p>
            <p>Ensemble, préservons nos rivières et notre environnement.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-gray-300 transition-colors duration-300">À propos</a></li>
              <li><a href="#activities" className="hover:text-gray-300 transition-colors duration-300">Nos activités</a></li>
              <li><a href="#events" className="hover:text-gray-300 transition-colors duration-300">Événements</a></li>
              <li><a href="#contact" className="hover:text-gray-300 transition-colors duration-300">Contact</a></li>
              <li><a href="#support" className="hover:text-gray-300 transition-colors duration-300">Nous soutenir</a></li>
              <li><Link href="/admin/login" className="hover:text-gray-300 transition-colors duration-300">Admin</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <p>Inscrivez-vous à notre newsletter pour suivre nos actualités.</p>
          </div>
        </div>
        
        <div className="border-t border-blue-700 mt-8 pt-8 text-center">
          <p>© {currentYear} C.L.E.A.N. - Conservation de l'Eau À Nantes. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
