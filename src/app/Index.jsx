import 'babel-polyfill';

import '../styles/base.scss';
import './img/index.js';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './config/configureStore';
import HomePage from './home/HomePage';
import CVPage from './cv/CVPage';
const store = configureStore();

render(
  <Provider store={store}>
    <HomePage/>
  </Provider>,
  document.getElementById('react')
);
