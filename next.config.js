/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net']
  },
  env: {
    HOST:process.env.CONTENTFUL_CMA_HOST,
    SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CMA_ACCESS_TOKEN: process.env.CONTENTFUL_CMA_ACCESS_TOKEN,
    CONTENTFUL_CDN: process.env.CONTENTFUL_HOST,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN
  }
}

module.exports = nextConfig
