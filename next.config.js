/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  output: 'export',
  // Only apply GitHub Pages settings in production
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/twins_thiland_schedule',
    assetPrefix: '/twins_thiland_schedule'
  })
};

module.exports = nextConfig;
