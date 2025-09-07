/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Only apply GitHub Pages settings in production
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/twins_thiland_schedule',
    assetPrefix: '/twins_thiland_schedule'
  })
};

module.exports = nextConfig;
