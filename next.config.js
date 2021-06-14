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
  webpack: (config) => {
    config.module.rules[2].oneOf.forEach((moduleLoader) => {
      if (Array.isArray(moduleLoader.use)) {
        moduleLoader.use.forEach((item) => {
          if (item.loader.includes('css-loader') && !item.loader.includes('postcss-loader')) {
            item.options.modules.exportLocalsConvention = 'camelCaseOnly';
          }
        });
      }
    });
    return config;
  },
};
