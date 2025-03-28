import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useToast } from "@/hooks/use-toast";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  getAboutContent, 
  updateAboutContent,
  getApproachItems,
  createApproachItem,
  updateApproachItem,
  deleteApproachItem,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getMissions,
  createMission,
  updateMission,
  deleteMission,
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  getAreas,
  createArea,
  updateArea,
  deleteArea,
  getPartners,
  createPartner,
  updatePartner,
  deletePartner
} from '@/lib/api';

const AdminContent: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Check if user is logged in
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    
    if (!authToken) {
      setLocation('/admin/login');
    }
  }, [setLocation]);
  
  // About Content Section
  const AboutContent = () => {
    const { data: aboutContent, isLoading } = useQuery({
      queryKey: ['/api/about-content'],
    });
    
    const [formData, setFormData] = useState({
      title: '',
      content: '',
      image: ''
    });
    
    // Update form data when query returns
    useEffect(() => {
      if (aboutContent) {
        setFormData({
          title: aboutContent.title,
          content: aboutContent.content,
          image: aboutContent.image
        });
      }
    }, [aboutContent]);
    
    const updateMutation = useMutation({
      mutationFn: updateAboutContent,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/about-content'] });
        toast({
          title: "Contenu mis à jour",
          description: "Le contenu 'À propos' a été mis à jour avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la mise à jour du contenu.",
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
      updateMutation.mutate(formData);
    };
    
    if (isLoading) {
      return <div className="p-4 text-center">Chargement du contenu...</div>;
    }
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>Section "À propos"</CardTitle>
          <CardDescription>Modifier le contenu de la section "À propos"</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Titre de la section"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Contenu (HTML)</Label>
              <Textarea 
                id="content" 
                name="content" 
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Contenu HTML de la section"
                rows={10}
                required
              />
              <p className="text-xs text-gray-500">
                Vous pouvez utiliser du HTML pour formater le texte (paragraphes, listes, gras, etc.)
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">URL de l'image</Label>
              <Input 
                id="image" 
                name="image" 
                value={formData.image}
                onChange={handleInputChange}
                placeholder="URL de l'image"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Mise à jour en cours..." : "Mettre à jour"}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  };
  
  // Approach Items Section
  const ApproachItems = () => {
    const { data: approachItems, isLoading } = useQuery({
      queryKey: ['/api/approach-items'],
    });
    
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    
    const [formData, setFormData] = useState({
      icon: '',
      title: '',
      description: '',
      order: 0
    });
    
    const resetForm = () => {
      setFormData({
        icon: '',
        title: '',
        description: '',
        order: approachItems ? approachItems.length + 1 : 1
      });
    };
    
    // Reset form when adding new item
    useEffect(() => {
      if (isAddDialogOpen) {
        resetForm();
      }
    }, [isAddDialogOpen, approachItems]);
    
    // Set form data when editing
    useEffect(() => {
      if (selectedItem) {
        setFormData({
          icon: selectedItem.icon,
          title: selectedItem.title,
          description: selectedItem.description,
          order: selectedItem.order
        });
      }
    }, [selectedItem]);
    
    const createMutation = useMutation({
      mutationFn: createApproachItem,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/approach-items'] });
        setIsAddDialogOpen(false);
        toast({
          title: "Item ajouté",
          description: "L'item d'approche a été ajouté avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de l'ajout de l'item.",
          variant: "destructive",
        });
      }
    });
    
    const updateMutation = useMutation({
      mutationFn: (data: any) => updateApproachItem(selectedItem.id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/approach-items'] });
        setIsEditDialogOpen(false);
        toast({
          title: "Item mis à jour",
          description: "L'item d'approche a été mis à jour avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la mise à jour de l'item.",
          variant: "destructive",
        });
      }
    });
    
    const deleteMutation = useMutation({
      mutationFn: () => deleteApproachItem(selectedItem.id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/approach-items'] });
        setIsDeleteDialogOpen(false);
        toast({
          title: "Item supprimé",
          description: "L'item d'approche a été supprimé avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la suppression de l'item.",
          variant: "destructive",
        });
      }
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ 
        ...prev, 
        [name]: name === 'order' ? parseInt(value) || 0 : value 
      }));
    };
    
    const handleAddSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createMutation.mutate(formData);
    };
    
    const handleEditSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      updateMutation.mutate(formData);
    };
    
    const handleDelete = () => {
      deleteMutation.mutate();
    };
    
    if (isLoading) {
      return <div className="p-4 text-center">Chargement des items...</div>;
    }
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Notre Approche</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Ajouter un item</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un nouvel item</DialogTitle>
                <DialogDescription>
                  Créez un nouvel item pour la section "Notre Approche".
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="icon">Icône (emoji)</Label>
                  <Input 
                    id="icon" 
                    name="icon" 
                    value={formData.icon}
                    onChange={handleInputChange}
                    placeholder="Exemple: 🛡️"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Titre de l'item"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description de l'item"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Ordre</Label>
                  <Input 
                    id="order" 
                    name="order" 
                    type="number"
                    value={formData.order}
                    onChange={handleInputChange}
                    placeholder="Ordre d'affichage"
                    required
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? "Ajout en cours..." : "Ajouter"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ordre</TableHead>
                  <TableHead>Icône</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approachItems?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.order}</TableCell>
                    <TableCell>{item.icon}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedItem(item);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          Modifier
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {
                            setSelectedItem(item);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {approachItems?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      Aucun item trouvé. Ajoutez-en un !
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier l'item</DialogTitle>
              <DialogDescription>
                Modifiez les informations de cet item.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-icon">Icône (emoji)</Label>
                <Input 
                  id="edit-icon" 
                  name="icon" 
                  value={formData.icon}
                  onChange={handleInputChange}
                  placeholder="Exemple: 🛡️"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-title">Titre</Label>
                <Input 
                  id="edit-title" 
                  name="title" 
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Titre de l'item"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description" 
                  name="description" 
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description de l'item"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-order">Ordre</Label>
                <Input 
                  id="edit-order" 
                  name="order" 
                  type="number"
                  value={formData.order}
                  onChange={handleInputChange}
                  placeholder="Ordre d'affichage"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "Mise à jour en cours..." : "Mettre à jour"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Cet item sera définitivement supprimé.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Suppression..." : "Supprimer"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };
  
  // Events Section
  const Events = () => {
    const { data: events, isLoading } = useQuery({
      queryKey: ['/api/events'],
    });
    
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    
    const [formData, setFormData] = useState({
      status: '',
      title: '',
      description: '',
      actionText: '',
      actionLink: '',
      order: 0
    });
    
    const resetForm = () => {
      setFormData({
        status: '',
        title: '',
        description: '',
        actionText: '',
        actionLink: '#contact',
        image: '',
        order: events ? events.length + 1 : 1
      });
    };
    
    // Reset form when adding new event
    useEffect(() => {
      if (isAddDialogOpen) {
        resetForm();
      }
    }, [isAddDialogOpen, events]);
    
    // Set form data when editing
    useEffect(() => {
      if (selectedEvent) {
        setFormData({
          status: selectedEvent.status,
          title: selectedEvent.title,
          description: selectedEvent.description,
          actionText: selectedEvent.actionText,
          actionLink: selectedEvent.actionLink,
          image: selectedEvent.image || '',
          order: selectedEvent.order
        });
      }
    }, [selectedEvent]);
    
    const createMutation = useMutation({
      mutationFn: createEvent,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/events'] });
        setIsAddDialogOpen(false);
        toast({
          title: "Événement ajouté",
          description: "L'événement a été ajouté avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de l'ajout de l'événement.",
          variant: "destructive",
        });
      }
    });
    
    const updateMutation = useMutation({
      mutationFn: (data: any) => updateEvent(selectedEvent.id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/events'] });
        setIsEditDialogOpen(false);
        toast({
          title: "Événement mis à jour",
          description: "L'événement a été mis à jour avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la mise à jour de l'événement.",
          variant: "destructive",
        });
      }
    });
    
    const deleteMutation = useMutation({
      mutationFn: () => deleteEvent(selectedEvent.id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/events'] });
        setIsDeleteDialogOpen(false);
        toast({
          title: "Événement supprimé",
          description: "L'événement a été supprimé avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la suppression de l'événement.",
          variant: "destructive",
        });
      }
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ 
        ...prev, 
        [name]: name === 'order' ? parseInt(value) || 0 : value 
      }));
    };
    
    const handleAddSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createMutation.mutate(formData);
    };
    
    const handleEditSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      updateMutation.mutate(formData);
    };
    
    const handleDelete = () => {
      deleteMutation.mutate();
    };
    
    if (isLoading) {
      return <div className="p-4 text-center">Chargement des événements...</div>;
    }
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Événements</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Ajouter un événement</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un nouvel événement</DialogTitle>
                <DialogDescription>
                  Créez un nouvel événement pour le site.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Input 
                    id="status" 
                    name="status" 
                    value={formData.status}
                    onChange={handleInputChange}
                    placeholder="Exemple: Prochainement"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Titre de l'événement"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description de l'événement"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="actionText">Texte du bouton</Label>
                  <Input 
                    id="actionText" 
                    name="actionText" 
                    value={formData.actionText}
                    onChange={handleInputChange}
                    placeholder="Exemple: En savoir plus"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="actionLink">Lien du bouton</Label>
                  <Input 
                    id="actionLink" 
                    name="actionLink" 
                    value={formData.actionLink}
                    onChange={handleInputChange}
                    placeholder="Exemple: #contact"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image (optionnel)</Label>
                  <Input 
                    id="image" 
                    name="image" 
                    value={formData.image || ''}
                    onChange={handleInputChange}
                    placeholder="/images/nom-de-image.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Ordre</Label>
                  <Input 
                    id="order" 
                    name="order" 
                    type="number"
                    value={formData.order}
                    onChange={handleInputChange}
                    placeholder="Ordre d'affichage"
                    required
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? "Ajout en cours..." : "Ajouter"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ordre</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events?.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.order}</TableCell>
                    <TableCell>{event.status}</TableCell>
                    <TableCell>{event.title}</TableCell>
                    <TableCell className="max-w-xs truncate">{event.description}</TableCell>
                    <TableCell>{event.actionText}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedEvent(event);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          Modifier
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {
                            setSelectedEvent(event);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {events?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Aucun événement trouvé. Ajoutez-en un !
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier l'événement</DialogTitle>
              <DialogDescription>
                Modifiez les informations de cet événement.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-status">Statut</Label>
                <Input 
                  id="edit-status" 
                  name="status" 
                  value={formData.status}
                  onChange={handleInputChange}
                  placeholder="Exemple: Prochainement"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-title">Titre</Label>
                <Input 
                  id="edit-title" 
                  name="title" 
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Titre de l'événement"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description" 
                  name="description" 
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description de l'événement"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-actionText">Texte du bouton</Label>
                <Input 
                  id="edit-actionText" 
                  name="actionText" 
                  value={formData.actionText}
                  onChange={handleInputChange}
                  placeholder="Exemple: En savoir plus"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-actionLink">Lien du bouton</Label>
                <Input 
                  id="edit-actionLink" 
                  name="actionLink" 
                  value={formData.actionLink}
                  onChange={handleInputChange}
                  placeholder="Exemple: #contact"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-order">Ordre</Label>
                <Input 
                  id="edit-order" 
                  name="order" 
                  type="number"
                  value={formData.order}
                  onChange={handleInputChange}
                  placeholder="Ordre d'affichage"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "Mise à jour en cours..." : "Mettre à jour"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Cet événement sera définitivement supprimé.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Suppression..." : "Supprimer"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };
  
  // Missions Section
  const Missions = () => {
    const { data: missions, isLoading } = useQuery({
      queryKey: ['/api/missions'],
    });
    
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedMission, setSelectedMission] = useState<any>(null);
    
    const [formData, setFormData] = useState({
      icon: '',
      title: '',
      description: '',
      order: 0
    });
    
    const resetForm = () => {
      setFormData({
        icon: '',
        title: '',
        description: '',
        order: missions ? missions.length + 1 : 1
      });
    };
    
    // Reset form when adding new mission
    useEffect(() => {
      if (isAddDialogOpen) {
        resetForm();
      }
    }, [isAddDialogOpen, missions]);
    
    // Set form data when editing
    useEffect(() => {
      if (selectedMission) {
        setFormData({
          icon: selectedMission.icon,
          title: selectedMission.title,
          description: selectedMission.description,
          order: selectedMission.order
        });
      }
    }, [selectedMission]);
    
    const createMutation = useMutation({
      mutationFn: createMission,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/missions'] });
        setIsAddDialogOpen(false);
        toast({
          title: "Mission ajoutée",
          description: "La mission a été ajoutée avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de l'ajout de la mission.",
          variant: "destructive",
        });
      }
    });
    
    const updateMutation = useMutation({
      mutationFn: (data: any) => updateMission(selectedMission.id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/missions'] });
        setIsEditDialogOpen(false);
        toast({
          title: "Mission mise à jour",
          description: "La mission a été mise à jour avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la mise à jour de la mission.",
          variant: "destructive",
        });
      }
    });
    
    const deleteMutation = useMutation({
      mutationFn: () => deleteMission(selectedMission.id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/missions'] });
        setIsDeleteDialogOpen(false);
        toast({
          title: "Mission supprimée",
          description: "La mission a été supprimée avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la suppression de la mission.",
          variant: "destructive",
        });
      }
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ 
        ...prev, 
        [name]: name === 'order' ? parseInt(value) || 0 : value 
      }));
    };
    
    const handleAddSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createMutation.mutate(formData);
    };
    
    const handleEditSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      updateMutation.mutate(formData);
    };
    
    const handleDelete = () => {
      deleteMutation.mutate();
    };
    
    if (isLoading) {
      return <div className="p-4 text-center">Chargement des missions...</div>;
    }
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Nos Missions</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Ajouter une mission</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle mission</DialogTitle>
                <DialogDescription>
                  Créez une nouvelle mission pour le site.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="icon">Icône (emoji)</Label>
                  <Input 
                    id="icon" 
                    name="icon" 
                    value={formData.icon}
                    onChange={handleInputChange}
                    placeholder="Exemple: 🌊"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Titre de la mission"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description de la mission"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Ordre</Label>
                  <Input 
                    id="order" 
                    name="order" 
                    type="number"
                    value={formData.order}
                    onChange={handleInputChange}
                    placeholder="Ordre d'affichage"
                    required
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? "Ajout en cours..." : "Ajouter"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ordre</TableHead>
                  <TableHead>Icône</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {missions?.map((mission) => (
                  <TableRow key={mission.id}>
                    <TableCell>{mission.order}</TableCell>
                    <TableCell>{mission.icon}</TableCell>
                    <TableCell>{mission.title}</TableCell>
                    <TableCell className="max-w-xs truncate">{mission.description}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedMission(mission);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          Modifier
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {
                            setSelectedMission(mission);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {missions?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      Aucune mission trouvée. Ajoutez-en une !
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier la mission</DialogTitle>
              <DialogDescription>
                Modifiez les informations de cette mission.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-icon">Icône (emoji)</Label>
                <Input 
                  id="edit-icon" 
                  name="icon" 
                  value={formData.icon}
                  onChange={handleInputChange}
                  placeholder="Exemple: 🌊"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-title">Titre</Label>
                <Input 
                  id="edit-title" 
                  name="title" 
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Titre de la mission"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description" 
                  name="description" 
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description de la mission"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-order">Ordre</Label>
                <Input 
                  id="edit-order" 
                  name="order" 
                  type="number"
                  value={formData.order}
                  onChange={handleInputChange}
                  placeholder="Ordre d'affichage"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "Mise à jour en cours..." : "Mettre à jour"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Cette mission sera définitivement supprimée.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Suppression..." : "Supprimer"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };
  
  // Activities Section
  const Activities = () => {
    const { data: activities, isLoading } = useQuery({
      queryKey: ['/api/activities'],
    });
    
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<any>(null);
    
    const [formData, setFormData] = useState({
      image: '',
      title: '',
      description: '',
      actionText: '',
      actionLink: '',
      order: 0,
      imagePosition: 'left'
    });
    
    const resetForm = () => {
      setFormData({
        image: '',
        title: '',
        description: '',
        actionText: '',
        actionLink: '#contact',
        order: activities ? activities.length + 1 : 1,
        imagePosition: 'left'
      });
    };
    
    // Reset form when adding new activity
    useEffect(() => {
      if (isAddDialogOpen) {
        resetForm();
      }
    }, [isAddDialogOpen, activities]);
    
    // Set form data when editing
    useEffect(() => {
      if (selectedActivity) {
        setFormData({
          image: selectedActivity.image,
          title: selectedActivity.title,
          description: selectedActivity.description,
          actionText: selectedActivity.actionText,
          actionLink: selectedActivity.actionLink,
          order: selectedActivity.order,
          imagePosition: selectedActivity.imagePosition
        });
      }
    }, [selectedActivity]);
    
    const createMutation = useMutation({
      mutationFn: createActivity,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/activities'] });
        setIsAddDialogOpen(false);
        toast({
          title: "Activité ajoutée",
          description: "L'activité a été ajoutée avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de l'ajout de l'activité.",
          variant: "destructive",
        });
      }
    });
    
    const updateMutation = useMutation({
      mutationFn: (data: any) => updateActivity(selectedActivity.id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/activities'] });
        setIsEditDialogOpen(false);
        toast({
          title: "Activité mise à jour",
          description: "L'activité a été mise à jour avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la mise à jour de l'activité.",
          variant: "destructive",
        });
      }
    });
    
    const deleteMutation = useMutation({
      mutationFn: () => deleteActivity(selectedActivity.id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/activities'] });
        setIsDeleteDialogOpen(false);
        toast({
          title: "Activité supprimée",
          description: "L'activité a été supprimée avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la suppression de l'activité.",
          variant: "destructive",
        });
      }
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ 
        ...prev, 
        [name]: name === 'order' ? parseInt(value) || 0 : value 
      }));
    };
    
    const handleAddSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createMutation.mutate(formData);
    };
    
    const handleEditSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      updateMutation.mutate(formData);
    };
    
    const handleDelete = () => {
      deleteMutation.mutate();
    };
    
    if (isLoading) {
      return <div className="p-4 text-center">Chargement des activités...</div>;
    }
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Nos Activités</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Ajouter une activité</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle activité</DialogTitle>
                <DialogDescription>
                  Créez une nouvelle activité pour le site.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image">URL de l'image</Label>
                    <Input 
                      id="image" 
                      name="image" 
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Exemple: /bac.jpg"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imagePosition">Position de l'image</Label>
                    <select
                      id="imagePosition"
                      name="imagePosition"
                      value={formData.imagePosition}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="left">Gauche</option>
                      <option value="right">Droite</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Titre de l'activité"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (HTML)</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description de l'activité (peut contenir du HTML)"
                    rows={6}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Vous pouvez utiliser des balises HTML comme <code>&lt;span class="highlight-blue"&gt;texte&lt;/span&gt;</code> pour mettre en évidence du texte.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="actionText">Texte du bouton</Label>
                    <Input 
                      id="actionText" 
                      name="actionText" 
                      value={formData.actionText}
                      onChange={handleInputChange}
                      placeholder="Exemple: En savoir plus"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="actionLink">Lien du bouton</Label>
                    <Input 
                      id="actionLink" 
                      name="actionLink" 
                      value={formData.actionLink}
                      onChange={handleInputChange}
                      placeholder="Exemple: #contact"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Ordre</Label>
                  <Input 
                    id="order" 
                    name="order" 
                    type="number"
                    value={formData.order}
                    onChange={handleInputChange}
                    placeholder="Ordre d'affichage"
                    required
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? "Ajout en cours..." : "Ajouter"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ordre</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities?.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.order}</TableCell>
                    <TableCell>{activity.title}</TableCell>
                    <TableCell className="max-w-[100px] truncate">{activity.image}</TableCell>
                    <TableCell>{activity.imagePosition === 'left' ? 'Gauche' : 'Droite'}</TableCell>
                    <TableCell>{activity.actionText}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedActivity(activity);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          Modifier
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {
                            setSelectedActivity(activity);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {activities?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Aucune activité trouvée. Ajoutez-en une !
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Modifier l'activité</DialogTitle>
              <DialogDescription>
                Modifiez les informations de cette activité.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-image">URL de l'image</Label>
                  <Input 
                    id="edit-image" 
                    name="image" 
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Exemple: /bac.jpg"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-imagePosition">Position de l'image</Label>
                  <select
                    id="edit-imagePosition"
                    name="imagePosition"
                    value={formData.imagePosition}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="left">Gauche</option>
                    <option value="right">Droite</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-title">Titre</Label>
                <Input 
                  id="edit-title" 
                  name="title" 
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Titre de l'activité"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description (HTML)</Label>
                <Textarea 
                  id="edit-description" 
                  name="description" 
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description de l'activité (peut contenir du HTML)"
                  rows={6}
                  required
                />
                <p className="text-xs text-gray-500">
                  Vous pouvez utiliser des balises HTML comme <code>&lt;span class="highlight-blue"&gt;texte&lt;/span&gt;</code> pour mettre en évidence du texte.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-actionText">Texte du bouton</Label>
                  <Input 
                    id="edit-actionText" 
                    name="actionText" 
                    value={formData.actionText}
                    onChange={handleInputChange}
                    placeholder="Exemple: En savoir plus"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-actionLink">Lien du bouton</Label>
                  <Input 
                    id="edit-actionLink" 
                    name="actionLink" 
                    value={formData.actionLink}
                    onChange={handleInputChange}
                    placeholder="Exemple: #contact"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-image">Image (optionnel)</Label>
                  <Input 
                    id="edit-image" 
                    name="image" 
                    value={formData.image || ''}
                    onChange={handleInputChange}
                    placeholder="/images/nom-de-image.jpg"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-order">Ordre</Label>
                <Input 
                  id="edit-order" 
                  name="order" 
                  type="number"
                  value={formData.order}
                  onChange={handleInputChange}
                  placeholder="Ordre d'affichage"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "Mise à jour en cours..." : "Mettre à jour"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Cette activité sera définitivement supprimée.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Suppression..." : "Supprimer"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestion du contenu</h1>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setLocation('/admin/dashboard')}
            >
              Retour au tableau de bord
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setLocation('/')}
            >
              Voir le site
            </Button>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <Tabs defaultValue="about">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-7">
                <TabsTrigger value="about">À propos</TabsTrigger>
                <TabsTrigger value="approach">Approche</TabsTrigger>
                <TabsTrigger value="events">Événements</TabsTrigger>
                <TabsTrigger value="mission">Missions</TabsTrigger>
                <TabsTrigger value="activities">Activités</TabsTrigger>
                <TabsTrigger value="areas">Zones</TabsTrigger>
                <TabsTrigger value="partners">Partenaires</TabsTrigger>
              </TabsList>
              <div className="mt-6">
                <TabsContent value="about">
                  <AboutContent />
                </TabsContent>
                <TabsContent value="approach">
                  <ApproachItems />
                </TabsContent>
                <TabsContent value="events">
                  <Events />
                </TabsContent>
                <TabsContent value="mission">
                  <Missions />
                </TabsContent>
                <TabsContent value="activities">
                  <Activities />
                </TabsContent>
                <TabsContent value="areas">
                  <Areas />
                </TabsContent>
                <TabsContent value="partners">
                  <Partners />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

  // Areas Section
  const Areas = () => {
    const { data: areas, isLoading } = useQuery({
      queryKey: ['/api/areas'],
    });
    
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      order: 0,
      latitude: '',
      longitude: ''
    });
    
    const resetForm = () => {
      setFormData({
        name: '',
        description: '',
        order: areas ? areas.length + 1 : 1,
        latitude: '',
        longitude: ''
      });
    };
    
    // Reset form when adding new item
    useEffect(() => {
      if (isAddDialogOpen) {
        resetForm();
      }
    }, [isAddDialogOpen, areas]);
    
    // Set form data when editing
    useEffect(() => {
      if (selectedItem) {
        setFormData({
          name: selectedItem.name,
          description: selectedItem.description || '',
          order: selectedItem.order,
          latitude: selectedItem.latitude,
          longitude: selectedItem.longitude
        });
      }
    }, [selectedItem]);
    
    const createMutation = useMutation({
      mutationFn: createArea,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/areas'] });
        setIsAddDialogOpen(false);
        toast({
          title: "Zone ajoutée",
          description: "La zone d'intervention a été ajoutée avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de l'ajout de la zone.",
          variant: "destructive",
        });
      }
    });
    
    const updateMutation = useMutation({
      mutationFn: (data: any) => updateArea(selectedItem.id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/areas'] });
        setIsEditDialogOpen(false);
        toast({
          title: "Zone mise à jour",
          description: "La zone d'intervention a été mise à jour avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la mise à jour de la zone.",
          variant: "destructive",
        });
      }
    });
    
    const deleteMutation = useMutation({
      mutationFn: () => deleteArea(selectedItem.id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/areas'] });
        setIsDeleteDialogOpen(false);
        toast({
          title: "Zone supprimée",
          description: "La zone d'intervention a été supprimée avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la suppression de la zone.",
          variant: "destructive",
        });
      }
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ 
        ...prev, 
        [name]: name === 'order' ? parseInt(value) || 0 : value 
      }));
    };
    
    const handleAddSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createMutation.mutate(formData);
    };
    
    const handleEditSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      updateMutation.mutate(formData);
    };
    
    const handleDelete = () => {
      deleteMutation.mutate();
    };
    
    if (isLoading) {
      return <div className="p-4 text-center">Chargement des zones d'intervention...</div>;
    }
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Zones d'intervention</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Ajouter une zone</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle zone</DialogTitle>
                <DialogDescription>
                  Créez une nouvelle zone d'intervention.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nom de la zone"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description de la zone (optionnel)"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input 
                      id="latitude" 
                      name="latitude" 
                      value={formData.latitude}
                      onChange={handleInputChange}
                      placeholder="ex: 47.2173"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input 
                      id="longitude" 
                      name="longitude" 
                      value={formData.longitude}
                      onChange={handleInputChange}
                      placeholder="ex: -1.5534"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Ordre</Label>
                  <Input 
                    id="order" 
                    name="order" 
                    type="number"
                    value={formData.order}
                    onChange={handleInputChange}
                    placeholder="Ordre d'affichage"
                    required
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? "Ajout en cours..." : "Ajouter"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ordre</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Coordonnées</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {areas?.map((area) => (
                  <TableRow key={area.id}>
                    <TableCell>{area.order}</TableCell>
                    <TableCell>{area.name}</TableCell>
                    <TableCell>{area.latitude}, {area.longitude}</TableCell>
                    <TableCell className="max-w-xs truncate">{area.description || '-'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedItem(area);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          Modifier
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {
                            setSelectedItem(area);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {areas?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      Aucune zone trouvée. Ajoutez-en une !
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier la zone</DialogTitle>
              <DialogDescription>
                Modifiez les informations de cette zone d'intervention.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nom</Label>
                <Input 
                  id="edit-name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nom de la zone"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description" 
                  name="description" 
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description de la zone (optionnel)"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-latitude">Latitude</Label>
                  <Input 
                    id="edit-latitude" 
                    name="latitude" 
                    value={formData.latitude}
                    onChange={handleInputChange}
                    placeholder="ex: 47.2173"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-longitude">Longitude</Label>
                  <Input 
                    id="edit-longitude" 
                    name="longitude" 
                    value={formData.longitude}
                    onChange={handleInputChange}
                    placeholder="ex: -1.5534"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-order">Ordre</Label>
                <Input 
                  id="edit-order" 
                  name="order" 
                  type="number"
                  value={formData.order}
                  onChange={handleInputChange}
                  placeholder="Ordre d'affichage"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "Mise à jour en cours..." : "Mettre à jour"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous absolument sûr?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action ne peut pas être annulée. Cela supprimera définitivement cette zone d'intervention.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleteMutation.isPending ? "Suppression..." : "Supprimer"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };
  
  // Partners Section
  const Partners = () => {
    const { data: partners, isLoading } = useQuery({
      queryKey: ['/api/partners'],
    });
    
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    
    const [formData, setFormData] = useState({
      name: '',
      logo: '',
      website: '',
      order: 0
    });
    
    const resetForm = () => {
      setFormData({
        name: '',
        logo: '',
        website: '',
        order: partners ? partners.length + 1 : 1
      });
    };
    
    // Reset form when adding new item
    useEffect(() => {
      if (isAddDialogOpen) {
        resetForm();
      }
    }, [isAddDialogOpen, partners]);
    
    // Set form data when editing
    useEffect(() => {
      if (selectedItem) {
        setFormData({
          name: selectedItem.name,
          logo: selectedItem.logo,
          website: selectedItem.website || '',
          order: selectedItem.order
        });
      }
    }, [selectedItem]);
    
    const createMutation = useMutation({
      mutationFn: createPartner,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/partners'] });
        setIsAddDialogOpen(false);
        toast({
          title: "Partenaire ajouté",
          description: "Le partenaire a été ajouté avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de l'ajout du partenaire.",
          variant: "destructive",
        });
      }
    });
    
    const updateMutation = useMutation({
      mutationFn: (data: any) => updatePartner(selectedItem.id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/partners'] });
        setIsEditDialogOpen(false);
        toast({
          title: "Partenaire mis à jour",
          description: "Le partenaire a été mis à jour avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la mise à jour du partenaire.",
          variant: "destructive",
        });
      }
    });
    
    const deleteMutation = useMutation({
      mutationFn: () => deletePartner(selectedItem.id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/partners'] });
        setIsDeleteDialogOpen(false);
        toast({
          title: "Partenaire supprimé",
          description: "Le partenaire a été supprimé avec succès.",
          variant: "default",
        });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la suppression du partenaire.",
          variant: "destructive",
        });
      }
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ 
        ...prev, 
        [name]: name === 'order' ? parseInt(value) || 0 : value 
      }));
    };
    
    const handleAddSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createMutation.mutate(formData);
    };
    
    const handleEditSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      updateMutation.mutate(formData);
    };
    
    const handleDelete = () => {
      deleteMutation.mutate();
    };
    
    if (isLoading) {
      return <div className="p-4 text-center">Chargement des partenaires...</div>;
    }
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Nos Partenaires</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Ajouter un partenaire</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau partenaire</DialogTitle>
                <DialogDescription>
                  Créez un nouveau partenaire à afficher sur le site.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nom du partenaire"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">URL du logo</Label>
                  <Input 
                    id="logo" 
                    name="logo" 
                    value={formData.logo}
                    onChange={handleInputChange}
                    placeholder="URL du logo du partenaire"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Site web</Label>
                  <Input 
                    id="website" 
                    name="website" 
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="URL du site web (optionnel)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Ordre</Label>
                  <Input 
                    id="order" 
                    name="order" 
                    type="number"
                    value={formData.order}
                    onChange={handleInputChange}
                    placeholder="Ordre d'affichage"
                    required
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? "Ajout en cours..." : "Ajouter"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ordre</TableHead>
                  <TableHead>Logo</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Site web</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partners?.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell>{partner.order}</TableCell>
                    <TableCell>
                      {partner.logo && (
                        <img 
                          src={partner.logo} 
                          alt={partner.name} 
                          className="h-10 max-w-[100px] object-contain"
                        />
                      )}
                    </TableCell>
                    <TableCell>{partner.name}</TableCell>
                    <TableCell>
                      {partner.website ? (
                        <a 
                          href={partner.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {partner.website}
                        </a>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedItem(partner);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          Modifier
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {
                            setSelectedItem(partner);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {partners?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      Aucun partenaire trouvé. Ajoutez-en un !
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier le partenaire</DialogTitle>
              <DialogDescription>
                Modifiez les informations de ce partenaire.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nom</Label>
                <Input 
                  id="edit-name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nom du partenaire"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-logo">URL du logo</Label>
                <Input 
                  id="edit-logo" 
                  name="logo" 
                  value={formData.logo}
                  onChange={handleInputChange}
                  placeholder="URL du logo du partenaire"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-website">Site web</Label>
                <Input 
                  id="edit-website" 
                  name="website" 
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="URL du site web (optionnel)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-order">Ordre</Label>
                <Input 
                  id="edit-order" 
                  name="order" 
                  type="number"
                  value={formData.order}
                  onChange={handleInputChange}
                  placeholder="Ordre d'affichage"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "Mise à jour en cours..." : "Mettre à jour"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous absolument sûr?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action ne peut pas être annulée. Cela supprimera définitivement ce partenaire.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleteMutation.isPending ? "Suppression..." : "Supprimer"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };

export default AdminContent;
