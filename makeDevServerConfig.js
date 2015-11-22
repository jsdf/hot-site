var querystring = require('querystring');
var xtend = require('xtend');
var isArray = require('is-array');
var isString = require('is-string');
var isObject = require('is-object');
var webpack = require('./webpack');
var ErrorMessagePlugin = require('./ErrorMessagePlugin');

function makeDevServerConfig(config, opts) {
  var publicUrl = opts.protocol+'://'+opts.host+':'+opts.port;

  var devServerConfig = xtend(config, {
    output: xtend(config.output || {}, {
      publicPath: publicUrl+'/static/',
    }),
    plugins: (config.plugins || []).concat([
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new ErrorMessagePlugin(),
    ]),
  });

  // inject hot module reload client into each bundle
  var devServerClientScripts = [
    require.resolve('webpack-hot-middleware/client')+'?'+querystring.stringify({
      path: publicUrl+'/__webpack_hmr',
      reload: opts.reload,
    }),
  ];

  if (isArray(devServerConfig.entry) || isString(devServerConfig.entry)) {
    devServerConfig.entry = devServerClientScripts.concat(devServerConfig.entry);
  } else if (isObject(devServerConfig.entry)) {
    devServerConfig.entry = {};
    Object.keys(config.entry).forEach(function(key) {
      devServerConfig.entry[key] = devServerClientScripts.concat(config.entry[key]);
    });
  } else {
    throw new Error("couldn't add hot reload client to config.entry");
  }

  return devServerConfig;
}

module.exports = makeDevServerConfig;
