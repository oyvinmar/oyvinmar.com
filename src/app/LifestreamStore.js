var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('./AppDispatcher');
var _ = require('underscore');
var LifestreamConstants = require('./LifestreamConstants');

var _events = [];

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

var LifestreamStore = assign({}, EventEmitter.prototype, {

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  getAll: function () {
    return _events;
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
      _.each(action.data, function (item) {
        var date = new Date(item.created_at);
        var text = item.text;
        _.each(item.entities.urls, function (url) {
          text = text.replace(url.url, '<a href="' + url.url + '">' + url.url + '</a>');
        });
        var event = createEvent(item.id, text, 'https://twitter.com/#!/oyvinmar/status/' + item.id, 'Twitter', 'http://twitter.com', date);
        _events.push(event);
      });
      break;

    default:
      return true;
  }

  LifestreamStore.emitChange();

  return true;
});

module.exports = LifestreamStore;
