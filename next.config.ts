import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true, 
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb'
    }
  }
};

export default nextConfig;
