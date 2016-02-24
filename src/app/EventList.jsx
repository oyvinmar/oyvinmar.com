import React from 'react';
import Event from './Event' ;

var EventList = React.createClass({
  render: function () {
    var events = this.props.events
      .sort(function (a, b) {
        return b.timestamp.getTime() - a.timestamp.getTime();
      })
      .slice(0, this.props.numerToDisplay)
      .map(function (event) {
        return (
          <Event key={event.id} event={event}/>
        );
      });
    return (
      <div>
        {events}
      </div>
    );
  }
});

export default EventList;
