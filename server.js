var path = require('path');
var express = require('express');
var webpack = require('webpack');

var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;
var config = require(path.join(process.cwd(), 'webpack.config.js'));

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

app.listen(port, host, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at '+host+':'+port);
});
