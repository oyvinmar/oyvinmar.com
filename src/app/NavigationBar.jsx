import React, { PropTypes } from 'react';

const NavigationBar = () => {
  return (
    <nav id="nav" className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
            <div className="navbar-header">
                <button className="navbar-toggle" type="button" data-toggle="collapse"
                        data-target=".omw-navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <i className="fa fa-bars"></i>
                </button>
                <a href="#" className="navbar-brand">oyvinmar.com</a>
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
