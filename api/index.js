const micro = require('micro');
const dotenv = require('dotenv');
dotenv.config();

const twitter = require('./endpoints/twitter');
const swarm = require('./endpoints/swarm');
const pinboard = require('./endpoints/pinboard');
const github = require('./endpoints/github');

const apiEndpoints = {
  twitter,
  swarm,
  pinboard,
  github,
};

const apiHandler = url => {
  const match = url.match(/\/api\/(.+)\//i);

  if (match) {
    return apiEndpoints[match[1]];
  }

  return undefined;
};

const createServer = middleware =>
  micro((req, res) => {
    const endpoint = apiHandler(req.url);
    if (endpoint) {
      endpoint(req, res);
    } else {
      middleware(req, res);
    }
  });

module.exports = createServer;
