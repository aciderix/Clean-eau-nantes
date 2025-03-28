import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

const AdminLogin: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async () => {
      try {
        return await apiRequest('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password
          }),
        });
      } catch (error) {
        console.error('Erreur de connexion:', error);
        throw new Error('Identifiants invalides');
      }
    },
    onSuccess: (data) => {
      // In a real app, we would set a proper auth token
      localStorage.setItem('authToken', 'some-token');
      localStorage.setItem('user', JSON.stringify(data));
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'interface d'administration.",
        variant: "default",
      });
      
      setLocation('/admin/dashboard');
    },
    onError: () => {
      toast({
        title: "Erreur de connexion",
        description: "Identifiants invalides. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Connexion Admin</CardTitle>
          <CardDescription className="text-center">
            Veuillez vous connecter pour accéder à l'interface d'administration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input 
                id="username" 
                name="username" 
                placeholder="Entrez votre nom d'utilisateur" 
                value={credentials.username}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="Entrez votre mot de passe" 
                value={credentials.password}
                onChange={handleInputChange}
                required 
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-dark-blue transition-colors"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            variant="link" 
            onClick={() => setLocation('/')}
          >
            Retour au site
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
