var Entry = Backbone.Model.extend({
  initialize: function (spec) {
    if(!spec.timestamp instanceof Date) {
      throw "Timestamp has to be an date object";
    }
  }
});

var EntryCollection = Backbone.Collection.extend({
  model: Entry
});

var EntryView = Backbone.View.extend({
  initialize: function(args) {
    _.bindAll(this, 'changeContent');
    this.model.bind('change:content', this.changeContent);
  },

  render: function() {
    var template = Handlebars.compile('<article class="entry">{{ content }}</article>');
    var context = _.extend(this.model.toJSON());
    //$(this.el).html(template(context));
    $('#stream').append(template(context));
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
    this.entries.append(view.render().el);
  }
});


var AppController = Backbone.Router.extend({
  initialize: function(params) {
    this.model = new AppModel();
    this.view = new AppView({model: this.model});
    params.append_at.append(this.view.render().el);
    RemoteCallApi.getInstance().fetch_twitter_timeline();
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
  var apt = new AppController({append_at: $('#stream')});
  window.app = apt;
});
