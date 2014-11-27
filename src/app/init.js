'use strict';

var $ = require('jq');
var React = require('react');
require('jquery-waypoints-sticky');
require('collapse');
require('scrollspy');


(function () {
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
    this.mail2('oyvinmar', 'gmail.com');
  };

  FancyShmancy.prototype.stickyNav = function () {
    var windowWidth = $(window).width();
    var isSticky = $('.sticky-wrapper').length > 0;

    // Show Menu or Hide the Menu
    if (windowWidth <= 768 && isSticky) {
      $('.navbar').waypoint('unsticky');
    } else if (windowWidth > 768 && !isSticky) {
      $('.navbar').waypoint('sticky', {
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

  FancyShmancy.prototype.mail2 = function (name, domain) {
    var addr = name + '@' + domain;
    $('#email').append(' <a href="mailto:' + addr + '">' + addr + '</a>');
  };

  window.app.FancyShmancy = FancyShmancy;
})();

window.app.fancyShmancy = new window.app.FancyShmancy();


$(function () {
  var lifestream = require('./Index.jsx');
  var el = React.createElement(lifestream, null, null);
  React.render(el, document.getElementById('stream'));
  window.app.fancyShmancy.onLoad();
});

