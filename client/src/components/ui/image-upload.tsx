import React, { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, ImageOff, Loader2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface ImageUploadProps {
  currentImage: string | null;
  onImageChange: (imageUrl: string | null) => void;
  label?: string;
  helpText?: string;
  className?: string;
  folderPath?: string; // Dossier dans public où l'image sera téléchargée (ex: "images/events")
}

export function ImageUpload({
  currentImage,
  onImageChange,
  label = "Image",
  helpText = "Formats supportés: JPG, PNG, WebP - Max 2 Mo",
  className = "",
  folderPath = "images",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérification du type de fichier
    if (!file.type.startsWith('image/')) {
      setError('Seules les images sont autorisées');
      return;
    }

    // Vérification de la taille du fichier (max 2 Mo)
    if (file.size > 2 * 1024 * 1024) {
      setError('L\'image ne doit pas dépasser 2 Mo');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      // Créer un aperçu local pour le feedback immédiat
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);

      // Préparer les données du fichier pour l'upload
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', folderPath);

      // Envoyer le fichier au serveur
      const response = await fetch("/api/upload", {
        method: 'POST',
        body: formData,
        // Ne pas définir Content-Type car FormData le définit automatiquement avec boundary
      });

      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement');
      }

      const data = await response.json();
      
      // Mettre à jour l'URL de l'image
      onImageChange(data.imageUrl);
      
      // Revoquer l'URL de l'aperçu local pour libérer de la mémoire
      URL.revokeObjectURL(localPreview);
      setPreview(data.imageUrl);
    } catch (err) {
      console.error('Erreur lors du téléchargement de l\'image:', err);
      setError('Erreur lors du téléchargement. Veuillez réessayer.');
      // Revenir à l'image précédente en cas d'erreur
      setPreview(currentImage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <Label htmlFor="image-upload">{label}</Label>}

      <div className="flex flex-col items-center gap-3">
        {/* Zone d'aperçu de l'image */}
        <div 
          className="relative flex items-center justify-center w-full h-48 bg-muted rounded-md overflow-hidden border"
          onClick={handleButtonClick}
        >
          {isUploading ? (
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
              <span className="text-sm text-muted-foreground">Téléchargement en cours...</span>
            </div>
          ) : preview ? (
            <img 
              src={preview} 
              alt="Aperçu" 
              className="object-contain w-full h-full"
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <ImageOff className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Aucune image</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 w-full">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleButtonClick} 
            disabled={isUploading}
            className="flex-1"
          >
            <Upload className="w-4 h-4 mr-2" />
            {preview ? 'Changer' : 'Télécharger'}
          </Button>
          
          {preview && (
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleRemoveImage} 
              disabled={isUploading}
            >
              Supprimer
            </Button>
          )}
        </div>

        {/* Message d'aide ou d'erreur */}
        {error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : helpText ? (
          <p className="text-xs text-muted-foreground">{helpText}</p>
        ) : null}
      </div>

      {/* Input de fichier caché */}
      <Input
        ref={fileInputRef}
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}