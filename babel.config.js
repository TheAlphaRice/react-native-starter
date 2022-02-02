const babelModuleConfig = require('./babel-module.config');
// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true);

  const presets = [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ];

  const plugins = [['module-resolver', babelModuleConfig]];

  return {
    presets,
    plugins,
  };
};