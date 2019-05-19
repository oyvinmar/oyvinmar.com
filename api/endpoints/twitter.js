const OAuth = require('oauth');
const { oauthProxyResponder } = require('../proxy');

module.exports = (req, res) => {
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
};
