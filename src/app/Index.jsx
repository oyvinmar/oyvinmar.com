import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import '../styles/base.scss';
import './img/index';

import configureStore from './config/configureStore';
import HomePage from './home/HomePage';

const store = configureStore();

render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
  document.getElementById('react'),
);
