import config from './env/index.js';

export default {
  reactStrictMode: true,
  env: { ...config },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['cdn.zzfzzf.com'],
  },
  sassOptions: {
    prependData: `@import "styles/variable";`,
  },
};
