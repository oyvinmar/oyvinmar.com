const { proxyResponder } = require('../proxy');

module.exports = (req, res) => {
  const options = {
    host: 'api.github.com',
    port: 443,
    path: `/users/oyvinmar/events?access_token=${process.env.GITHUB_TOKEN}`,
    headers: { 'User-Agent': 'oyvinmar' },
  };
  proxyResponder(res, options);
};
