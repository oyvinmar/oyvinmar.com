'use strict';

$(function() {
  window.app = new window.AppController();


  function addClickListeners() {

    $('.nav a').click(function(event){
      event.preventDefault();
      var idStr = $(this).attr('href');
      $('html,body').animate({scrollTop: $(idStr).offset().top},500);
    });

    $('.brand').click(function(event){
      event.preventDefault();
      $('html,body').animate({scrollTop: 0},500);
    });

    $('#toggle-menu').click(function(){
      $('#links').toggle();
    });
  }

  function initScrollSpy(){
    var $spy = $('body');
    $spy.scrollspy($spy.data());
  }

  $('.navbar').waypoint('sticky', {
    stuckClass: 'navbar-fixed-top',
    wrapper: '<div class="sticky-wrapper" />'
  });

  function mail2(name, domain) {
    var addr = name + '@' + domain;
    $('#email').append(' <a href="mailto:' + addr + '">' + addr + '</a>');
  }

  initScrollSpy();

  // Add mailto
  mail2('oyvinmar' , 'gmail.com');

  addClickListeners();

});

