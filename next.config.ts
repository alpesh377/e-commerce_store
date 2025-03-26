import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '', // Leave empty for default HTTPS port (443)
        pathname: '/**', // Allow all paths under this domain
      },
    ],
  }
};

export default nextConfig;
