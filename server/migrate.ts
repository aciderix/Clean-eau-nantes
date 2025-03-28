import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

// For migrations and seeding
async function main() {
  console.log('Running migrations...');

  const sql = postgres(process.env.DATABASE_URL as string, { max: 1 });
  const db = drizzle(sql);

  // This will run migrations on the database
  await migrate(db, { migrationsFolder: 'migrations' });

  // Don't forget to close the connection
  await sql.end();

  console.log('Migrations completed successfully');
}

main().catch((e) => {
  console.error('Migration failed');
  console.error(e);
  process.exit(1);
});