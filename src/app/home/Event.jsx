import React from 'react';
import { EventShape } from '../shapes';

const Event = ({event}) => (
  <article className="entry row">
    <div className="col-xs-3 col-sm-1">
      <img alt={`${event.serviceName  }logo`} src={`/assets/img/${  event.serviceName  }64.png`} />
    </div>
    <div className="col-xs-9 col-sm-11">
      <header>
        <a href={event.serviceUrl}>{event.serviceName}</a>
      </header>
      <p dangerouslySetInnerHTML={{__html: event.content}} />
      <a href={event.url}>
        <time className="published" title>{ event.timestamp.toLocaleString() }</time>
      </a>
    </div>
    <footer />
  </article>
  );

Event.propTypes = {
  event: EventShape.isRequired
};

export default Event;
