import React, { Component } from 'react';
import CV from './CV';

class CVPage extends Component {
  constructor(props) {
    super();
    const hash = window.hash;
    $('body').css('background-color', '#FFF');
    $('#stylesheet').attr('href',`/css/cv.${hash}.css`);
  }

  render() {
    return (
      <CV hash={window.hash}/>
    );
  }
}

export default CVPage;
