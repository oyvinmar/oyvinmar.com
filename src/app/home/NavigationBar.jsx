import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toogleNavBarLinks } from '../actions/uiActions';

class NavigationBar extends Component {
  render (){
    const { expanded, toogleNavBarLinks } = this.props;
    const navClassString = `collapse navbar-collapse${expanded ? ' in' : ''}`;
    return (
      <nav className="navbar navbar-default" id="nav" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button className="navbar-toggle"
              onClick={toogleNavBarLinks}
              type="button">
              <span className="sr-only">Toggle navigation</span>
              <i className="fa fa-bars"></i>
            </button>
            <a className="navbar-brand" href="#">oyvinmar.com</a>
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
  }
}

NavigationBar.propTypes = {
  toogleNavBarLinks: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toogleNavBarLinks,
  }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    expanded: state.ui.isNavBarExpanded
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
