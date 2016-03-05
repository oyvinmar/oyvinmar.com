import 'babel-polyfill';

import './index.html';
import '../styles/base.scss';
import './img/index.js';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { ReduxRouter } from 'redux-router';
import configureStore from './config/configureStore';

import $ from 'jquery';
window.jQuery = $;

import 'bootstrap-sass/assets/javascripts/bootstrap/collapse';
import 'bootstrap-sass/assets/javascripts/bootstrap/scrollspy';
import 'bootstrap-sass/assets/javascripts/bootstrap/transition';

require('waypoints/lib/jquery.waypoints');
require('waypoints/lib/shortcuts/sticky');

import WelcomeHeader from './WelcomeHeader';
import NavigationBar from './NavigationBar';
import Lifestream from './Lifestream';
import About from './About';
import Elsewhere from './Elsewhere';
import Contact from './Contact';

(function () {
  var sticky;
  var FancyShmancy = function FancyShmancy() {
    this.init();
  };

  FancyShmancy.prototype.init = function () {
    this.fullscreenImage();
    this.initOnResize();
  };

  FancyShmancy.prototype.onLoad = function () {

    $('.splash').fadeOut(300);
    $('#content').fadeIn(1000);
    FancyShmancy.mobileMenuClone = $('#nav').clone().attr('id', 'navigation-mobile');

    this.fullscreenImage();
    this.addClickListeners();
    this.stickyNav();
    this.initScrollSpy();
  };

  FancyShmancy.prototype.stickyNav = function () {
    var windowWidth = $(window).width();

    // Show Menu or Hide the Menu
    if (windowWidth <= 768 && sticky) {
      sticky.destroy();
      sticky = undefined;
    } else if (windowWidth > 768 && !sticky) {
      sticky = new Waypoint.Sticky({
        element: $('.navbar'),
        stuckClass: 'navbar-fixed-top',
        wrapper: '<div class="sticky-wrapper" />'
      });
    }
  };

  FancyShmancy.prototype.fullscreenImage = function () {
    $('.welcome').css({height: ($(window).height() - $('.navbar').height())});
  };

  FancyShmancy.prototype.initOnResize = function () {
    var self = this;
    $(window).on('resize', function () {
      if ($('.welcome').length) {
        self.fullscreenImage();
      }
      self.stickyNav();

    });
  };

  FancyShmancy.prototype.addClickListeners = function () {
    $('.nav a').click(function (event) {
      event.preventDefault();
      var idStr = $(this).attr('href');
      $('html,body').animate({scrollTop: ($(idStr).offset().top - 30)}, 500);
    });

    $('.brand').click(function (event) {
      event.preventDefault();
      $('html,body').animate({scrollTop: 0}, 500);
    });

    $('#toggle-menu').click(function () {
      $('#links').toggle();
    });
  };

  FancyShmancy.prototype.initScrollSpy = function () {
    var $spy = $('body');
    $spy.scrollspy($spy.data());
  };

  window.app.FancyShmancy = FancyShmancy;
})();

window.app.fancyShmancy = new window.app.FancyShmancy();


$(function () {
  const store = configureStore();
  render(
    <Provider store={store}>
      <div>
        <WelcomeHeader/>
        <NavigationBar/>
        <About hash={window.hash}/>
        <Lifestream/>
        <Elsewhere/>
        <Contact/>
      </div>
    </Provider>,
    document.getElementById('react')
  );
  window.app.fancyShmancy.onLoad();
});
