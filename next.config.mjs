import config from './env/index.js';
const isCdn = process.env.BUILD_TARGET === 'cdn'

export default {
  assetPrefix: isCdn ? ' https://oss-zzf.zzfzzf.com/zzf' : '',
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
