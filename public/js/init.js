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

  // fix sub nav on scroll
  var $win = $(window), $nav = $('.subnav'),
  barTop = $('.subnav').length && $('.subnav').offset().top,
  navOffsetTop = $('#topnav').length && document.getElementById("topnav").offsetTop,
  isFixed = 0, isHidden = 0;

  $win.on("load", function() { //processScroll if page is reloaded!
    window.setTimeout(processScroll, 10);
  });

  $win.on('scroll', processScroll);

  function processScroll() {
    var i, scrollTop = $win.scrollTop();
    if (scrollTop >= barTop && !isFixed) {
      isFixed = 1;
      $nav.addClass('subnav-fixed');
    } else if (scrollTop >= barTop - navOffsetTop && !isHidden) {
      $('#topnav').hide();
      //$('#links').fadeIn(700, 'easeInCubic');
      $('#links').fadeIn(700);
      isHidden = 1;
    } else if (scrollTop <= barTop && isFixed) {
      isFixed = 0;
      $nav.removeClass('subnav-fixed');
    } else if (scrollTop <= barTop - navOffsetTop && isHidden) {
      $('#topnav').show();
      $('#links').hide();
      isHidden = 0;
    }
  }

  function mail2(name, domain) {
    var addr = name + '@' + domain;
    $('#email').append(' <a href="mailto:' + addr + '">' + addr + '</a>');
  }
});

