import 'babel-polyfill';

import './index.html';
import '../styles/base.scss';
import './img/index.js';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, IndexRoute, Route, browserHistory, hashHistory } from 'react-router';
import configureStore from './config/configureStore';
import HomePage from './home/HomePage';
import CVPage from './cv/CVPage';
const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store)

render(
  <Provider store={store}>
     <Router history={history}>
       <Route path="/">
        <IndexRoute component={HomePage}/>
        <Route path="cv/" component={CVPage}/>
      </Route>
    <HomePage/>
    </Router>
  </Provider>,
  document.getElementById('react')
);
