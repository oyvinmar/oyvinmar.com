import { SHOW_MORE_EVENTS } from '../actions/lifestreamActions';

export default function lifestream(
  state = { numberOfVisibleEvents: 5 },
  action,
) {
  switch (action.type) {
    case SHOW_MORE_EVENTS:
      return Object.assign({}, state, {
        numberOfVisibleEvents:
          state.numberOfVisibleEvents + action.additionalEventsToShow,
      });
    default:
      return state;
  }
}
