import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';
import type { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { log } from './vite';
import { v2 as cloudinary } from 'cloudinary';

// Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Configuration temporaire de Multer (stockage en mémoire pour Cloudinary)
const storage = multer.memoryStorage();

// Filtrer les fichiers pour n'accepter que les images
const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Accepter uniquement les images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Seules les images sont autorisées'));
  }
};

// Initialiser Multer avec nos configurations
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limite à 5 Mo
  },
  fileFilter: fileFilter
});

// Fonction pour télécharger un buffer vers Cloudinary
const uploadToCloudinary = async (buffer: Buffer, folder: string = 'images') => {
  return new Promise<string>((resolve, reject) => {
    // Créer un stream à partir du buffer
    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        folder: folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Pas de résultat de Cloudinary'));
        // Retourner l'URL de l'image
        resolve(result.secure_url);
      }
    );
    
    // Écrire le buffer dans le stream
    uploadStream.write(buffer);
    uploadStream.end();
  });
};

// Middleware pour gérer l'upload d'images
export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  // Utiliser multer pour traiter l'upload de fichier unique
  upload.single('image')(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: 'Fichier trop volumineux. Limite: 5 Mo' });
        }
      }
      log(`Erreur d'upload: ${err.message}`, 'error');
      return res.status(400).json({ message: err.message });
    }

    try {
      // Vérifier si un fichier a été uploadé
      if (!req.file) {
        return res.status(400).json({ message: 'Aucun fichier n\'a été téléchargé' });
      }

      // Récupérer le dossier cible depuis le corps de la requête
      const targetFolder = req.body.folder || 'images';
      
      // Télécharger sur Cloudinary
      const imageUrl = await uploadToCloudinary(req.file.buffer, targetFolder);
      
      // Retourner l'URL de l'image Cloudinary
      return res.status(200).json({ 
        message: 'Image téléchargée avec succès',
        imageUrl,
        originalName: req.file.originalname,
        size: req.file.size
      });
    } catch (error) {
      log(`Erreur lors du traitement de l'image: ${error instanceof Error ? error.message : String(error)}`, 'error');
      return res.status(500).json({ message: 'Erreur lors du traitement de l\'image' });
    }
  });
};

// Middleware pour vérifier si le répertoire public existe
// Maintenu pour compatibilité, mais moins important avec Cloudinary
export const ensurePublicDirExists = async (_req: Request, _res: Response, next: NextFunction) => {
  try {
    // S'assurer que le répertoire public existe toujours pour d'autres fichiers statiques
    const publicDir = path.join(process.cwd(), 'public');
    await fs.ensureDir(publicDir);
    
    next();
  } catch (error) {
    log(`Erreur lors de la vérification des répertoires: ${error instanceof Error ? error.message : String(error)}`, 'error');
    next(error);
  }
};