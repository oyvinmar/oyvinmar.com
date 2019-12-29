const { proxyResponder } = require('./proxy');

module.exports = (req, res) => {
  const options = {
    host: 'api.foursquare.com',
    port: 443,
    path: `/v2/users/self/checkins?oauth_token=${process.env.FOURSQUARE_TOKEN}&m=swarm&v=20141808`,
  };
  proxyResponder(res, options);
};
