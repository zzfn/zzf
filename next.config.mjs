import config from './env/index.js';
const isProd = process.env.NODE_ENV === 'production'

export default {
  assetPrefix: isProd ? ' https://oss-zzf.zzfzzf.com/zzf' : '',
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
