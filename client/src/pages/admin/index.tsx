import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminIndex: React.FC = () => {
  const [, setLocation] = useLocation();
  
  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      // In a real app, we would check for auth token validity
      const authToken = localStorage.getItem('authToken');
      
      if (authToken) {
        setLocation('/admin/dashboard');
      }
    };
    
    checkAuth();
  }, [setLocation]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">C.L.E.A.N Admin</CardTitle>
          <CardDescription className="text-center">
            Interface d'administration du site C.L.E.A.N.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            Cette zone est réservée aux administrateurs. Veuillez vous connecter pour continuer.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            className="bg-primary hover:bg-dark-blue transition-colors"
            onClick={() => setLocation('/admin/login')}
          >
            Se connecter
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminIndex;
