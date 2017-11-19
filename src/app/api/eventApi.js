import fetch from 'isomorphic-fetch';

function createEvent(id, content, url, serviceName, serviceUrl, timestamp) {
  return {
    id,
    content,
    url,
    serviceName,
    serviceUrl,
    hidden: false,
    timestamp,
  };
}

function mapTweets(tweets) {
  return tweets.map(tweet => {
    const date = new Date(tweet.created_at);
    let { text } = tweet;
    tweet.entities.urls.forEach(url => {
      text = text.replace(url.url, `<a href="${url.url}">${url.url}</a>`);
    });
    return createEvent(
      `${tweet.id}twi`,
      text,
      `https://twitter.com/#!/oyvinmar/status/${tweet.id}`,
      'Twitter',
      'http://twitter.com',
      date,
    );
  });
}

const createGithubLink = path =>
  `<a href="https://github.com/${path}">${path}</a>`;

const plural = (string, count) => {
  if (count > 1) {
    return `${string}s`;
  }
  return string;
};

function mapGithubEvents(events) {
  return events
    .map(githubEvent => {
      let description = '';
      if (githubEvent.type === 'WatchEvent') {
        description = `Starred ${createGithubLink(githubEvent.repo.name)}`;
      } else if (githubEvent.type === 'PushEvent') {
        const commitText = plural(' commit', githubEvent.payload.distinct_size);
        description = `Pushed ${commitText} to ${createGithubLink(
          githubEvent.repo.name,
        )}`;
      } else if (
        githubEvent.type === 'PullRequestEvent' &&
        githubEvent.payload.action === 'closed'
      ) {
        const pullRequest = githubEvent.payload.pull_request;
        description = `Closed pull request <a href="${pullRequest.html_url}">${githubEvent
          .repo.name}#${pullRequest.number}</a> from ${createGithubLink(
          pullRequest.user.login,
        )}`;
      }
      // TODO: Handle create event
      return createEvent(
        `${githubEvent.id}gh`,
        description,
        `https://github.com/${githubEvent.repo.name}`,
        'Github',
        'https://github.com',
        new Date(githubEvent.created_at),
      );
    })
    .filter(e => e.content !== '');
}

function mapBookmarks(bookmarks) {
  return bookmarks.map((bookmark, index) =>
    createEvent(
      `${index}pin`,
      bookmark.d,
      bookmark.u,
      'Pinboard.in',
      'http://pinboard.in/',
      new Date(bookmark.dt),
    ),
  );
}

function mapCheckins(checkins) {
  return checkins.map(checkin => {
    let description = `Checked in at ${checkin.venue.name}`;
    if (checkin.venue.hereNow) {
      description += ` with ${checkin.venue.hereNow} others`;
    }
    description += '.';
    return createEvent(
      `${checkin.id}sw`,
      description,
      `https://foursquare.com/v/${checkin.venue.id}`,
      'Swarm',
      'http://foursquare.com',
      new Date(checkin.createdAt * 1000),
    );
  });
}

async function fetchStream(URL, processJson = json => json) {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    return processJson(json);
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error(e);
    }
    return [];
  }
}

export default async function fetchAllEvents() {
  const [tweets, checkins, bookmarks, ghEvents] = [
    await fetchStream('/twitter/feed/'),
    await fetchStream('/swarm/feed/', data => data.response.checkins.items),
    await fetchStream('/pinboard/feed/'),
    await fetchStream('/github/feed/'),
  ];

  return [
    ...mapTweets(tweets),
    ...mapCheckins(checkins),
    ...mapGithubEvents(ghEvents),
    ...mapBookmarks(bookmarks),
  ];
}
