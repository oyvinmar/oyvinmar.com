import React, { PropTypes } from 'react';

const Event = ({event}) => {
  return (
    <article className="entry row">
      <div className="col-xs-3 col-sm-1">
        <img alt={ event.service_name + 'logo'} src={ '/img/' + event.service_name + `64-${window.hash}.png`}/>
      </div>
      <div className="col-xs-9 col-sm-11">
        <header>
          <a href={event.service_url}>{event.service_name}</a>
        </header>
        <p dangerouslySetInnerHTML={{__html: event.content}}/>
        <a href={event.url}>
          <time className="published" title>{ event.timestamp.toLocaleString() }</time>
        </a>
      </div>
      <footer />
    </article>
  );
};

Event.propTypes = {
  event: PropTypes.object.isRequired
};

export default Event;
