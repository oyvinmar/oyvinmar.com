import '../styles/cv.scss';
import './img/index.js';

import React from 'react';
import { render } from 'react-dom';
import CVPage from './cv/CVPage';
const hash = window.hash;

render(
  <CVPage />,
  document.getElementById('react')
);
