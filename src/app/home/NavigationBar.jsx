import React, { Component } from 'react';
import { Machine } from 'xstate';

const menuMachine = Machine({
  key: 'menu',
  initial: 'hidden',
  states: {
    hidden: {
      on: {
        TOGGLE: 'visible',
      },
    },
    visible: {
      on: {
        TOGGLE: 'hidden',
      },
    },
  },
});

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = { menuState: menuMachine.initial };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { menuState } = this.state;
    const nextMenuState = menuMachine.transition(menuState, 'TOGGLE').value;
    this.setState({ menuState: nextMenuState });
  }

  render() {
    const { menuState } = this.state;
    const isVisible = menuState === 'visible';
    const navClassString = `collapse navbar-collapse${isVisible ? ' in' : ''}`;
    return (
      <nav className="navbar navbar-default" id="nav">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              className="navbar-toggle"
              onClick={this.handleClick}
              type="button">
              <span className="sr-only">Toggle navigation</span>
              <i className="fa fa-bars" />
            </button>
            <a className="navbar-brand" href="/">
              oyvinmar.com
            </a>
          </div>
          <div className={navClassString}>
            <ul className="nav navbar-nav">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About me</a>
              </li>
              <li>
                <a href="#lifestream">Lifestream</a>
              </li>
              <li>
                <a href="#elsewhere">Elsewhere</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
