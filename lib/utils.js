import { createPool } from './db'

export const getUserFromDb = async (email) => {
  const pool = createPool()
  try {
    const res = await pool.query('SELECT email, password FROM users WHERE email=$1', [email])
    return res.rows[0]
  } catch (err) {
    console.error(err)
  }
  pool.end()
}
