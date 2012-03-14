var Entry = Backbone.Model.extend({
  initialize: function (spec) {
    if(!spec.timestamp instanceof Date) {
      throw "Timestamp has to be an date object";
    }
  }
});

var EntryCollection = Backbone.Collection.extend({
  model: Entry,

  comparator: function(entry) {
    return -entry.get('timestamp').getTime();
  }
});

var EntryView = Backbone.View.extend({
  tagName: 'article',
  className: 'entry row-fluid',
  initialize: function(args) {
    this.el.id = this.model.get('timestamp').getTime() + '';
  },

  template: Handlebars.compile(
    '<div class="span1"><img src="/{{ service_name }}64.png" alt="{{ service_name }} logo"/></div>'
    + '<div class="span11">'
    + '<header><a href="{{{ service_url }}}">{{{ service_name }}}</a></header>'
    + '<p>{{{ content }}}</p>'
    + '<a href="{{{ url }}}"><time title class="published">{{{ timestamp }}}</time></a>'
    + '</div>'
  + '<footer></footer><br/>'),

  render: function() {
    var context = _.extend(this.model.toJSON());
    $(this.el).html(this.template(context));
    return this;
  },

  changeContent: function() {
  }
});

var AppModel = Backbone.Model.extend({
  initialize: function() {
    this.entries = new EntryCollection();
  }
});

var AppView = Backbone.View.extend({
  el: $('#stream'),

  initialize: function() {
    this.number_of_entries = 10;
  },

  template: Handlebars.compile('<button class="btn btn-primary show-more" href="#"><i class="icon-plus icon-white"></i> Show more</button>'),

  events: {
    'click .show-more' : 'showMore',
  },

  render: function() {
    $('#stream').html("");
    var i = 0;
    var self = this;
    this.model.entries.each(function(entry) {
      if (i < self.number_of_entries) {
        var view = new EntryView({model: entry});
        $('#stream').append(view.render().el);
      }
      i++;
    });

    if (this.model.entries.length > this.number_of_entries) {
      $('#stream').append(this.template);
    }
    return this;
  },

  showMore: function() {
    this.number_of_entries += 10
    this.render();
    $('body').scrollspy('refresh');

  }
});


var AppController = Backbone.Router.extend({
  initialize: function(params) {
    this.model = new AppModel();
    this.view = new AppView({model: this.model});
    RemoteCallApi.getInstance().fetch_twitter_timeline();
    RemoteCallApi.getInstance().fetch_pinboard_feed();
    RemoteCallApi.getInstance().fetch_foursquare_timeline();
  },

  add: function(content, url, service_name, service_url, timestamp) {
    this.model.entries.add(
      new Entry({
        content: content,
        url: url,
        service_name: service_name,
        service_url: service_url,
        hidden: false,
        timestamp: timestamp
      })
    );
  }
});

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

