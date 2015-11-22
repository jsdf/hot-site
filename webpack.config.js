var path = require('path');
var webpack = require('webpack');

module.exports = {
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: "[name].js",
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?modules",
      },
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: 'node_modules',
      }
    ],
  },
};
