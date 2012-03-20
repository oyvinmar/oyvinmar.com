$(function() {
  var apt = new AppController();
  window.app = apt;

  var $spy = $('body');
  $spy.scrollspy($spy.data());

// fix sub nav on scroll
  var $win = $(window), $nav = $('.subnav'),
  barTop = $('.subnav').length && $('.subnav').offset().top,
  navOffsetTop = $('#topnav').length && document.getElementById("topnav").offsetTop,
  isFixed = 0, isHidden = 0;

  processScroll();

  $win.on('scroll', processScroll)

  function processScroll() {
    var i, scrollTop = $win.scrollTop()
    if (scrollTop >= barTop && !isFixed) {
      isFixed = 1;
      $nav.addClass('subnav-fixed');
    } else if (scrollTop >= barTop - navOffsetTop && !isHidden) {
      $('#topnav').hide();
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
});

