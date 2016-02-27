import request from 'superagent';
import AppDispatcher from './AppDispatcher';
import LifestreamConstants from './LifestreamConstants';

var LifestreamActions = {

  load: function () {
    request
      .get('/twitter/feed/')
      .end(function (res) {
        AppDispatcher.handleViewAction({
          actionType: LifestreamConstants.LOAD_TWEETS_SUCCESS,
          data: res.body
        });
      });

    request
      .get('/swarm/feed/')
      .end(function (res) {
        AppDispatcher.handleViewAction({
          actionType: LifestreamConstants.LOAD_CHECKINS_SUCCESS,
          data: res.body
        });
      });

    request
      .get('/pinboard/feed/')
      .end(function (res) {
        AppDispatcher.handleViewAction({
          actionType: LifestreamConstants.LOAD_PINBOARD_SUCCESS,
          data: res.body
        });
      });

    request
      .get('/github/feed/')
      .end(function (res) {
        AppDispatcher.handleViewAction({
          actionType: LifestreamConstants.LOAD_GITHUB_SUCCESS,
          data: res.body
        });
      });
  }
};

export default LifestreamActions;
