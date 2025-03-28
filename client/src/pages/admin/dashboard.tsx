import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  username: string;
  isAdmin: boolean;
}

const AdminDashboard: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  
  // Check if user is logged in
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (!authToken) {
      setLocation('/admin/login');
      return;
    }
    
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setLocation('/admin/login');
      }
    }
  }, [setLocation]);
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    toast({
      title: "Déconnecté",
      description: "Vous avez été déconnecté avec succès.",
      variant: "default",
    });
    
    setLocation('/admin/login');
  };
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Chargement...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Connecté en tant que {user.username}</span>
            <Button 
              variant="outline" 
              onClick={handleLogout}
            >
              Déconnexion
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Contenu du site</CardTitle>
              <CardDescription>Gérer et modifier le contenu du site web</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-primary hover:bg-dark-blue"
                onClick={() => setLocation('/admin/content')}
              >
                Gérer le contenu
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Messages reçus</CardTitle>
              <CardDescription>Voir les messages du formulaire de contact</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                onClick={() => setLocation('/admin/messages')}
              >
                Voir les messages
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Abonnés newsletter</CardTitle>
              <CardDescription>Gérer les abonnés à la newsletter</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                onClick={() => setLocation('/admin/subscribers')}
              >
                Gérer les abonnés
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => setLocation('/')}
          className="mb-8"
        >
          Voir le site
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
