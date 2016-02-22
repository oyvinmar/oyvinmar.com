var React = require('react');
var LifestreamStore = require('./LifestreamStore');
var LifestreamActions = require('./LifestreamActions');
var $ = require('jquery');
var _ = require('underscore');


var Event = React.createClass({

  render: function () {
    var event = this.props.event;
    return (
      <article className="entry row">
        <div className="col-xs-3 col-sm-1">
          <img src={ '/img/' + event.service_name + `64-${window.hash}.png`}
            alt={ event.service_name + 'logo'} />
        </div>
        <div className="col-xs-9 col-sm-11">
          <header>
            <a href={event.service_url}>{event.service_name}</a>
          </header>
          <p dangerouslySetInnerHTML={{__html: event.content}}/>
          <a href={event.url}>
            <time title className="published">{ event.timestamp.toLocaleString() }</time>
          </a>
        </div>
        <footer></footer>
      </article>
    )
  }
});

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

var Lifestream = React.createClass({
  getInitialState: function () {
    return {events: [], numberToDisplay: 5};
  },

  componentDidMount: function () {
    LifestreamStore.addChangeListener(this._onChange);
    LifestreamActions.load();
  },

  componentWillUnmount: function () {
    LifestreamStore.removeChangeListener(this._onChange);
  },

  showMore: function (){
    this.setState({numberToDisplay: this.state.numberToDisplay + 10});
  },

  _onChange: function () {
    this.setState({events: LifestreamStore.getAll()});
  },

  render: function () {
    return (
      <div>
        <EventList events={this.state.events} numerToDisplay={this.state.numberToDisplay}/>
        <button className="btn btn-primary show-more" onClick={this.showMore}>
          <i className="fa fa-plus"></i>
          <span> Show More</span>
        </button>
      </div>
    );
  }
});

module.exports = Lifestream;
