import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Machine } from 'xstate';

import { EventShape } from '../shapes';
import EventList from './EventList';
import { fetchAllStreams, showMoreEvents } from '../actions/lifestreamActions';

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
    };

    this.showMore = this.showMore.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { twitterState } = this.state;
    const nextState = twitterMachine.transition(twitterState, 'LOAD').value;
    const command = this.commands[nextState];
    this.setState({ twitterState: nextState }, command);
    dispatch(fetchAllStreams());
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
    const { events, numberOfVisibleEvents } = this.props;
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
  events: PropTypes.arrayOf(EventShape).isRequired,
  numberOfVisibleEvents: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    events: state.lifestream.events,
    numberOfVisibleEvents: state.lifestream.numberOfVisibleEvents,
  };
}

export default connect(mapStateToProps)(Lifestream);
