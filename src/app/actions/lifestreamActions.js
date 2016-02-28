import fetch from 'isomorphic-fetch';
import { makeActionCreator } from '../util';

export const RECEIVE_TWITTER_STREAM = 'RECEIVE_TWITTER_STREAM';
export const RECEIVE_SWARM_STREAM = 'RECEIVE_SWARM_STREAM';
export const RECEIVE_PINBOARD_STREAM = 'RECEIVE_PINBOARD_STREAM';
export const RECEIVE_GITHUB_STREAM = 'RECEIVE_GITHUB_STREAM';

const receiveTwitterStream = makeActionCreator(RECEIVE_TWITTER_STREAM, 'data');
const receiveSwarmStream = makeActionCreator(RECEIVE_SWARM_STREAM, 'data');
const receivePinboardStream = makeActionCreator(RECEIVE_PINBOARD_STREAM, 'data');
const receiveGithubStream = makeActionCreator(RECEIVE_GITHUB_STREAM, 'data');

function fetchStream(dispatch, URL, action) {
  return fetch(URL)
  .then(response => response.json())
  .then(json => dispatch(action(json)));
}

export function fetchAllStreams() {
  return dispatch => {
    fetchStream(dispatch, '/twitter/feed/', receiveTwitterStream);
    fetchStream(dispatch, '/swarm/feed/', receiveSwarmStream);
    fetchStream(dispatch, '/pinboard/feed/', receivePinboardStream);
    fetchStream(dispatch, '/github/feed/', receiveGithubStream);
  };
}
