import React, { PropTypes } from 'react';

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-default" id="nav" role="navigation">
        <div className="container-fluid">
            <div className="navbar-header">
                <button className="navbar-toggle"
                        data-target=".omw-navbar-collapse"
                        data-toggle="collapse"
                        type="button">
                    <span className="sr-only">Toggle navigation</span>
                    <i className="fa fa-bars"></i>
                </button>
                <a className="navbar-brand" href="#">oyvinmar.com</a>
            </div>
            <div className="collapse navbar-collapse omw-navbar-collapse">
              <ul className="nav navbar-nav">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About me</a></li>
                <li><a href="#lifestream">Lifestream</a></li>
                <li><a href="#elsewhere">Elsewhere</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
        </div>
    </nav>
  );
};

export default NavigationBar;
