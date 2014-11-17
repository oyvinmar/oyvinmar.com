'use strict';

var React = require('react');
var LifestreamStore = require('./LifestreamStore');
var LifestreamActions = require('./LifestreamActions');
var $ = require('jquery');
var _ = require('underscore');


var Event = React.createClass({
  render: function () {
    return (
      <li>
      {this.props.children}
      </li>
    )
  }
});

var EventList = React.createClass({
  render: function () {
    var events = this.props.events.map(function (event) {
      return (
        <Event key={event.id}>
          {event.content}
        </Event>
      );
    });
    return (
      <ul className="commentList">
           {events}
      </ul>
    );
  }
});

var HomePage = React.createClass({
  getInitialState: function () {
    return {msg: '', events: []};
  },
  componentDidMount: function() {
    LifestreamStore.addChangeListener(this._onChange);
    LifestreamActions.load();
  },

  componentWillUnmount: function() {
    LifestreamStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    console.log(LifestreamStore.getAll())
    this.setState({events: LifestreamStore.getAll()});
  },
  //componentDidMount: function () {
  //  function createEvent(id, content, url, service_name, service_url, timestamp) {
  //    return {
  //      id: id,
  //      content: content,
  //      url: url,
  //      service_name: service_name,
  //      service_url: service_url,
  //      hidden: false,
  //      timestamp: timestamp
  //    }
  //  }
  //
  //  $.ajax({
  //    url: '/twitter/feed/',
  //    dataType: 'json',
  //    success: function (data) {
  //      _.each(data, function (item) {
  //        var date = new Date(item.created_at);
  //        var text = item.text;
  //        _.each(item.entities.urls, function (url) {
  //          text = text.replace(url.url, '<a href="' + url.url + '">' + url.url + '</a>');
  //        });
  //        var event = createEvent(item.id, text, 'https://twitter.com/#!/oyvinmar/status/' + item.id, 'Twitter', 'http://twitter.com', date);
  //        var events = this.state.events;
  //        var newEvents = events.concat([event]);
  //        this.setState({events: newEvents});
  //      }.bind(this));
  //    }.bind(this)
  //  });
  //},
  render: function () {
    return (
      <p>
        <EventList events={this.state.events} />
      </p>
    );
  }
});

module.exports = HomePage;

