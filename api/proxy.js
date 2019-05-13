const https = require('https');

function handleResponse(response, res) {
  let data = '';
  response.on('data', chunk => {
    data += chunk;
  });

  response.setEncoding('utf8');
  response.on('end', () => {
    res.set('Content-Type', 'application/json');
    res.status(response.statusCode).send(data);
  });
}

function oauthProxyResponder(oauth, res, options) {
  oauth.get(
    options.host + options.path,
    options.access_token,
    options.access_token_secret,
    (e, data, response) => {
      if (e) {
        console.error(e);
      }
      res.set('Content-Type', 'application/json');
      res.status(response.statusCode).send(data);
    },
  );
}

function proxyResponder(res, options) {
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
