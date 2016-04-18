import { combineReducers } from 'redux';
import lifestream from './lifestreamReducer';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
  lifestream,
  ui: uiReducer,
});

export default rootReducer;
