/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'],
  },
  env: {
    HOST: process.env.CONTENTFUL_CMA_HOST,
    SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CMA_ACCESS_TOKEN: process.env.CONTENTFUL_CMA_ACCESS_TOKEN,
    CONTENTFUL_CDN: process.env.CONTENTFUL_HOST,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  },
}

module.exports = nextConfig
