'use strict';

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

    this.fullscreenImage();
    this.addClickListeners();
    this.initStellar();
    this.initWaypoints();
    this.initScrollSpy();
    this.mail2('oyvinmar', 'gmail.com');
  };

  FancyShmancy.prototype.initWaypoints = function () {
    $('.navbar').waypoint('sticky', {
      stuckClass: 'navbar-fixed-top',
      wrapper: '<div class="sticky-wrapper" />'
    });
  };

  FancyShmancy.prototype.initStellar = function () {
    $(window).stellar({
      horizontalScrolling: false,
      responsive: true
    });
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
  window.app.lifestream = new window.app.LifestreamController();
  window.app.fancyShmancy.onLoad();
});

