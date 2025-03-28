import { db } from '../shared/db';
import * as schema from '../shared/schema';
import * as dotenv from 'dotenv';
import { sql } from 'drizzle-orm';

// Charger les variables d'environnement
dotenv.config();

async function debugDatabase() {
  console.log('=== DÉBUT DU DÉBOGAGE DE LA BASE DE DONNÉES ===');
  
  // Vérifier la connexion à la base de données
  console.log('1. Vérification de la connexion à la base de données...');
  try {
    // Tester si la connexion fonctionne avec une requête simple
    const result = await db.select({ count: sql`count(*)` }).from(schema.users);
    console.log('✅ Connexion réussie. Nombre d\'utilisateurs:', result[0].count);
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
    process.exit(1);
  }

  // Vérifier les tables et le contenu
  console.log('\n2. Vérification des tables et du contenu...');
  
  try {
    // Vérifier les utilisateurs
    const users = await db.select().from(schema.users);
    console.log(`- Table 'users': ${users.length} enregistrements`);
    if (users.length > 0) {
      console.log('  Premier utilisateur:', { 
        id: users[0].id, 
        username: users[0].username,
        isAdmin: users[0].isAdmin 
      });
    }
    
    // Vérifier les approachItems
    const approachItems = await db.select().from(schema.approachItems);
    console.log(`- Table 'approach_items': ${approachItems.length} enregistrements`);
    if (approachItems.length > 0) {
      console.log('  Premier item:', { 
        id: approachItems[0].id, 
        title: approachItems[0].title 
      });
    }
    
    // Vérifier les events
    const events = await db.select().from(schema.events);
    console.log(`- Table 'events': ${events.length} enregistrements`);
    
    // Vérifier les missions
    const missions = await db.select().from(schema.missions);
    console.log(`- Table 'missions': ${missions.length} enregistrements`);

    // Vérifier les activities
    const activities = await db.select().from(schema.activities);
    console.log(`- Table 'activities': ${activities.length} enregistrements`);

  } catch (error) {
    console.error('❌ Erreur lors de la vérification des tables:', error);
  }

  console.log('\n=== FIN DU DÉBOGAGE DE LA BASE DE DONNÉES ===');
}

// Exécuter la fonction de débogage
debugDatabase().catch(error => {
  console.error('Erreur non gérée:', error);
}).finally(() => {
  console.log('Script de débogage terminé.');
  process.exit(0);
}); 