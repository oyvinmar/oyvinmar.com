const Bundler = require('parcel-bundler');
const createServer = require('./api');

const file = 'index.html'; // Pass an absolute path to the entrypoint here
const options = {}; // See options section of api docs, for the possibilities

// Initialize a new bundler using a file and options
const bundler = new Bundler(file, options);

const middleware = bundler.middleware();

const server = createServer(middleware);

// Listen on port 8080
server.listen(8080);
