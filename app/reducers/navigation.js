import { NavigationExperimental } from 'react-native';
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const allTabs = [
  { key: 'routine', index: 0 },
  { key: 'programs', index: 1 },
  { key: 'statistics', index: 2 },
  { key: 'more', index: 3 },
];

const allPages = [
  { key: 'ApplicationTabs' },
  { key: 'Detail' },
];

export const tabs = createReducer({ key: 'home', index: 0, routes: allTabs }, {
  [types.SET_TAB](state, action) {
    return Object.assign(
      {},
      state,
      allTabs[action.index]
    );
  },
});

export const navigationState = createReducer({ index: 0, routes: allPages }, {
  [types.NAVIGATION_FORWARD](state, action) {
    return NavigationStateUtils.forward(state);
  },
  [types.NAVIGATION_BACK](state, action) {
    return NavigationStateUtils.back(state);
  },
});

export const navigationParams = createReducer({}, {
  [types.NAVIGATION_FORWARD](state, action) {
    return action.state;
  },
});
