const path = require('path');
module.exports = {
  future: {
    webpack5: true,
    strictPostcssConfiguration: true
  },
  webpack: (config, { isServer }) => {
    return config;
  },
};
