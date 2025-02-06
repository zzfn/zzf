import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  assetPrefix:
    process.env.NODE_ENV === 'production' && !process.env.VERCEL
      ? 'https://cdn.zzfzzf.com/zzf'
      : '/',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['zzfzzf.com', '*.ooxo.cc', 'ccw.es'],
    },
  },
};

export default nextConfig;
