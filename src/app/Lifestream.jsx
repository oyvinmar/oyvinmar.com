import React, { Component, PropTypes } from 'react';
import EventList from './EventList';
import LifestreamStore from './LifestreamStore';
import LifestreamActions from './LifestreamActions';

class Lifestream extends Component {
  constructor(props) {
    super(props);
    this.state = {events: [], numberToDisplay: 5};
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    LifestreamStore.addChangeListener(this.onChange);
    LifestreamActions.load();
  }

  componentWillUnmount() {
    LifestreamStore.removeChangeListener(this.onChange);
  }

  showMore() {
    this.setState({numberToDisplay: this.state.numberToDisplay + 10});
  }

  onChange() {
    this.setState({events: LifestreamStore.getAll()});
  }

  render() {
    return (
      <div>
        <EventList events={this.state.events} numberToDisplay={this.state.numberToDisplay}/>
        <button className="btn btn-primary show-more" onClick={this.showMore}>
          <i className="fa fa-plus"></i>
          <span> Show More</span>
        </button>
      </div>
    );
  }
}

export default Lifestream;
