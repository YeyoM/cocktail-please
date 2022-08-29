const withPWA = require('next-pwa')
/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.thecocktaildb.com'],
  }
})

module.exports = nextConfig
