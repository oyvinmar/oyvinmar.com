import React from 'react';
import { render } from 'react-dom';

import '../styles/cv.scss';
import './img/index';

import CVPage from './cv/CVPage';

render(<CVPage />, document.getElementById('react'));
