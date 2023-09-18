/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SPORTS_DATA_API_KEY: process.env.SPORTS_DATA_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sleepercdn.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
