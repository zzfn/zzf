const envConfig = require(`./${process.env.APP || 'production'}.env.js`);
module.exports = envConfig;
