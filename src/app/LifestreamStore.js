var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('./AppDispatcher');
var LifestreamConstants = require('./LifestreamConstants');

var _events = [];

function createEvent(id, content, url, service_name, service_url, timestamp) {
  return {
    id: id,
    content: content,
    url: url,
    service_name: service_name,
    service_url: service_url,
    hidden: false,
    timestamp: timestamp
  };
}

function handleTweets(tweets) {
  tweets.forEach(function (tweet) {
    var date = new Date(tweet.created_at);
    var text = tweet.text;
    tweet.entities.urls.forEach(function (url) {
      text = text.replace(url.url, '<a href="' + url.url + '">' + url.url + '</a>');
    });
    var event = createEvent(tweet.id + 'twi', text, 'https://twitter.com/#!/oyvinmar/status/' + tweet.id, 'Twitter', 'http://twitter.com', date);
    _events.push(event);
  });
}

var createGithubLink = function (path) {
  return '<a href="https://github.com/' + path + '">' + path + '</a>';
};

var plural = function (string, count) {
  if (count > 1) {
    return string + 's';
  } else {
    return string;
  }
};

function handleGithubEvents(events) {
  events.forEach(function (github_event) {
    var description;
    if (github_event.type === 'WatchEvent') {
      description = 'Starred ' + createGithubLink(github_event.repo.name);
    } else if (github_event.type === 'PushEvent') {
      var commit_text = plural(' commit', github_event.payload.distinct_size);
      description = 'Pushed ' + commit_text + ' to ' + createGithubLink(github_event.repo.name);
    } else if (github_event.type === 'PullRequestEvent' && github_event.payload.action === 'closed') {
      var pull_request = github_event.payload.pull_request;
      description = 'Closed pull request <a href="' + pull_request.html_url + '">' +
      github_event.repo.name + '#' + pull_request.number + '</a> from ' + createGithubLink(pull_request.user.login);
    }
    // TODO: Handle create event

    if (description) {
      var event = createEvent(github_event.id + 'gh', description, 'https://github.com/' + github_event.repo.name, 'Github',
        'https://github.com', new Date(github_event.created_at));
      _events.push(event);
    }
  });
}

var handleBookmarks = function (bookmarks) {
  bookmarks.forEach(function (bookmark, index) {
    var event = createEvent(index + 'pin', bookmark.d, bookmark.u, 'Pinboard.in', 'http://pinboard.in/', new Date(bookmark.dt));
    _events.push(event);
  });
};

var handleCheckins = function (checkins) {
  checkins.forEach(function (checkin) {
    var description = 'Checked in at ' + checkin.venue.name;
    if (checkin.venue.hereNow) {
      description += ' with ' + checkin.venue.hereNow + ' others';
    }
    description += '.';
    var event = createEvent(checkin.id + 'sw', description, 'https://foursquare.com/v/' + checkin.venue.id, 'Swarm',
      'http://foursquare.com', new Date(checkin.createdAt * 1000));
    _events.push(event);
  });
};

var CHANGE_EVENT = 'change';

var LifestreamStore = assign({}, EventEmitter.prototype, {

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  getAll: function () {
    return _events;
  },
  /**
   * @param {function} callback
   */
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {
    case LifestreamConstants.LOAD_TWEETS_SUCCESS:
      handleTweets(action.data);
      break;
    case LifestreamConstants.LOAD_GITHUB_SUCCESS:
      handleGithubEvents(action.data);
      break;
    case LifestreamConstants.LOAD_CHECKINS_SUCCESS:
      handleCheckins(action.data.response.checkins.items);
      break;
    case LifestreamConstants.LOAD_PINBOARD_SUCCESS:
      handleBookmarks(action.data);
      break;


    default:
      return true;
  }

  LifestreamStore.emitChange();

  return true;
});

module.exports = LifestreamStore;
