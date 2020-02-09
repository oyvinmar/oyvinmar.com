const { proxyResponder } = require('./proxy');

module.exports = (req, res) => {
  const options = {
    host: 'api.github.com',
    port: 443,
    path: `/users/oyvinmar/events`,
    headers: {
      'User-Agent': 'oyvinmar',
      Authorization: process.env.GITHUB_TOKEN,
    },
  };
  proxyResponder(res, options);
};
