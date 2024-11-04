/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  experimental: {
    appDir: true,
    serverActions: true,
  },
}

module.exports = nextConfig;