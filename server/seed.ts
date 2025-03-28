import { db } from '../shared/db';
import { 
  users, approachItems, events, missions, activities, 
  contactInfo, aboutContent 
} from '../shared/schema';
import * as dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

// Seed data function
async function seed() {
  console.log('Seeding database...');

  try {
    // Create admin user
    await db.insert(users).values({
      username: 'admin',
      password: 'admin123', // Note: In a real app, this should be hashed
      isAdmin: true
    }).onConflictDoNothing();

    // Seed Approach Items
    const approachItemsData = [
      {
        icon: '🛡️',
        title: 'Prévention',
        description: 'Informer et sensibiliser sur les risques liés à la pollution des eaux.',
        order: 1
      },
      {
        icon: '🌊',
        title: 'Intervention',
        description: 'Actions concrètes de nettoyage et dépollution des cours d\'eau.',
        order: 2
      },
      {
        icon: '📊',
        title: 'Surveillance',
        description: 'Monitoring de la qualité des eaux et identification des sources de pollution.',
        order: 3
      },
      {
        icon: '👥',
        title: 'Collaboration',
        description: 'Travail avec autorités locales et autres associations environnementales.',
        order: 4
      },
      {
        icon: '📣',
        title: 'Plaidoyer',
        description: 'Portage des préoccupations citoyennes auprès des décideurs publics.',
        order: 5
      },
      {
        icon: '🔬',
        title: 'Innovation',
        description: 'Recherche et développement de solutions durables pour la protection de l\'eau.',
        order: 6
      }
    ];

    for (const item of approachItemsData) {
      await db.insert(approachItems).values(item).onConflictDoNothing();
    }

    // Seed Events
    const eventsData = [
      {
        status: 'Prochainement',
        title: 'Première Éco-journée à l\'Erdre',
        description: 'Rejoignez-nous pour une journée de nettoyage des berges de l\'Erdre tout en profitant d\'animations ludiques et éducatives pour tous les âges.',
        actionText: 'S\'inscrire',
        actionLink: '/contact',
        order: 1
      },
      {
        status: 'En cours',
        title: 'Exposition "Eau, source de vie"',
        description: 'Notre exposition itinérante s\'installe dans les écoles de la métropole pour sensibiliser les plus jeunes à l\'importance des écosystèmes aquatiques.',
        actionText: 'En savoir plus',
        actionLink: '/events',
        order: 2
      },
      {
        status: 'À venir',
        title: 'Conférence "Protéger nos rivières"',
        description: 'Une soirée-débat avec des experts en environnement et des élus locaux pour discuter des enjeux et solutions concernant la préservation de nos cours d\'eau.',
        actionText: 'Réserver',
        actionLink: '/contact',
        order: 3
      }
    ];

    for (const event of eventsData) {
      await db.insert(events).values(event).onConflictDoNothing();
    }

    // Seed Missions
    const missionsData = [
      {
        icon: '🌊',
        title: 'Actions concrètes',
        description: 'Organisation de nettoyages réguliers des cours d\'eau et sensibilisation du public aux enjeux de la protection de l\'eau.',
        order: 1
      },
      {
        icon: '📚',
        title: 'Éducation',
        description: 'Interventions en milieu scolaire et création de matériel pédagogique pour les jeunes sur les écosystèmes aquatiques.',
        order: 2
      },
      {
        icon: '📋',
        title: 'Recherche',
        description: 'Veille, collecte de données et participation à des programmes de recherche sur la qualité de l\'eau en milieu urbain.',
        order: 3
      }
    ];

    for (const mission of missionsData) {
      await db.insert(missions).values(mission).onConflictDoNothing();
    }

    // Seed Activities
    const activitiesData = [
      {
        image: '/bac.jpg',
        title: 'Projet BADS - Barrages Anti-Déchets',
        description: 'Installation de dispositifs innovants pour capturer les déchets plastiques avant qu\'ils n\'atteignent l\'océan. Ces structures, fabriquées en matériaux recyclés, sont placées stratégiquement dans les cours d\'eau urbains.',
        actionText: 'Voir les résultats',
        actionLink: '/activities',
        imagePosition: 'left',
        order: 1
      },
      {
        image: '/ruisseau.jpg',
        title: 'Programme "Adopte un ruisseau"',
        description: 'Cette initiative permet aux écoles et aux groupes communautaires de devenir les gardiens d\'un cours d\'eau local, avec un suivi régulier de son état et l\'organisation d\'actions de préservation.',
        actionText: 'Rejoindre le programme',
        actionLink: '/contact',
        imagePosition: 'right',
        order: 2
      },
      {
        image: '/analyse.jpg',
        title: 'Laboratoire citoyen d\'analyse',
        description: 'Notre laboratoire mobile permet aux habitants de la métropole de participer à l\'analyse de la qualité de l\'eau près de chez eux, tout en apprenant sur les principaux indicateurs environnementaux.',
        actionText: 'Participer aux analyses',
        actionLink: '/contact',
        imagePosition: 'left',
        order: 3
      }
    ];

    for (const activity of activitiesData) {
      await db.insert(activities).values(activity).onConflictDoNothing();
    }

    // Seed Contact Info
    await db.insert(contactInfo).values({
      email: 'contact@clean-nantes.org',
      phone: '+33 (0)6 12 34 56 78',
      address: '10 Quai Turenne, 44000 Nantes, France'
    }).onConflictDoNothing();

    // Seed About Content
    await db.insert(aboutContent).values({
      title: 'Qui sommes-nous ?',
      content: '<p>Créée en 2020, l\'association <strong>C.L.E.A.N.</strong> (Collectif Local pour l\'Environnement Aquatique Nantais) est née de la volonté de citoyens engagés de préserver les ressources en eau de la métropole nantaise.</p><p>Notre vision est celle d\'un territoire où les cours d\'eau et zones humides sont préservés, valorisés et reconnus comme des écosystèmes essentiels à notre bien-être collectif.</p><p>Forte d\'une équipe de 30 bénévoles actifs et plus de 200 membres, notre association intervient sur l\'ensemble du territoire métropolitain, avec une attention particulière pour l\'Erdre, la Loire et la Sèvre Nantaise.</p>',
      image: '/rive.jpeg'
    }).onConflictDoNothing();

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run seed function
seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});