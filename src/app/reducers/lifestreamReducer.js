import {
  RECEIVE_TWITTER_STREAM,
  RECEIVE_SWARM_STREAM,
  RECEIVE_PINBOARD_STREAM,
  RECEIVE_GITHUB_STREAM,
  SHOW_MORE_EVENTS
} from '../actions/lifestreamActions';

function createEvent(id, content, url, serviceName, serviceUrl, timestamp) {
  return {
    id,
    content,
    url,
    serviceName,
    serviceUrl,
    hidden: false,
    timestamp
  };
}

function mapTweets(tweets) {
  return tweets.map((tweet) => {
    const date = new Date(tweet.created_at);
    let text = tweet.text;
    tweet.entities.urls.forEach((url) => {
      text = text.replace(url.url, `<a href="${  url.url  }">${  url.url  }</a>`);
    });
    return createEvent(`${tweet.id  }twi`, text, `https://twitter.com/#!/oyvinmar/status/${  tweet.id}`, 'Twitter', 'http://twitter.com', date);
  });
}

const createGithubLink = (path) => `<a href="https://github.com/${  path  }">${  path  }</a>`;

const plural = (string, count) => {
  if (count > 1) {
    return `${string  }s`;
  }
    return string;

};

function mapGithubEvents(events) {
  return events.map((githubEvent) => {
    let description = '';
    if (githubEvent.type === 'WatchEvent') {
      description = `Starred ${  createGithubLink(githubEvent.repo.name)}`;
    } else if (githubEvent.type === 'PushEvent') {
      const commitText = plural(' commit', githubEvent.payload.distinct_size);
      description = `Pushed ${  commitText  } to ${  createGithubLink(githubEvent.repo.name)}`;
    } else if (githubEvent.type === 'PullRequestEvent' && githubEvent.payload.action === 'closed') {
      const pullRequest = githubEvent.payload.pull_request;
      description = `Closed pull request <a href="${  pullRequest.html_url  }">${
      githubEvent.repo.name  }#${  pullRequest.number  }</a> from ${  createGithubLink(pullRequest.user.login)}`;
    }
    // TODO: Handle create event
    return createEvent(`${githubEvent.id  }gh`, description, `https://github.com/${  githubEvent.repo.name}`, 'Github',
      'https://github.com', new Date(githubEvent.created_at));
  }).filter(e => e.content !== '');
}

function mapBookmarks(bookmarks) {
  return bookmarks.map((bookmark, index) => createEvent(`${index  }pin`, bookmark.d, bookmark.u, 'Pinboard.in', 'http://pinboard.in/', new Date(bookmark.dt)));
};

function mapCheckins(checkins) {
  return checkins.map(checkin => {
    let description = `Checked in at ${  checkin.venue.name}`;
    if (checkin.venue.hereNow) {
      description += ` with ${  checkin.venue.hereNow  } others`;
    }
    description += '.';
    return createEvent(`${checkin.id  }sw`, description, `https://foursquare.com/v/${  checkin.venue.id}`, 'Swarm',
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
