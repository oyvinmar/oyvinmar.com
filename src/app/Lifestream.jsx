import React from 'react';
import EventList from './EventList';
var LifestreamStore = require('./LifestreamStore');
var LifestreamActions = require('./LifestreamActions');

const Lifestream = React.createClass({
  getInitialState: function () {
    return {events: [], numberToDisplay: 5};
  },

  componentDidMount: function () {
    LifestreamStore.addChangeListener(this._onChange);
    LifestreamActions.load();
  },

  componentWillUnmount: function () {
    LifestreamStore.removeChangeListener(this._onChange);
  },

  showMore: function (){
    this.setState({numberToDisplay: this.state.numberToDisplay + 10});
  },

  _onChange: function () {
    this.setState({events: LifestreamStore.getAll()});
  },

  render: function () {
    return (
      <div>
        <EventList events={this.state.events} numerToDisplay={this.state.numberToDisplay}/>
        <button className="btn btn-primary show-more" onClick={this.showMore}>
          <i className="fa fa-plus"></i>
          <span> Show More</span>
        </button>
      </div>
    );
  }
});

export default Lifestream;
