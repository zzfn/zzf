const envConfig = require(`./${process.env.NODE_ENV}.env.js`);
module.exports = envConfig;
