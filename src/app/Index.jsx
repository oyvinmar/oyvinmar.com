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
    this.setState({events: LifestreamStore.getAll()});
  },

  render: function () {
    return (
      <p>
        <EventList events={this.state.events} />
      </p>
    );
  }
});

module.exports = HomePage;

