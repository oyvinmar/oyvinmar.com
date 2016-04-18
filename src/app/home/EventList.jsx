import React, { PropTypes } from 'react';
import Event from './Event' ;

const EventList = ({events, numberToDisplay}) => {
  const renderEvents = events
  .sort(function (a, b) {
    return b.timestamp.getTime() - a.timestamp.getTime();
  })
  .slice(0, numberToDisplay)
  .map(function (event) {
    return (
      <Event event={event} key={event.id} />
    );
  });
  return (
    <div>
      {renderEvents}
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.array.isRequired,
  numberToDisplay: PropTypes.number.isRequired
};

export default EventList;
