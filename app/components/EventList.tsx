import { UnmountClosed } from 'react-collapse';
import { toHumanReadableString } from '../helpers';
import { useState } from 'react';
import { Event } from '../types';
import {
  GithubLogo,
  PinboardLogo,
  StravaLogo,
  SwarmLogo,
  TwitterLogo,
  UntappdLogo,
} from './Logos';

interface SimpleEventProps {
  event: Event;
}

const SimpleEvent = ({ event }: SimpleEventProps) => {
  return (
    <article className="ml-12">
      <a
        href={event.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 hover:bg-pink-300/25 rounded-sm flex items-center space-x-4 p-3"
      >
        <div>
          <p dangerouslySetInnerHTML={{ __html: event.content }} />
          <time className="text-gray-500 font-normal">
            {toHumanReadableString(event.date)}
          </time>
        </div>
      </a>
    </article>
  );
};

interface EventGroupProps {
  event: Event;
}

const EventGroup = ({ event }: EventGroupProps) => {
  let [displayAll, setDisplayAll] = useState(false);
  return (
    <article
      className="p-3 space-y-3 dark:bg-gray-800 bg-white rounded-md shadow-md
      ring-1 ring-gray-100 dark:ring-0"
    >
      <div className="mt-2 flex items-center space-x-2 relative">
        <div>
          {
            {
              Github: (
                <GithubLogo className="fill-current text-black dark:text-gray-100 w-12" />
              ),
              Swarm: <SwarmLogo className="w-12" />,
              Pinboard: <PinboardLogo className="w-12" />,
              Untappd: <UntappdLogo className="w-12" />,
              Twitter: <TwitterLogo className="w-12" />,
              Strava: <StravaLogo className="w-12 h-12" />,
            }[event.serviceName]
          }
        </div>
        <div>
          <header className="font-bold">
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              {event.serviceName}
            </a>
          </header>
          <time className="text-gray-500">
            {toHumanReadableString(event.date)}
          </time>
        </div>
      </div>
      {event.image ? (
        <img
          src={
            '/api/polyline/?size=644x280&maptype=roadmap&path=enc:' +
            event.image
          }
          loading="lazy"
          alt="polyline"
        />
      ) : null}
      <p dangerouslySetInnerHTML={{ __html: event.content }} />
      <div>
        {event.group.length > 0 && displayAll === false ? (
          <button className="link-btn" onClick={(_) => setDisplayAll(true)}>
            {event.group.length + ' similiar items'}
          </button>
        ) : (
          <div />
        )}
        <UnmountClosed isOpened={displayAll}>
          <div className="relative -mt-4">
            <span
              className={`path path-${event.serviceName.toLocaleLowerCase()}`}
            />
            {event.group.map((event) => (
              <SimpleEvent key={event.id} event={event} />
            ))}
          </div>
        </UnmountClosed>
      </div>
      {event.serviceName === 'Strava' && (
        <div>
          <small>Powered by Strava</small>
        </div>
      )}
    </article>
  );
};

interface EventListProps {
  events: Event[];
}

export const EventList = ({ events }: EventListProps) => (
  <>
    {events.map((event) => (
      <EventGroup event={event} key={event.id} />
    ))}
  </>
);
