const withLess = require("@zeit/next-less");
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const withPlugins = require("next-compose-plugins");
const path = require("path");

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals),
      ];
      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader",
      });
    }
    config.resolve.alias["@"] = path.resolve(__dirname, "./src");
    config.resolve.alias["com"] = path.resolve(__dirname, "./src/components");
    return config;
  },
};
module.exports = withPlugins(
  [
    [withCss],
    [
      withLess,
      {
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: { "@primary-color": "#00a7de" },
        },
      },
    ],
    [
      withSass,
      {
        cssModules: true,
        cssLoaderOptions: {
          localIdentName: "[local]_[hash:base64:5]",
          sourceMap: false,
          importLoaders: 1,
        },
      },
    ],
  ],
  nextConfig
);
