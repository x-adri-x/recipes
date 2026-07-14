import { betterAuth } from 'better-auth'
import { createPool } from './db'

export const auth = betterAuth({
  database: createPool(),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      console.log(`Password reset requested for ${user.email}: ${url}`)
    },
  },
})
