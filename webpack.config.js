const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const variables = require('./variable.json')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  if (config.mode === "development") {
    config.devServer.proxy = {
      "/**": {
        target: variables.protocol + "://" + variables.host,
        secure: false,
        changeOrigin: true,
        logLevel: "info"
      }
    };
    config.devServer.proxy = {
      "/**": {
        target: variables.protocol + "://" + variables.host2,
        secure: false,
        changeOrigin: true,
        logLevel: "info"
      }
    };
  }

  return config;
};