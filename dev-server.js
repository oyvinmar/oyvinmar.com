var util = require('util');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var path = require('path');
var pkg = require('./package.json');
var express =require('express');

var port = pkg.config.devPort;
var host = pkg.config.devHost;

var app = require('./app');
var compiler = webpack(config);
const middleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
});

app.use(middleware);

app.use(require('webpack-hot-middleware')(compiler));

const fs = middleware.fileSystem;

const readAndSendFile= (name, res) => {
  fs.readFile(path.join(compiler.outputPath, name), (err, file) => {
    if (err) {
      console.error(err);
      res.sendStatus(404);
    } else {
      res.send(file.toString());
    }
  });
};

app.get('/', function(req, res) {
  readAndSendFile('/index.html', res);
});

app.get('/cv', function(req, res) {
  readAndSendFile('/cv.html', res);
});

app.listen(port, host, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  var url = util.format('http://%s:%d', host, port);
  console.log('Listening at %s', url);
});
