import React, { Component, PropTypes } from 'react';
import EventList from './EventList';
import { connect } from 'react-redux';
import { fetchAllStreams } from './actions/lifestreamActions';

class Lifestream extends Component {
  constructor(props) {
    super(props);
    this.state = {numberToDisplay: 5};
    this.showMore = this.showMore.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAllStreams());
  }

  showMore() {
    this.setState({numberToDisplay: this.state.numberToDisplay + 10});
  }

  render() {
    const { events } = this.props;
    return (
      <div>
        <EventList events={events} numberToDisplay={this.state.numberToDisplay}/>
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
  events: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    events: state.lifestream
  };
}

export default connect(mapStateToProps)(Lifestream);
