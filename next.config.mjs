import config from './env/index.js';

export default {
  reactStrictMode: true,
  env: { ...config },
  images: {
    domains: ['cdn.zzfzzf.com'],
  },
  sassOptions: {
    prependData: `@import "styles/variable";`,
  },
};
