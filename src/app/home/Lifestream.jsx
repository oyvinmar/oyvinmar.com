import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Machine } from 'xstate';

import fetchAllEvents from '../api/eventApi';
import EventList from './EventList';
import { showMoreEvents } from '../actions/lifestreamActions';

const twitterMachine = Machine({
  key: 'tweets',
  initial: 'idle',
  states: {
    idle: {
      on: {
        LOAD: 'loading',
      },
    },
    loading: {
      on: {
        RESOLVE: 'tweets',
        REJECT: 'error',
      },
    },
    tweets: {},
  },
});

class Lifestream extends Component {
  constructor(props) {
    super(props);

    this.commands = {
      loading: this.fetchTweets,
    };

    this.state = {
      twitterState: twitterMachine.initial,
      tweets: [],
      events: [],
    };

    this.showMore = this.showMore.bind(this);
  }

  async componentDidMount() {
    // const { twitterState } = this.state;
    // const nextState = twitterMachine.transition(twitterState, 'LOAD').value;
    // const command = this.commands[nextState];
    // this.setState({ twitterState: nextState }, command);
    // dispatch(fetchAllStreams());
    const events = await fetchAllEvents();
    this.setState({ events }); // eslint-disable-line
  }

  showMore() {
    const { dispatch } = this.props;
    dispatch(showMoreEvents(10));
  }

  fetchTweets() {
    fetch('/twitter/feed/')
      .then(response => response.json())
      .then(tweets => {
        const { twitterState } = this.state;
        const nextState = twitterMachine.transition(twitterState, 'RESOLVE')
          .value;
        this.setState({ tweets, twitterState: nextState });
      });
  }

  render() {
    const { numberOfVisibleEvents } = this.props;
    const { events } = this.state;
    if (this.state.twitterState === 'tweets') {
      console.log(this.state.tweets);
    }
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
