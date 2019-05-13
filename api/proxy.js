const https = require('https');

const cache = {};

function CacheObject(timestamp, data) {
  this.timestamp = timestamp;
  this.data = data;
  return this;
}

function cacheUpdate(key, timestamp, data) {
  cache[key] = new CacheObject(timestamp, data);
}

function cacheLookup(key) {
  return cache[key];
}

function handleCachedResponse(key, res) {
  const co = cacheLookup(key);
  if (co && Date.now() - co.timestamp < 1000 * 60 * 15) {
    res.set('Content-Type', 'application/json');
    res.send(co.data);
    return true;
  }
  return false;
}

function handleResponse(response, res, key) {
  let data = '';
  response.on('data', chunk => {
    data += chunk;
  });

  response.setEncoding('utf8');
  response.on('end', () => {
    cacheUpdate(key, Date.now(), data);
    res.set('Content-Type', 'application/json');
    res.status(response.statusCode).send(data);
  });
}

function oauthProxyResponder(oauth, res, options) {
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
      res.set('Content-Type', 'application/json');
      res.status(response.statusCode).send(data);
    },
  );
}

function proxyResponder(res, options) {
  // Check cache
  if (handleCachedResponse(options.host, res)) {
    return;
  }
  https
    .get(options, response => {
      // console.log("Got response: " + response.statusCode);
      handleResponse(response, res, options.host);
    })
    .on('error', e => {
      console.log(`Got error: ${e.message}`);
    });
}

module.exports = {
  proxyResponder,
  oauthProxyResponder,
};
