// Using blueprint from javascript_database integration
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();
neonConfig.webSocketConstructor = ws;
// (neonConfig as any).usePool = false;

if (!process.env.DATABASE_URL) {
    throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?"
    );
}

export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 15000, // 15 seconds timeout
  max: 20, // Increased max clients
  idleTimeoutMillis: 30000,
});
export const db = drizzle({ client: pool, schema });
