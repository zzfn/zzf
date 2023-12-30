import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default {
  output: 'standalone',
  assetPrefix:
    process.env.NODE_ENV === 'production' && !process.env.VERCEL
      ? 'https://cdn.zzfzzf.com/zzf'
      : '/',
  reactStrictMode: true,
  webpack: (config, _context) => {
    config.resolve.alias['jotai'] = path.resolve(__dirname, 'node_modules/jotai')
    return config;
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    domains: ['cdn.zzfzzf.com'],
  },
};
