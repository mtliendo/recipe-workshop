import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";
import { connection } from "next/server";

let pool: Pool | null = null;

export async function getPool() {
  await connection();
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set.");
  }
  if (!pool) {
    pool = new Pool({ connectionString, max: 5 });
    attachDatabasePool(pool);
  }
  return pool;
}
