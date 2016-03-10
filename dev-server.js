var util = require('util');
var webpack = require('webpack');
var config = require('./webpack.config');
var path = require('path');
var pkg = require('./package.json');
var express =require('express');

var port = pkg.config.devPort;
var host = pkg.config.devHost;

var app = require('./app');
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, pkg.config.buildDir + '/index.html'));
});

app.listen(port, host, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  var url = util.format('http://%s:%d', host, port);
  console.log('Listening at %s', url);
});
