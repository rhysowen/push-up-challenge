import { NavigationExperimental } from 'react-native';
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import { NOT_SET } from '../lib/constants';

const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const allTabs = [
  {
    key: 'routine',
    index: 0,
    title: 'Routine',
  },
  {
    key: 'programs',
    index: 1,
    title: 'Programs',
  },
  {
    key: 'statistics',
    index: 2,
    title: 'Statistics',
  },
  {
    key: 'more',
    index: 3,
    title: 'More',
  },
];

// Refactoring required.
export const tabs = createReducer({ key: 'home', index: 0, routes: allTabs }, {
  [types.SET_TAB](state, action) {
    return Object.assign(
      {},
      state,
      allTabs[action.index]
    );
  },
});

const allPages = [
  {
    key: 'ApplicationTabs',
    index: 0,
    title: NOT_SET,
  },
  {
    key: 'PreviewContainer',
    index: 1,
    title: 'Preview',
  },
  {
    key: 'ActivityContainer',
    index: 2,
    title: 'Activity',
    leftComponent: { icon: 'pause' },
    rightComponent: { icon: 'volume-up' },
  },
  {
    key: 'CompleteContainer',
    index: 3,
    title: 'Complete',
  },
];

export const navigationState = createReducer({ index: 0, routes: allPages }, {
  [types.NAVIGATION_FORWARD](state, action) {
    return NavigationStateUtils.forward(state);
  },
  [types.NAVIGATION_BACK](state, action) {
    return NavigationStateUtils.back(state);
  },
  [types.NAVIGATION_RESET](state, action) {
    return {
      index: 0,
      routes: [
        action.payload,
      ],
    };
  },
});
