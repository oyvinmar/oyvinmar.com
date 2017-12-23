var app = require('./server');
var path = require('path');

module.exports = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
