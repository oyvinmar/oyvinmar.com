const micro = require('micro');
const dotenv = require('dotenv');
dotenv.config();

const twitter = require('../twitter');
const swarm = require('../swarm');
const pinboard = require('../pinboard');
const github = require('../github');
const untappd = require('../untappd');
const strava = require('../strava');

const apiEndpoints = {
  twitter,
  swarm,
  pinboard,
  github,
  untappd,
  strava,
};

const apiHandler = (url) => {
  const match = url.match(/\/api\/(.+)\//i);

  if (match) {
    return apiEndpoints[match[1]];
  }

  return undefined;
};

const createServer = (middleware) =>
  micro((req, res) => {
    const endpoint = apiHandler(req.url);
    if (endpoint) {
      endpoint(req, res);
    } else {
      middleware(req, res);
    }
  });

module.exports = createServer;
