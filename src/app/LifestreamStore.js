var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('./AppDispatcher');
var _ = require('underscore');
var LifestreamConstants = require('./LifestreamConstants');

var _entries = [];

function createEvent(id, content, url, service_name, service_url, timestamp) {
  return {
    id: id,
    content: content,
    url: url,
    service_name: service_name,
    service_url: service_url,
    hidden: false,
    timestamp: timestamp
  };
}

var CHANGE_EVENT = 'change';

var EntryStore = assign({}, EventEmitter.prototype, {

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  getAll: function () {
    return _entries;
  },
  /**
   * @param {function} callback
   */
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {
    case LifestreamConstants.LIFESTREAM_LOAD:
      console.log(action);
      _.each(action.data, function (item) {
        var date = new Date(item.created_at);
        var text = item.text;
        _.each(item.entities.urls, function (url) {
          text = text.replace(url.url, '<a href="' + url.url + '">' + url.url + '</a>');
        });
        var event = createEvent(item.id, text, 'https://twitter.com/#!/oyvinmar/status/' + item.id, 'Twitter', 'http://twitter.com', date);
        _entries.push(event);
        //var events = this.state.events;
        //var newEvents = events.concat([event]);
        //this.setState({events: newEvents});
      });
      break;

    default:
      return true;
  }

  // This often goes in each case that should trigger a UI change. This store
  // needs to trigger a UI change after every view action, so we can make the
  // code less repetitive by putting it here.  We need the default case,
  // however, to make sure this only gets called after one of the cases above.
  EntryStore.emitChange();

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = EntryStore;
