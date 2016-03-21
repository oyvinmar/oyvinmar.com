import { combineReducers } from 'redux';
import lifestream from './lifestreamReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  lifestream,
  routing: routerReducer
});

export default rootReducer;
