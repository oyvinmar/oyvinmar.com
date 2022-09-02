import { getTime } from '../../helpers';
import { Event } from '../../types';

interface Repo {
  name: string;
}

interface PR {
  number: number;
  html_url: string;
  user: User;
}

interface User {
  login: string;
}

interface Payload {
  action: string;
  pull_request: PR;
  distinct_size: number;
}

interface GithubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: Repo;
  payload: Payload;
}

const createGithubLink = (path: string) => {
  return `<a href="https://github.com/${path}">${path}</a>`;
};

const plural = (string: string, size: number) => {
  if (size > 1) {
    return `${string}s`;
  }
  return string;
};

export async function loader(): Promise<Event[]> {
  let response = await fetch('https://api.github.com/users/oyvinmar/events', {
    headers: {
      'User-Agent': 'oyvinmar',
      Authorization: process.env.GITHUB_TOKEN as string,
    },
  });

  const data: GithubEvent[] = await response.json();

  const getContent = (githubEvent: GithubEvent) => {
    let type = githubEvent.type;
    let action = githubEvent.payload.action;
    let repoName = githubEvent.repo.name;

    if (type === 'WatchEvent' && action === 'started') {
      return `Starred ${createGithubLink(repoName)}.`;
    } else if (type === 'PullRequestEvent' && action === 'closed') {
      let pr = githubEvent.payload.pull_request;
      let userLink = createGithubLink(pr.user.login);
      return `Closed pull request <a href="${pr.html_url}>${repoName}/${pr.number}</a> from ${userLink}`;
    } else if (type === 'PushEvent') {
      let size = githubEvent.payload.distinct_size;
      return `Pushed ${size > 1 ? size : 'a'} ${plural(
        'commit',
        size,
      )} to ${createGithubLink(repoName)}.`;
    }

    return '';
  };

  return data
    .map(
      (githubEvent): Event => ({
        id: githubEvent.id,
        url: `https://github.com/${githubEvent.repo.name}`,
        date: githubEvent.created_at,
        content: getContent(githubEvent),
        timestamp: getTime(githubEvent.created_at),
        serviceName: 'Github',
        serviceUrl: 'https://github.com/',
        group: [],
      }),
    )
    .filter((event) => event.content !== '');
}
