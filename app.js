var PORT = 3000;
var express = require('express');
var app = module.exports = express();
var https = require('https');
var OAuth = require('oauth');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var root = __dirname + '/app';
app.engine('html', require('hbs').__express);


console.log('Configure default settings.');
app.set('port', process.env.PORT || PORT);
app.set('views', __dirname + '/app');
app.set('view engine', 'hbs');
app.use(express.compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());
app.use(app.router);

if (app.get('env') === 'development') {
  console.log('Configure settings for development.');

  app.use(express.logger('dev'));
  app.use(express.static(root));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
}

if (app.get('env') === 'production') {
  var oneYear = 31557600000;
  app.use(express.static(root, {maxAge: oneYear}));
  app.use(express.errorHandler());
}

app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/cv/?', function (req, res) {
  res.render('cv.html');
});

app.get('/pinboard/feed/', function (req, res) {
  var options = {
    host: 'feeds.pinboard.in',
    port: 443,
    path: '/json/v1/u:oyvinmar/'
  };
  proxy_responder(res, options);
});

app.get('/twitter/feed/', function (req, res) {
  var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env['TWITTER_CONSUMER_KEY'],
    process.env['TWITTER_CONSUMER_SECRET'],
    '1.0A',
    null,
    'HMAC-SHA1'
  );

  var options = {
    host: 'https://api.twitter.com',
    path: '/1.1/statuses/user_timeline.json',
    access_token: process.env['TWITTER_ACCESS_TOKEN'],
    access_token_secret: process.env['TWITTER_ACCESS_TOKEN_SECRET']
  };
  oauth_proxy_responder(oauth, res, options);
});

app.get('/foursquare/feed/', function (req, res) {
  var options = {
    host: 'api.foursquare.com',
    port: 443,
    path: '/v2/users/self/checkins?oauth_token=' + process.env['FOURSQUARE_TOKEN'] + '&m=swarm&v=20141808'
  };
  proxy_responder(res, options);
});

app.get('/github/feed/', function (req, res) {
  var options = {
    host: 'api.github.com',
    port: 443,
    path: '/users/oyvinmar/events?access_token=' + process.env['GITHUB_TOKEN'],
    headers: {'User-Agent': 'oyvinmar'}
  };
  proxy_responder(res, options);
});

var oauth_proxy_responder = function (oauth, res, options) {
  //Check cache
  if (handleCachedResponse(options.host, res)) {
    return;
  }

  oauth.get(
    options.host + options.path,
    options.access_token,
    options.access_token_secret,
    function (e, data, response) {
      if (e) {
        console.error(e);
      }
      cacheUpdate(options.host, Date.now(), data);
      res.set(response.headers);
      res.set('Content-Type', 'application/json');
      res.send(response.statusCode, data);
    }
  );
};

var proxy_responder = function (res, options) {
  //Check cache
  if (handleCachedResponse(options.host, res)) {
    return;
  }
  https.get(options, function (response) {
    //console.log("Got response: " + response.statusCode);
    handle_response(response, res, options.host);
  }).on('error', function (e) {
    console.log('Got error: ' + e.message);
  });
};

var handle_response = function (response, res, key) {

  var data = '';
  response.on('data', function (chunk) {
    data += chunk;
  });

  response.setEncoding('utf8');
  response.on('end', function () {
    cacheUpdate(key, Date.now(), data);
    res.set(response.headers);
    res.set('Content-Type', 'application/json');
    res.send(response.statusCode, data);
  });
};

var cache = {};

var CacheObject = function (timestamp, data) {
  this.timestamp = timestamp;
  this.data = data;
  return this;
};

var cacheUpdate = function (key, timestamp, data) {
  cache[key] = new CacheObject(timestamp, data);
};

var cacheLookup = function (key) {
  return cache[key];
};

var handleCachedResponse = function (key, res) {
  var co = cacheLookup(key);
  if (co && (Date.now() - co.timestamp) < 1000 * 60 * 15) {
    res.set('Content-Type', 'application/json');
    res.send(co.data);
    return true;
  }
  return false;
};
