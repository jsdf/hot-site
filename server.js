#!/usr/bin/env node
var path = require('path');
var express = require('express');
var cors = require('cors');
var webpack = require('./webpack');

var makeDevServerConfig = require('./makeDevServerConfig');

var protocol = process.env.PROTOCOL || 'http';
var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 8080;


var userConfig = require(path.join(process.cwd(), 'webpack.config.js'));
var config = makeDevServerConfig(userConfig, {
  protocol: protocol,
  host: host,
  port: port,
})

var app = express();
var compiler = webpack(config);

app.use(cors({credentials: true, origin: true}));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

app.listen(port, host, function(err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Listening at '+protocol+'://'+host+':'+port);
});
