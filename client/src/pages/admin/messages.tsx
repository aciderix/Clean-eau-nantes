import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'wouter';
import { apiRequest } from '@/lib/queryClient';
import { ChevronLeft, Trash2, Clock, MessageSquare, ArrowUpDown, Search, User, Mail, Phone, Check, X, Eye } from 'lucide-react';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'read' | 'replied';
  createdAt: string;
}

const MessagesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date_asc' | 'date_desc' | 'name_asc' | 'name_desc'>('date_desc');
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'read' | 'replied'>('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Requête pour récupérer les messages
  const { data: messages = [], isLoading, error } = useQuery({
    queryKey: ['/api/contact-submissions'],
    enabled: true,
  });
  
  // Mutation pour supprimer un message
  const deleteMessageMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/contact-submissions/${id}`, {
      method: 'DELETE',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-submissions'] });
      toast({
        title: "Message supprimé",
        description: "Le message a été supprimé avec succès.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la suppression du message.",
        variant: "destructive",
      });
    }
  });
  
  // Mutation pour marquer un message comme lu
  const markAsReadMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/contact-submissions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'read' }),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-submissions'] });
      toast({
        title: "Message marqué comme lu",
        description: "Le statut du message a été mis à jour.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la mise à jour du statut.",
        variant: "destructive",
      });
    }
  });
  
  // Mutation pour marquer un message comme répondu
  const markAsRepliedMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/contact-submissions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'replied' }),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-submissions'] });
      toast({
        title: "Message marqué comme répondu",
        description: "Le statut du message a été mis à jour.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la mise à jour du statut.",
        variant: "destructive",
      });
    }
  });
  
  // Fonction pour obtenir le badge de statut
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Non lu</Badge>;
      case 'read':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600">Lu</Badge>;
      case 'replied':
        return <Badge variant="outline" className="bg-green-50 text-green-600">Répondu</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };
  
  // Fonction pour filtrer les messages par statut
  const getFilteredMessages = () => {
    const allMessages = messages as ContactSubmission[];
    if (activeTab === 'all') {
      return allMessages;
    }
    return allMessages.filter(message => message.status === activeTab);
  };
  
  // Fonction pour filtrer les messages par texte de recherche
  const filteredMessages = React.useMemo(() => {
    const statusFiltered = getFilteredMessages();
    return statusFiltered.filter(message => 
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [messages, searchQuery, activeTab]);
  
  // Fonction pour trier les messages
  const sortedMessages = React.useMemo(() => {
    return [...filteredMessages].sort((a, b) => {
      if (sortBy === 'date_asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === 'date_desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'name_asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'name_desc') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  }, [filteredMessages, sortBy]);
  
  // Fonction pour alterner le tri
  const toggleSort = (field: 'date' | 'name') => {
    if (field === 'date') {
      setSortBy(sortBy === 'date_asc' ? 'date_desc' : 'date_asc');
    } else if (field === 'name') {
      setSortBy(sortBy === 'name_asc' ? 'name_desc' : 'name_asc');
    }
  };
  
  // Comptage des messages par statut
  const countByStatus = React.useMemo(() => {
    const allMessages = messages as ContactSubmission[];
    return {
      all: allMessages.length,
      pending: allMessages.filter(m => m.status === 'pending').length,
      read: allMessages.filter(m => m.status === 'read').length,
      replied: allMessages.filter(m => m.status === 'replied').length,
    };
  }, [messages]);
  
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
          Une erreur s'est produite lors du chargement des messages.
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <Link href="/admin">
        <Button variant="outline" className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
      </Link>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Gestion des messages</CardTitle>
          <CardDescription>
            Consultez et gérez les messages reçus via le formulaire de contact.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Tabs de filtrage par statut */}
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as any)}
            className="mb-4"
          >
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">
                Tous ({isLoading ? '...' : countByStatus.all})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Non lus ({isLoading ? '...' : countByStatus.pending})
              </TabsTrigger>
              <TabsTrigger value="read">
                Lus ({isLoading ? '...' : countByStatus.read})
              </TabsTrigger>
              <TabsTrigger value="replied">
                Répondus ({isLoading ? '...' : countByStatus.replied})
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Barre de recherche */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Rechercher par nom, email ou contenu..."
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
          ) : sortedMessages.length === 0 ? (
            // Aucun résultat
            <div className="text-center py-8 text-gray-500">
              {(messages as ContactSubmission[]).length === 0 
                ? "Aucun message reçu pour le moment." 
                : "Aucun résultat ne correspond à votre recherche ou au filtre sélectionné."}
            </div>
          ) : (
            // Tableau des messages
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">
                      <button 
                        className="flex items-center font-medium text-left"
                        onClick={() => toggleSort('name')}
                      >
                        Expéditeur <ArrowUpDown className="ml-1 h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead className="w-[280px]">Contact</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="w-[100px]">
                      <button 
                        className="flex items-center font-medium text-left"
                        onClick={() => toggleSort('date')}
                      >
                        Date <ArrowUpDown className="ml-1 h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead className="w-[100px]">Statut</TableHead>
                    <TableHead className="text-right w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedMessages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="font-medium truncate">
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-gray-500" /> 
                          {message.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="mr-1 h-3 w-3 text-gray-400" /> 
                            <span className="truncate">{message.email}</span>
                          </div>
                          {message.phone && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="mr-1 h-3 w-3 text-gray-400" /> 
                              <span>{message.phone}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="truncate max-w-xs">
                          {message.message.substring(0, 60)}{message.message.length > 60 ? '...' : ''}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-gray-500 whitespace-nowrap">
                          <Clock className="mr-1 h-3 w-3" /> 
                          <span title={format(new Date(message.createdAt), 'PPP', { locale: fr })}>
                            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: false, locale: fr })}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(message.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          {/* Voir le message complet */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-blue-500">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg">
                              <DialogHeader>
                                <DialogTitle>Message de {message.name}</DialogTitle>
                                <DialogDescription>
                                  Reçu le {format(new Date(message.createdAt), 'PPP à HH:mm', { locale: fr })}
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-4 my-4">
                                <div className="space-y-1">
                                  <div className="text-sm font-medium">Coordonnées:</div>
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                      <Mail className="mr-1 h-4 w-4 text-gray-500" /> 
                                      <span>{message.email}</span>
                                    </div>
                                    {message.phone && (
                                      <div className="flex items-center">
                                        <Phone className="mr-1 h-4 w-4 text-gray-500" /> 
                                        <span>{message.phone}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="space-y-1">
                                  <div className="text-sm font-medium">Message:</div>
                                  <div className="bg-gray-50 p-3 rounded-md whitespace-pre-wrap">
                                    {message.message}
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <div className="text-sm font-medium">Statut:</div>
                                  {getStatusBadge(message.status)}
                                </div>
                              </div>
                              
                              <DialogFooter className="flex justify-between items-center">
                                <div className="flex space-x-2">
                                  {message.status === 'pending' && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => markAsReadMutation.mutate(message.id)}
                                      className="text-blue-600"
                                    >
                                      <Check className="mr-1 h-4 w-4" /> Marquer comme lu
                                    </Button>
                                  )}
                                  {(message.status === 'pending' || message.status === 'read') && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => markAsRepliedMutation.mutate(message.id)}
                                      className="text-green-600"
                                    >
                                      <Check className="mr-1 h-4 w-4" /> Marquer comme répondu
                                    </Button>
                                  )}
                                </div>
                                <Button variant="default">
                                  Fermer
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          
                          {/* Marquer comme lu (pour les messages non lus) */}
                          {message.status === 'pending' && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-blue-500"
                              onClick={() => markAsReadMutation.mutate(message.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          
                          {/* Marquer comme répondu (pour les messages non répondus) */}
                          {(message.status === 'pending' || message.status === 'read') && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-green-500"
                              onClick={() => markAsRepliedMutation.mutate(message.id)}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          )}
                          
                          {/* Supprimer le message */}
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
                                  Êtes-vous sûr de vouloir supprimer ce message ? Cette action est irréversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction 
                                  className="bg-red-600 hover:bg-red-700"
                                  onClick={() => deleteMessageMutation.mutate(message.id)}
                                >
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
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
              `${sortedMessages.length} message${sortedMessages.length > 1 ? 's' : ''} trouvé${sortedMessages.length > 1 ? 's' : ''}`
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MessagesPage;