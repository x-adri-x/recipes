import { Pool } from 'pg'

export const createPool = () => {
  return new Pool({ connectionString: process.env.DATABASE_URL })
}
