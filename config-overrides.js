
const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
  if (env === 'production') {
    config.devtool = false;
  }
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
  return config;
};