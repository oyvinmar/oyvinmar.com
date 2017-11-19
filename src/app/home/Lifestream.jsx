import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Machine } from 'xstate';

import fetchAllEvents from '../api/eventApi';
import EventList from './EventList';
import { showMoreEvents } from '../actions/lifestreamActions';

const eventsMachine = Machine({
  key: 'events',
  initial: 'idle',
  states: {
    idle: {
      on: {
        LOAD: 'loading',
      },
    },
    loading: {
      on: {
        RESOLVE: 'events',
        REJECT: 'error',
      },
    },
    events: {},
  },
});

class Lifestream extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventsState: eventsMachine.initial,
      events: [],
    };

    this.showMore = this.showMore.bind(this);
    this.command = this.command.bind(this);
    this.transition = this.transition.bind(this);
    this.fetchEvents = this.fetchEvents.bind(this);
  }

  componentDidMount() {
    this.transition({ type: 'LOAD' });
  }

  async fetchEvents() {
    try {
      const events = await fetchAllEvents();
      this.transition({ type: 'RESOLVE', events });
    } catch (e) {
      this.transition({ type: 'REJECT' });
    }
  }

  command(nextState, action) {
    switch (nextState) {
      case 'loading':
        this.fetchEvents();
        return {};
      case 'events':
        if (action.events) {
          return { events: action.events };
        }
        return {};
      default:
        return {};
    }
  }

  transition(action) {
    const { eventsState } = this.state;

    const nextEventsState = eventsMachine.transition(eventsState, action.type)
      .value;

    if (nextEventsState) {
      const nextState = this.command(nextEventsState, action);
      this.setState(
        Object.assign(
          {
            eventsState: nextEventsState,
          },
          nextState,
        ),
      );
    }
  }

  showMore() {
    const { dispatch } = this.props;
    dispatch(showMoreEvents(10));
  }

  render() {
    const { numberOfVisibleEvents } = this.props;
    const { events, eventsState } = this.state;
    return (
      <div className="section" id="lifestream">
        <div className="container">
          <header className="row section-header">
            <h2>Lifestream</h2>
            <hr />
          </header>
          <section className="row">
            <div className="col-md-12">
              <p className="pretext">
                If this content is up-to-date, I‘m probably still alive. If not,
                lets hope it is a bug in my code...
              </p>
              <div>
                {eventsState === 'loading' && <p>Loading</p>}
                <EventList
                  events={events}
                  numberToDisplay={numberOfVisibleEvents}
                />
                <button
                  className="btn btn-primary show-more"
                  onClick={this.showMore}>
                  <i className="fa fa-plus" />
                  <span> Show More</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

Lifestream.propTypes = {
  dispatch: PropTypes.func.isRequired,
  numberOfVisibleEvents: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    numberOfVisibleEvents: state.lifestream.numberOfVisibleEvents,
  };
}

export default connect(mapStateToProps)(Lifestream);
