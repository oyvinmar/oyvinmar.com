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
    return entry.get('timestamp').getTime();
  }
});

var EntryView = Backbone.View.extend({
  tagName: 'article',
  className: 'entry',
  initialize: function(args) {
    _.bindAll(this, 'changeContent');
    this.model.bind('change:content', this.changeContent);
    this.el.id = this.model.get('timestamp').getTime() + '';
  },

  template: Handlebars.compile(
    '<header><a href="{{{ service_url }}}">{{{ service_name }}}</a></header>'
    + '<p>{{{ content }}}</p>'
    + '<a href="{{{ url }}}"><time title class="published">{{{ timestamp }}}</time></a>'
  + '<footer></footer>'),

  render: function() {
    var context = _.extend(this.model.toJSON());
    $(this.el).html(this.template(context));
    return this;
  },

  changeContent: function() {
    console.log("Change content??");
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
    _.bindAll(this, "addEntry");
    this.model.entries.bind('add', this.addEntry);
  },

  render: function() {
    var template = Handlebars.compile('<div id="entries"></div>');
    this.entries = this.$('#entries');
    return this;
  },

  addEntry: function(entry) {
    var view = new EntryView({model: entry});
    var children = $('#stream').children();

    var found = _.find(children, function(item) {
      return (entry.get('timestamp').getTime() >= parseInt(item.id));
    })
    if(found){
      $(view.render().el).insertBefore(found);
    } else {
      $('#stream').append(view.render().el);
    }
    //    this.entries.append(view.render().el);
  }
});


var AppController = Backbone.Router.extend({
  initialize: function(params) {
    this.model = new AppModel();
    this.view = new AppView({model: this.model});
    RemoteCallApi.getInstance().fetch_twitter_timeline();
    RemoteCallApi.getInstance().fetch_pinboard_feed();
  },

  add: function(content, url, service_name, service_url, timestamp) {
    this.model.entries.add(
      new Entry({
        content: content,
        url: url,
        service_name: service_name,
        service_url: service_url,
        timestamp: timestamp
      })
    );
  }
});

$(function() {
  var apt = new AppController();
  window.app = apt;
});
