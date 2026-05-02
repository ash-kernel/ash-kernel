/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com', 'github.com'],
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
