import { createStore, applyMiddleware, compose } from 'redux';
// import { reduxReactRouter } from 'redux-router';
// import createHistory from 'history/lib/createHashHistory';
// import routes from '../routes';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const logger = createLogger({
  collapsed: true
});

const createStoreWithMiddleware = compose(
  applyMiddleware( thunkMiddleware, logger )
  // reduxReactRouter({ routes, createHistory })
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
