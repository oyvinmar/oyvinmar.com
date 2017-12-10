import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import '../styles/base.scss';
import './img/index';

import HomePage from './home/HomePage';

render(<HomePage />, document.getElementById('react'));
