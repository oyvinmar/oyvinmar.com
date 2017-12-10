import React from 'react';

const times = [1, 2, 3, 4, 5];
const EventListPlaceholder = () =>
  times.map(i => (
    <article key={i} className="entry row">
      <div className="col-xs-3 col-sm-1">
        <div className="c-placeholder__logo u-pulse" />
      </div>
      <div className="col-xs-9 col-sm-offset-1 col-sm-10">
        <div className="c-placeholder__header u-pulse" />
        <div className="c-placeholder__content u-pulse" />
        <div className="c-placeholder__time u-pulse" />
      </div>
    </article>
  ));

export default EventListPlaceholder;
