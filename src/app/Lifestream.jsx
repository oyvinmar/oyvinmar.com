import React, { Component, PropTypes } from 'react';
import EventList from './EventList';
import { connect } from 'react-redux';
import { fetchAllStreams, showMoreEvents } from './actions/lifestreamActions';

class Lifestream extends Component {
  constructor(props) {
    super(props);
    this.showMore = this.showMore.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAllStreams());
  }

  showMore() {
    const { dispatch } = this.props;
    dispatch(showMoreEvents(10));
  }

  render() {
    const { events, numberOfVisibleEvents } = this.props;
    return (
      <div>
        <EventList events={events} numberToDisplay={numberOfVisibleEvents}/>
        <button className="btn btn-primary show-more" onClick={this.showMore}>
          <i className="fa fa-plus"></i>
          <span> Show More</span>
        </button>
      </div>
    );
  }
}

Lifestream.propTypes = {
  dispatch: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  numberOfVisibleEvents: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    events: state.lifestream.events,
    numberOfVisibleEvents: state.lifestream.numberOfVisibleEvents
  };
}

export default connect(mapStateToProps)(Lifestream);
