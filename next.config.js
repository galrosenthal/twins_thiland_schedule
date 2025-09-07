/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages serves from a subdirectory, so we need to set basePath
  // Replace 'twins_thiland_schedule' with your actual repository name
  basePath: '/twins_thiland_schedule',
  assetPrefix: '/twins_thiland_schedule'
};

module.exports = nextConfig;
