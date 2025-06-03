// src/connection/db.ts
import { Pool } from '@neondatabase/serverless'

export const getConnection = (databaseUrl: string) => {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined')
  }

  return new Pool({ connectionString: databaseUrl })
}
