import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { getUserFromDb } from '../../../lib/utils'
import bcrypt from 'bcrypt'

export default NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
        user = await getUserFromDb(credentials.email)

        if (!user) {
          throw new Error('User not found.')
        }

        const passwordsMatch = await bcrypt.compare(credentials.password, user.password)

        console.log('passwordsMatch:', passwordsMatch)
        if (passwordsMatch) return user
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
})
