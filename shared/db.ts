import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Create postgres client with the connection string from environment variable
const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString as string);

// Create drizzle client with the postgres client and schema
export const db = drizzle(client, { schema });