import {
  RECEIVE_TWITTER_STREAM,
  RECEIVE_SWARM_STREAM,
  RECEIVE_PINBOARD_STREAM,
  RECEIVE_GITHUB_STREAM,
  SHOW_MORE_EVENTS
} from '../actions/lifestreamActions';

function createEvent(id, content, url, service_name, service_url, timestamp) {
  return {
    id,
    content,
    url,
    service_name,
    service_url,
    hidden: false,
    timestamp
  };
}

function mapTweets(tweets) {
  return tweets.map((tweet) => {
    const date = new Date(tweet.created_at);
    let text = tweet.text;
    tweet.entities.urls.forEach(function (url) {
      text = text.replace(url.url, '<a href="' + url.url + '">' + url.url + '</a>');
    });
    return createEvent(tweet.id + 'twi', text, 'https://twitter.com/#!/oyvinmar/status/' + tweet.id, 'Twitter', 'http://twitter.com', date);
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

function mapGithubEvents(events) {
  return events.map((github_event) => {
    let description = '';
    if (github_event.type === 'WatchEvent') {
      description = 'Starred ' + createGithubLink(github_event.repo.name);
    } else if (github_event.type === 'PushEvent') {
      let commit_text = plural(' commit', github_event.payload.distinct_size);
      description = 'Pushed ' + commit_text + ' to ' + createGithubLink(github_event.repo.name);
    } else if (github_event.type === 'PullRequestEvent' && github_event.payload.action === 'closed') {
      let pull_request = github_event.payload.pull_request;
      description = 'Closed pull request <a href="' + pull_request.html_url + '">' +
      github_event.repo.name + '#' + pull_request.number + '</a> from ' + createGithubLink(pull_request.user.login);
    }
    // TODO: Handle create event
    return createEvent(github_event.id + 'gh', description, 'https://github.com/' + github_event.repo.name, 'Github',
      'https://github.com', new Date(github_event.created_at));
  }).filter(e => e.content !== '');
}

function mapBookmarks(bookmarks) {
  return bookmarks.map((bookmark, index) => {
    return createEvent(index + 'pin', bookmark.d, bookmark.u, 'Pinboard.in', 'http://pinboard.in/', new Date(bookmark.dt));
  });
};

function mapCheckins(checkins) {
  return checkins.map(checkin => {
    let description = 'Checked in at ' + checkin.venue.name;
    if (checkin.venue.hereNow) {
      description += ' with ' + checkin.venue.hereNow + ' others';
    }
    description += '.';
    return createEvent(checkin.id + 'sw', description, 'https://foursquare.com/v/' + checkin.venue.id, 'Swarm',
      'http://foursquare.com', new Date(checkin.createdAt * 1000));
  });
};

export default function lifestream(state = {events: [], numberOfVisibleEvents: 5}, action) {
  switch (action.type) {
  case RECEIVE_TWITTER_STREAM:
    return Object.assign({}, state, {
      events: state.events.concat(mapTweets(action.data))
    });
  case RECEIVE_SWARM_STREAM:
    return Object.assign({}, state, {
      events: state.events.concat(mapCheckins(action.data.response.checkins.items))
    });
  case RECEIVE_PINBOARD_STREAM:
    return Object.assign({}, state, {
      events: state.events.concat(mapBookmarks(action.data))
    });
  case RECEIVE_GITHUB_STREAM:
    return Object.assign({}, state, {
      events: state.events.concat(mapGithubEvents(action.data))
    });
  case SHOW_MORE_EVENTS:
    return Object.assign({}, state, {
      numberOfVisibleEvents: state.numberOfVisibleEvents + action.additionalEventsToShow
    });
  default:
    return state;
  }
}
