import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/uiActions';

const NavigationBar = ({ expanded, toogleNavBarLinks }) => {
    const navClassString = `collapse navbar-collapse${expanded ? ' in' : ''}`;
    return (
      <nav className="navbar navbar-default" id="nav" >
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              className="navbar-toggle"
              onClick={toogleNavBarLinks}
              type="button"
            >
              <span className="sr-only">Toggle navigation</span>
              <i className="fa fa-bars" />
            </button>
            <a className="navbar-brand" href="/">oyvinmar.com</a>
          </div>
          <div className={navClassString}>
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

NavigationBar.propTypes = {
  toogleNavBarLinks: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    toogleNavBarLinks: actions.toogleNavBarLinks,
  }, dispatch);

const mapStateToProps = (state) => ({
    expanded: state.ui.isNavBarExpanded
  });

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
