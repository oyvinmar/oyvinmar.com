import React, { Component } from 'react';
import $ from 'jquery';
import 'bootstrap-sass/assets/javascripts/bootstrap/scrollspy';
import 'bootstrap-sass/assets/javascripts/bootstrap/transition';

import WelcomeHeader from './WelcomeHeader';
import NavigationBar from './NavigationBar';
import Lifestream from './Lifestream';
import About from './About';
import Elsewhere from './Elsewhere';
import Contact from './Contact';

window.jQuery = $;

require('waypoints/lib/jquery.waypoints');
require('waypoints/lib/shortcuts/sticky');


(function load() {
  let sticky;

  const FancyShmancy = function FancyShmancy() {
    this.init();
  };

  FancyShmancy.prototype.init = function init() {
    this.fullscreenImage();
    this.initOnResize();
  };

  FancyShmancy.prototype.onLoad = function onLoad() {

    FancyShmancy.mobileMenuClone = $('#nav').clone().attr('id', 'navigation-mobile');

    this.fullscreenImage();
    this.addClickListeners();
    this.stickyNav();
    this.initScrollSpy();
  };

  FancyShmancy.prototype.stickyNav = () => {
    const windowWidth = $(window).width();

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

  FancyShmancy.prototype.fullscreenImage = () => {
    $('.welcome').css({height: ($(window).height() - $('.navbar').height())});
  };

  FancyShmancy.prototype.initOnResize = function initOnResize() {
    const self = this;
    $(window).on('resize', () => {
      if ($('.welcome').length) {
        self.fullscreenImage();
      }
      self.stickyNav();

    });
  };

  FancyShmancy.prototype.addClickListeners = function addClickListeners() {
    $('.nav a').click(function click(event) {
      event.preventDefault();
      const idStr = $(this).attr('href');
      $('html,body').animate({scrollTop: ($(idStr).offset().top - 30)}, 500);
    });

    $('.brand').click((event) => {
      event.preventDefault();
      $('html,body').animate({scrollTop: 0}, 500);
    });

    $('#toggle-menu').click(() => {
      $('#links').toggle();
    });
  };

  FancyShmancy.prototype.initScrollSpy = () => {
    const $spy = $('body');
    $spy.scrollspy($spy.data());
  };

  window.app.FancyShmancy = FancyShmancy;
})();

window.app.fancyShmancy = new window.app.FancyShmancy();

export default class HomePage extends Component {
  componentDidMount() {
    window.app.fancyShmancy.onLoad();
  }

  render() {
    return (
      <div id="content">
        <WelcomeHeader />
        <NavigationBar />
        <About />
        <Lifestream />
        <Elsewhere />
        <Contact />
      </div>
    );
  }
}
