var PORT = 8080;
var express = require('express'), app = express.createServer();
var http = require('http');
var https = require('https');
var stylesheets = __dirname + '/public/less';
var images = __dirname + '/public/img';
var javascript = __dirname + '/public/js';
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

app.get('/foursquare/feed/', function(req, res){
  var options = {
    host: 'api.foursquare.com',
    port: 443,
    path: '/v2/users/self/checkins?oauth_token=PYCAAB4LYGSIYSUGXJY2POVILXCVKNXCWQR5YC2FJIUBNSC4&v=20120219',
  };
  https_proxy_responder(res, options);
});

var proxy_responder = function(res, options) {
  //Check cache
  if (handleCachedResponse(options.host, res)) {
    return;
  }
  http.get(options, function(response) {
    //console.log("Got response: " + response.statusCode);
    handle_response(response, res, options.host);
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};

var https_proxy_responder = function(res, options) {
  //Check cache
  if (handleCachedResponse(options.host, res)) {
    return;
  }
  https.get(options, function(response) {
    //console.log("Got response: " + response.statusCode);
    handle_response(response, res, options.host);
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};

var handle_response = function(response, res, key){
  res.writeHead(response.statusCode, response.headers);
  var data = "";
  response.on('data', function (chunk) {
    data += chunk;
    res.write(chunk, 'binary');
  });
  response.on('end', function () {
    cacheUpdate(key, Date.now(), data);
    res.end();
  });
};

var cache = {};

var CacheObject = function(timestamp, data) {
  this.timestamp = timestamp;
  this.data = data;
  return this;
};

var cacheUpdate = function(key, timestamp, data) {
  cache[key] = new CacheObject(timestamp, data);
};

var cacheLookup = function(key) {
  return cache[key];
};

var handleCachedResponse = function(key, res) {
  var co = cacheLookup(key);
  if (co && (Date.now() - co.timestamp) < 1000 * 60 * 15) {
    res.write(co.data, 'binary');
    res.end();
    return true;
  }
  return false;
};

app.listen(process.env.PORT || PORT);
