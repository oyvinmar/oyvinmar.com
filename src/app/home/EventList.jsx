import React from 'react';
import PropTypes from 'prop-types';
import { EventShape } from '../shapes';
import Event from './Event';

const EventList = ({ events, numberToDisplay }) => {
  const renderEvents = events
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, numberToDisplay)
    .map(event => <Event event={event} key={event.id} />);
  return (
    <div>
      {renderEvents}
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.arrayOf(EventShape).isRequired,
  numberToDisplay: PropTypes.number.isRequired,
};

export default EventList;
