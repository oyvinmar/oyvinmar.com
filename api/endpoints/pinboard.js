const { proxyResponder } = require('../proxy');

module.exports = (req, res) => {
  const options = {
    host: 'feeds.pinboard.in',
    port: 443,
    path: '/json/v1/u:oyvinmar/',
  };
  proxyResponder(res, options);
};
