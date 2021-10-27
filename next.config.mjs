import config from './env/index.js';

export default {
  env: { ...config },
  images: {
    domains: ['cdn.zzfzzf.com'],
  },
  sassOptions: {
    prependData: `@import "styles/variable";`,
  },
};
