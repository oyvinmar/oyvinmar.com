const app = require('./server');

module.exports = app.listen(4000, () => {
  console.log(`Express server listening on port 4000`);
});
