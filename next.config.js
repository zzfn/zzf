const path = require('path');
module.exports = {
  images: {
    domains: ['cdn.zzfzzf.com', 'p1-juejin.byteimg.com'],
  },
  future: {
    webpack5: true,
    strictPostcssConfiguration: true,
  },
  webpack: (config, { isServer }) => {
    return config;
  },
};
