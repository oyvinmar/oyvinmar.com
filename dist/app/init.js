'use strict';

function fullscreenImage() {
  $('.welcome').css({height: ($(window).height() - $('.navbar').height())});
}
fullscreenImage();

$(function () {
  window.app = new window.AppController();

  $('#content').fadeIn(1000);
  $('.splash').fadeOut(300);

  function addClickListeners() {

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
  }

  function initScrollSpy() {
    var $spy = $('body');
    $spy.scrollspy($spy.data());
  }

  function mail2(name, domain) {
    var addr = name + '@' + domain;
    $('#email').append(' <a href="mailto:' + addr + '">' + addr + '</a>');
  }


  $(window).on('resize', function () {
    if ($('.welcome').length) {
      fullscreenImage();
    }
  });

  $(window).stellar({
    horizontalScrolling: false,
    responsive: true
  });


  $('.navbar').waypoint('sticky', {
    stuckClass: 'navbar-fixed-top',
    wrapper: '<div class="sticky-wrapper" />'
  });

  initScrollSpy();

  // Add mailto
  mail2('oyvinmar', 'gmail.com');

  addClickListeners();

});

