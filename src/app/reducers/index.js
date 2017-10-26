import { combineReducers } from 'redux';
import lifestream from './lifestreamReducer';

const rootReducer = combineReducers({
  lifestream,
});

export default rootReducer;
