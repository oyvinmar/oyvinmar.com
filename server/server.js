const express = require('express');

const path = require('path');
const { proxyResponder, oauthProxyResponder } = require('./proxy');
const OAuth = require('oauth');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const compression = require('compression');
const errorhandler = require('errorhandler');

const app = express();
const PORT = 4000;
const buildFolder = path.join(__dirname, '..', 'build');

console.log('Configure default settings.');
app.set('port', process.env.PORT || PORT);

app.use(compression());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(methodOverride());

if (app.get('env') === 'development') {
  console.log('Configure settings for development.');
  // app.use(express.static(buildFolder));
  app.use(errorhandler({ dumpExceptions: true, showStack: true }));
}

if (app.get('env') === 'production') {
  const oneYear = 31557600000;
  app.use(express.static(buildFolder, { maxAge: oneYear }));
  app.use(errorhandler());
}

app.get('/pinboard/feed/', (req, res) => {
  const options = {
    host: 'feeds.pinboard.in',
    port: 443,
    path: '/json/v1/u:oyvinmar/',
  };
  proxyResponder(res, options);
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
  oauthProxyResponder(oauth, res, options);
});

app.get('/swarm/feed/', (req, res) => {
  const options = {
    host: 'api.foursquare.com',
    port: 443,
    path: `/v2/users/self/checkins?oauth_token=${
      process.env.FOURSQUARE_TOKEN
    }&m=swarm&v=20141808`,
  };
  proxyResponder(res, options);
});

app.get('/github/feed/', (req, res) => {
  const options = {
    host: 'api.github.com',
    port: 443,
    path: `/users/oyvinmar/events?access_token=${process.env.GITHUB_TOKEN}`,
    headers: { 'User-Agent': 'oyvinmar' },
  };
  proxyResponder(res, options);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;