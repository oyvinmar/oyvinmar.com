import { combineReducers } from 'redux';
import lifestream from './lifestreamReducer';
import uiReducer from './uiReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  lifestream,
  routing: routerReducer,
  ui: uiReducer,
});

export default rootReducer;
