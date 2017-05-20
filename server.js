var app = require('./app');
var path = require('path');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'assets/index.html'));
});

app.get('/cv/', function(req, res) {
  res.sendFile(path.join(__dirname, 'assets/cv.html'));
});

module.exports = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
