import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'wouter';
import { apiRequest } from '@/lib/queryClient';
import { ChevronLeft, Trash2, Clock, Mail, ArrowUpDown, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';

// Composants Shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsletterSubscription {
  id: number;
  email: string;
  createdAt: string;
}

const SubscribersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date_asc' | 'date_desc' | 'email_asc' | 'email_desc'>('date_desc');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Requête pour récupérer les abonnés
  const { data: subscribers = [] as NewsletterSubscription[], isLoading, error } = useQuery({
    queryKey: ['/api/newsletter-subscriptions'],
    enabled: true,
  });
  
  // Mutation pour supprimer un abonné
  const deleteSubscriptionMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/newsletter-subscriptions/${id}`, {
      method: 'DELETE',
    } as RequestInit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/newsletter-subscriptions'] });
      toast({
        title: "Abonné supprimé",
        description: "L'abonné a été supprimé avec succès.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la suppression de l'abonné.",
        variant: "destructive",
      });
    }
  });
  
  // Fonction pour filtrer les abonnés
  const filteredSubscribers = React.useMemo(() => {
    return subscribers.filter(subscriber => 
      subscriber.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [subscribers, searchQuery]);
  
  // Fonction pour trier les abonnés
  const sortedSubscribers = React.useMemo(() => {
    return [...filteredSubscribers].sort((a, b) => {
      if (sortBy === 'date_asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === 'date_desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'email_asc') {
        return a.email.localeCompare(b.email);
      }
      if (sortBy === 'email_desc') {
        return b.email.localeCompare(a.email);
      }
      return 0;
    });
  }, [filteredSubscribers, sortBy]);
  
  // Fonction pour alterner le tri
  const toggleSort = (field: 'date' | 'email') => {
    if (field === 'date') {
      setSortBy(sortBy === 'date_asc' ? 'date_desc' : 'date_asc');
    } else if (field === 'email') {
      setSortBy(sortBy === 'email_asc' ? 'email_desc' : 'email_asc');
    }
  };
  
  // Afficher un message d'erreur si nécessaire
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Link href="/admin">
          <Button variant="outline" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Retour
          </Button>
        </Link>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Une erreur s'est produite lors du chargement des abonnés.
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link href="/admin">
        <Button variant="outline" className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
      </Link>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Gestion des abonnés à la newsletter</CardTitle>
          <CardDescription>
            Gérez les emails des personnes inscrites à votre newsletter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Barre de recherche */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Rechercher un email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          {isLoading ? (
            // Affichage du chargement
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : sortedSubscribers.length === 0 ? (
            // Aucun résultat
            <div className="text-center py-8 text-gray-500">
              {subscribers.length === 0 
                ? "Aucun abonné à la newsletter pour le moment." 
                : "Aucun résultat ne correspond à votre recherche."}
            </div>
          ) : (
            // Tableau des abonnés
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[240px]">
                      <button 
                        className="flex items-center font-medium text-left"
                        onClick={() => toggleSort('email')}
                      >
                        Email <ArrowUpDown className="ml-1 h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button 
                        className="flex items-center font-medium text-left"
                        onClick={() => toggleSort('date')}
                      >
                        Date d'inscription <ArrowUpDown className="ml-1 h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell className="font-medium flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-gray-500" /> 
                        {subscriber.email}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-gray-500">
                          <Clock className="mr-2 h-4 w-4" /> 
                          <span title={format(new Date(subscriber.createdAt), 'PPP', { locale: fr })}>
                            Il y a {formatDistanceToNow(new Date(subscriber.createdAt), { addSuffix: false, locale: fr })}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                              <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer cet abonné ? Cette action est irréversible.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => deleteSubscriptionMutation.mutate(subscriber.id)}
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            {isLoading ? (
              <Skeleton className="h-4 w-[200px]" />
            ) : (
              `${sortedSubscribers.length} abonné${sortedSubscribers.length > 1 ? 's' : ''} trouvé${sortedSubscribers.length > 1 ? 's' : ''}`
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscribersPage;