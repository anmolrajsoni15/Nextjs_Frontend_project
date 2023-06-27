/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["digitalpress.fra1.cdn.digitaloceanspaces.com", "api.uifaces.co", "randomuser.me", "images.unsplash.com", "static.ghost.org", "www.gravatar.com", "localhost","lh3.googleusercontent.com"]
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src/app');
    return config;
  },
};

module.exports = nextConfig;
