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
     // <div styleClass="col-xs-3 col-sm-1">
     //   <img src="/img/{{ service_name }}64.png" alt="{{ service_name }} logo"/>
     // </div>
     // <div class="col-xs-9 col-sm-11">
     // <header><a href="service_url">service_name</a></header>
     // <p>content</p>
     // <a href="url"><time title class="published">timestamp</time></a>
     // </div>
     // <footer></footer>
     //<br/>
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

