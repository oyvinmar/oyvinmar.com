const httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});

module.exports = async (req, res) => {
  console.log(req.url);
  req.url =
    req.url.replace(/^\/api\/polyline\//, '') +
    `&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  proxy.web(req, res, {
    target: 'https://maps.googleapis.com/maps/api/staticmap',
    changeOrigin: true,
  });
};
