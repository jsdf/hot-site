var resolve = require('resolve');

// use user-installed webpack if available
var webpack;
try {
  var userWebpackModulePath = resolve.sync('webpack', {basedir: process.cwd()});
  webpack = require(userWebpackModulePath);
} catch (err) {
  webpack = require('webpack');
}

module.exports = webpack;
