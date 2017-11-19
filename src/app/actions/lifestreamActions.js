import { makeActionCreator } from '../util';

export const SHOW_MORE_EVENTS = 'SHOW_MORE_EVENTS';

export const showMoreEvents = makeActionCreator(
  SHOW_MORE_EVENTS,
  'additionalEventsToShow',
);
