var request = require('superagent');

var AppDispatcher = require('./AppDispatcher');
var LifestreamConstants = require('./LifestreamConstants');

var LifestreamActions = {

  load: function() {
    request
      .get('/twitter/feed/')
      .set('Accept', 'application/json')
      .end(function (res){
        console.log(res);
        AppDispatcher.handleViewAction({
          actionType: LifestreamConstants.LIFESTREAM_LOAD,
          data: res.body
        });
      });
  }
};

module.exports = LifestreamActions;