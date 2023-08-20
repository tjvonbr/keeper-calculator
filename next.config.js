/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SPORTS_DATA_API_KEY: process.env.SPORTS_DATA_API_KEY,
  },
};

module.exports = nextConfig;
