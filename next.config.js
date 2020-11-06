const path = require("path");
module.exports = {
  webpack: (config, { isServer }) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "./src");
    config.resolve.alias["com"] = path.resolve(__dirname, "./src/components");
    return config;
  },
};
