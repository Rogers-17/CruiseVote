import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'commondatastorage.googleapis.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
