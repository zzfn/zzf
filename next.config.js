const config = require('./env/index');

module.exports = {
  env: { ...config },
  images: {
    domains: ['cdn.zzfzzf.com'],
  },
  sassOptions: {
    prependData: `@import "styles/_variable";`,
  },
  webpack: (config) => {
    const idx = config.module.rules.findIndex((item) => Reflect.has(item, 'oneOf'));
    config.module.rules[idx].oneOf.forEach((moduleLoader) => {
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
