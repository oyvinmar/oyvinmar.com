const { proxyResponder } = require('./proxy');

module.exports = (req, res) => {
  const options = {
    host: 'api.untappd.com',
    port: 443,
    path: `/v4/user/checkins/oyvinmar?client_id=${process.env.UNTAPPD_CLIENT_ID}&client_secret=${process.env.UNTAPPD_CLIENT_SECRET}`,
  };
  proxyResponder(res, options);
};
