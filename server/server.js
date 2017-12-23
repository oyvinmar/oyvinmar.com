const express = require('express');
const app = (module.exports = express());
const https = require('https');
const OAuth = require('oauth');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const compression = require('compression');
const errorhandler = require('errorhandler');

const PORT = 4000;

console.log('Configure default settings.');
app.set('port', process.env.PORT || PORT);
app.use(compression());
// app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(methodOverride());

if (app.get('env') === 'development') {
  console.log('Configure settings for development.');
  app.use(express.static(__dirname));
  app.use(errorhandler({ dumpExceptions: true, showStack: true }));
}

if (app.get('env') === 'production') {
  const oneYear = 31557600000;
  app.use(express.static(__dirname, { maxAge: oneYear }));
  app.use(errorhandler());
}

app.get('/pinboard/feed/', (req, res) => {
  const options = {
    host: 'feeds.pinboard.in',
    port: 443,
    path: '/json/v1/u:oyvinmar/',
  };
  proxy_responder(res, options);
});

app.get('/twitter/feed/', (req, res) => {
  const oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    '1.0A',
    null,
    'HMAC-SHA1',
  );

  const options = {
    host: 'https://api.twitter.com',
    path: '/1.1/statuses/user_timeline.json',
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  };
  oauth_proxy_responder(oauth, res, options);
});

app.get('/swarm/feed/', (req, res) => {
  const options = {
    host: 'api.foursquare.com',
    port: 443,
    path: `/v2/users/self/checkins?oauth_token=${
      process.env.FOURSQUARE_TOKEN
    }&m=swarm&v=20141808`,
  };
  proxy_responder(res, options);
});

app.get('/github/feed/', (req, res) => {
  const options = {
    host: 'api.github.com',
    port: 443,
    path: `/users/oyvinmar/events?access_token=${process.env.GITHUB_TOKEN}`,
    headers: { 'User-Agent': 'oyvinmar' },
  };
  proxy_responder(res, options);
});

var oauth_proxy_responder = function(oauth, res, options) {
  // Check cache
  if (handleCachedResponse(options.host, res)) {
    return;
  }

  oauth.get(
    options.host + options.path,
    options.access_token,
    options.access_token_secret,
    (e, data, response) => {
      if (e) {
        console.error(e);
      }
      cacheUpdate(options.host, Date.now(), data);
      res.set(response.headers);
      res.set('Content-Type', 'application/json');
      res.status(response.statusCode).send(data);
    },
  );
};

var proxy_responder = function(res, options) {
  // Check cache
  if (handleCachedResponse(options.host, res)) {
    return;
  }
  https
    .get(options, response => {
      // console.log("Got response: " + response.statusCode);
      handle_response(response, res, options.host);
    })
    .on('error', e => {
      console.log(`Got error: ${e.message}`);
    });
};

var handle_response = function(response, res, key) {
  let data = '';
  response.on('data', chunk => {
    data += chunk;
  });

  response.setEncoding('utf8');
  response.on('end', () => {
    cacheUpdate(key, Date.now(), data);
    res.set(response.headers);
    res.set('Content-Type', 'application/json');
    res.status(response.statusCode).send(data);
  });
};

const cache = {};

const CacheObject = function(timestamp, data) {
  this.timestamp = timestamp;
  this.data = data;
  return this;
};

var cacheUpdate = function(key, timestamp, data) {
  cache[key] = new CacheObject(timestamp, data);
};

const cacheLookup = function(key) {
  return cache[key];
};

var handleCachedResponse = function(key, res) {
  const co = cacheLookup(key);
  if (co && Date.now() - co.timestamp < 1000 * 60 * 15) {
    res.set('Content-Type', 'application/json');
    res.send(co.data);
    return true;
  }
  return false;
};
