$(function() {
  var apt = new AppController();
  window.app = apt;

  var $spy = $('body');
  $spy.scrollspy($spy.data());

  mail2("oyvinmar" , "gmail.com");

  $('.nav a').click(function(event){
    event.preventDefault();
    var idStr = $(this).attr('href');
    $('html,body').animate({scrollTop: $(idStr).offset().top},500);
  });

  $('.brand').click(function(event){
    event.preventDefault();
    $('html,body').animate({scrollTop: 0},500);
  });

  $('#toggle-menu').click(function(event){
    $('#links').toggle();
  });

  // fix sub nav on scroll
  var $win = $(window), $nav = $('.subnav'),
  barTop = $('.subnav').length && $('.subnav').offset().top,
  navOffsetTop = $('#topnav').length && document.getElementById("topnav").offsetTop;

  respondToWidth();

  $win.on("load", function() { //processScroll if page is reloaded!
    window.setTimeout(processScroll, 10);
  });

  $win.on('resize', respondToWidth);

  function respondToWidth() {
    if ($win.width() < 976) {
      $(window).off('scroll', processScroll);
      $('#topnav').hide();
      $nav.removeClass('subnav-fixed');
    } else {
      refreshScrollVariables();
      processScroll();
      $win.on('scroll', processScroll);
    }
  }

  function refreshScrollVariables() {
    barTop = $('.subnav').length && $('.subnav').offset().top,
    navOffsetTop = $('#topnav').length && document.getElementById("topnav").offsetTop;
  }

  function processScroll() {
    var i, scrollTop = $win.scrollTop();
    if (scrollTop >= barTop && !isFixed()) {
      $nav.addClass('subnav-fixed');
    } else if (scrollTop >= barTop - navOffsetTop && !isHidden()) {
      $('#topnav').hide();
      //$('#links').fadeIn(700, 'easeInCubic');
      $('#links').fadeIn(700);
    } else if (scrollTop <= barTop && isFixed()) {
      $nav.removeClass('subnav-fixed');
    } else if (scrollTop <= barTop - navOffsetTop && isHidden()) {
      $('#topnav').show();
      $('#links').hide();
    }
  }

  function isHidden() {
    return !$('#topnav').is(':visible');
  }
  function isFixed() {
    return $nav.hasClass('subnav-fixed');
  };

  function mail2(name, domain) {
    var addr = name + '@' + domain;
    $('#email').append(' <a href="mailto:' + addr + '">' + addr + '</a>');
  }
});

