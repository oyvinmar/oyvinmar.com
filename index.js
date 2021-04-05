const { apiHandler } = require('./api/serve');
const { createServer } = require('vite');

async function create() {
  const vite = await createServer({
    // server: { middlewareMode: true },
  });

  vite.middlewares.stack.splice(2, 0, {
    route: '',
    handle: async (req, res, next) => {
      const endpoint = apiHandler(req.url);
      if (endpoint) {
        endpoint(req, res);
      } else {
        next();
      }
    },
  });

  vite.listen(8080);
}

create();
