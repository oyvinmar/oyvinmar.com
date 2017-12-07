import React, { Component } from 'react';
import { Machine } from 'xstate';
import fetchAllEvents from '../api/eventApi';
import EventList from './EventList';

const showMoreEventsMachine = {
  initial: 'initial',
  states: {
    initial: {
      on: {
        SHOW_MORE: 'more',
      },
    },
    more: {
      on: {
        SHOW_MORE: 'more',
      },
    },
  },
};

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
    events: {
      ...showMoreEventsMachine,
    },
  },
});

class Lifestream extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventsState: eventsMachine.initial,
      events: [],
      numberOfVisibleEvents: 5,
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

  command(nextMachineState, action) {
    switch (nextMachineState) {
      case 'loading':
        this.fetchEvents();
        return {
          eventsState: nextMachineState,
        };
      case 'events.initial':
        if (action.events) {
          return {
            events: action.events,
            eventsState: nextMachineState,
          };
        }
        return {};
      case 'events.more':
        return previousState => ({
          ...previousState,
          numberOfVisibleEvents: previousState.numberOfVisibleEvents + 10,
          eventsState: nextMachineState,
        });
      default:
        return {
          eventsState: nextMachineState,
        };
    }
  }

  transition(action) {
    const { eventsState } = this.state;

    const nextEventsState = eventsMachine
      .transition(eventsState, action.type)
      .toString();

    if (nextEventsState) {
      const nextState = this.command(nextEventsState, action, this.state);
      this.setState(nextState);
    }
  }

  showMore() {
    this.transition({ type: 'SHOW_MORE' });
  }

  render() {
    const { numberOfVisibleEvents } = this.state;
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

Lifestream.propTypes = {};

export default Lifestream;
