#!/usr/bin/env node

const github = require('octonode');
const spawn = require('cross-spawn-promise');
const normalizeUrl = require('normalize-url');
const urlRegex = require('url-regex');

if (!process.env.CI || !process.env.TRAVIS) {
  throw new Error('Could not detect Travis CI environment');
}

const { NOW_TOKEN: nowToken, GH_TOKEN: githubToken } = process.env;
const client = github.client(githubToken);
const ghRepo = client.repo(process.env.TRAVIS_REPO_SLUG);
const providedArgs = process.argv.slice(2);

function isFork() {
  const { TRAVIS_PULL_REQUEST_SLUG, TRAVIS_REPO_SLUG } = process.env;
  if (!TRAVIS_PULL_REQUEST_SLUG) {
    return false;
  }
  const [prOwner] = TRAVIS_PULL_REQUEST_SLUG.split('/');
  const [owner] = TRAVIS_REPO_SLUG.split('/');
  return owner !== prOwner;
}

function getUrl(content) {
  const urls = content.match(urlRegex()) || [];

  return urls.map(url => normalizeUrl(url.trim().replace(/\.+$/, '')))[0];
}

function logError(message) {
  return function(error) {
    if (error) {
      console.log(message, error);
    }
  };
}

function safeify(s, safed = []) {
  if (safed.indexOf(s) !== -1) {
    return 'CIRCULAR';
  }
  safed.push(s);
  if (typeof s === 'string') {
    return s
      .split(nowToken)
      .join('NOW_TOKEN')
      .split(githubToken)
      .join('GITHUB_TOKEN');
  } else if (typeof s === 'object' && s !== null) {
    return Object.keys(s).reduce((acc, k) => {
      acc[k] = safeify(s, safed);
      return acc;
    }, {});
  }
  return s;
}

function safeLog(...args) {
  const safeArgs = args.map(s => safeify(s));
  console.log(...safeArgs);
}

function safeError(...args) {
  const safeArgs = args.map(s => safeify(s));
  console.error(...safeArgs);
}

function updateStatus(sha, options) {
  const { description, target_url: url } = options;
  console.log(`${description}: ${url}`);
  ghRepo.status(sha, options, logError('setting complete status'));
}

function onError(sha, err) {
  safeError(err);
  updateStatus(sha, {
    state: 'error',
    description: `▲ Now deployment failed. See Travis logs for details.`,
  });
}

async function spawnDeploy(sha) {
  const cliArgs = ['--token', nowToken, '--no-clipboard', ...providedArgs];
  safeLog('spawning shell with command:', `now ${cliArgs.join(' ')}`);
  try {
    const result = await spawn('now', cliArgs);
    return result.toString();
  } catch (error) {
    onError(sha, error);
    throw error;
  }
}

async function deploy(sha) {
  if (isFork()) {
    console.log(`▲ Now deployment is skipped for forks...`);
    return;
  }

  if (!githubToken) {
    throw new Error('Missing required environment variable GH_TOKEN');
  }

  if (!nowToken) {
    throw new Error('Missing required environment variable NOW_TOKEN');
  }
  const { TRAVIS_REPO_SLUG, TRAVIS_BUILD_ID } = process.env;
  let targetUrl = `https://travis-ci.org/${TRAVIS_REPO_SLUG}/builds/${TRAVIS_BUILD_ID}`;

  updateStatus(sha, {
    target_url: targetUrl,
    state: 'pending',
    description: `▲ Now deployment starting`,
  });

  console.log(`🤠 Alrighty, deploy starting`);

  const result = await spawnDeploy(sha);
  targetUrl = getUrl(result);

  console.log(`💪 Deploy finished!`);

  updateStatus(sha, {
    target_url: targetUrl,
    state: 'success',
    description: `▲ Now deployment complete`,
  });

  console.log('🏁 all done!');
}

const {
  TRAVIS_EVENT_TYPE,
  TRAVIS_PULL_REQUEST_SHA,
  TRAVIS_PULL_REQUEST,
  TRAVIS_COMMIT,
  TRAVIS_BRANCH,
} = process.env;

switch (TRAVIS_EVENT_TYPE) {
  case 'pull_request': {
    deploy(TRAVIS_PULL_REQUEST_SHA);
    break;
  }
  case 'push': {
    if (TRAVIS_PULL_REQUEST !== 'false' || TRAVIS_BRANCH === 'master') {
      deploy(TRAVIS_COMMIT);
    } else {
      console.log(`Skip deploy of commits not updating a PR`);
    }
    break;
  }
  default: {
    console.log(`${TRAVIS_EVENT_TYPE} is not supported by now-travis`);
  }
}
