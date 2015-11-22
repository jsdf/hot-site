var path = require('path');
var xtend = require('xtend');

function makeConfig(config) {
  // convention over configuration defaults
  return xtend(config, {
    entry: config.entry || path.join(process.cwd(), 'src'),
    output: xtend(config.output || {}, {
      path: config.output && config.output.path || path.join(process.cwd(), 'dist'),
      filename: 'index.js',
    }),
  });
}

module.exports = makeConfig;
