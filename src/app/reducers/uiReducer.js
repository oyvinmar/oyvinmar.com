import {
  TOOGLE_NAV_BAR_LINKS
} from '../actions/uiActions';

const initialState = {
  isNavBarExpanded: false
};

export default function ui(state = initialState, action) {
  switch (action.type) {
  case TOOGLE_NAV_BAR_LINKS:
    return Object.assign({}, state, {
      isNavBarExpanded: !state.isNavBarExpanded,
    });
  default:
    return state;
  }
}
