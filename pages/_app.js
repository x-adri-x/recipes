import Layout from '../components/Layout'
import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session = {session}>
      <QueryClientProvider client = {queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout> 
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
