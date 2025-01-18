import { NextResponse } from 'next/server'

export function middleware(req) {
  const res = NextResponse.next()

  res.headers.set('Access-Control-Allow-Credentials', 'true')
  res.headers.set(
    'Access-Control-Allow-Origin',
    process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_URL : '*'
  )
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.headers.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  return res
}

export const config = {
  matcher: '/api/:path*',
