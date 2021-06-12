const config = require('./env/index');

module.exports = {
  env: { ...config },
  images: {
    domains: ['cdn.zzfzzf.com'],
  },
  future: {
    webpack5: true,
    strictPostcssConfiguration: true,
  },
  webpack: (config, { isServer }) => {
    return config;
  },
};
