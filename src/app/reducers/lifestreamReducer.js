import {
  RECEIVE_TWITTER_STREAM,
  RECEIVE_SWARM_STREAM,
  RECEIVE_PINBOARD_STREAM,
  RECEIVE_GITHUB_STREAM
} from '../actions/lifestreamActions';

export default function lifestream(state = {}, action) {
  switch (action.type) {
  case RECEIVE_TWITTER_STREAM:
    console.log(action.data);
    return state;
  case RECEIVE_SWARM_STREAM:
    console.log(action.data);
    return state;
  case RECEIVE_PINBOARD_STREAM:
    console.log(action.data);
    return state;
  case RECEIVE_GITHUB_STREAM:
    console.log(action.data);
    return state;
  default:
    return state;
  }
}
