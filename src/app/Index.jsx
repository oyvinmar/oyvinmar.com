'use strict';

var React = require('react');

var Message = React.createClass({
  render: function () {
    var msg = this.props.data;
    return (
      <h2>
        {msg}
      </h2>
    );
  }
});

var HomePage = React.createClass({
  getInitialState: function () {
    return {msg: ''};
  },
  render: function () {
    return (
      <Message data={this.state.msg} />
    );
  }
});

module.exports = HomePage;

