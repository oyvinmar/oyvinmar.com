var PORT = 8080;
var express = require('express'), app = express.createServer();
var http = require('http');
var stylesheets = __dirname + '/public/stylesheets';
var images = __dirname + '/public/images';
var javascript = __dirname + '/public/javascript';
app.register('.html', require('hbs'));

/*var less;
express.compiler.compilers.less.compile = function (str, fn) {
  if (!less) {
    less = require("less"); }

  console.log("Test");
  try {
    less.render(str, { compress : true }, fn);
    console.log("Test");
  }
  catch (err) {
    fn(err); }
};*/

app.configure(function() {
  console.log("Configure defult settings.");
  app.use(express.compiler({ src:stylesheets, enable: ['less'] }));
  app.use(express.bodyParser());
  app.use(app.router);
});

app.configure('development',function() {
  console.log("Configure settings for development.");
  app.use(express.static(stylesheets));
  app.use(express.static(images));
  app.use(express.static(javascript));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
});

app.configure('production', function() {
  var oneYear = 31557600000;
  app.use(express.static(stylesheets, {maxAge: oneYear}));
  app.use(express.static(images, {maxAge: oneYear}));
  app.use(express.static(javascript, {maxAge: oneYear}));
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  res.render('index.html', {layout:true});
});

app.get('/pinboard/feed/', function(req, res){
  var options = {
    host: 'feeds.pinboard.in',
    port: 80,
    path: '/json/v1/u:oyvinmar/',
  };
  proxy_responder(res, options);
});

app.get('/twitter/feed/', function(req, res){
  var options = {
    host: 'api.twitter.com',
    port: 80,
    path: '/1/statuses/user_timeline.json?screen_name=oyvinmar&include_entities=1',
  };
  proxy_responder(res, options);
});

var proxy_responder = function(res, options) {
  http.get(options, function(response) {
    console.log("Got response: " + response.statusCode);
    res.writeHead(response.statusCode, response.headers);
    response.on('data', function (chunk) {
      res.write(chunk, 'binary');
    });
    response.on('end', function () {
      res.end();
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};

app.listen(process.env.PORT || PORT);
