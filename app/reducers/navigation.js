import { NavigationExperimental } from 'react-native';
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import { NOT_SET } from '../lib/constants';

const { StateUtils: NavigationStateUtils } = NavigationExperimental;

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

const ICON_VOLUME_UP = 'volume-up';
const ICON_VOLUME_OFF = 'volume-off';

const LoadingContainerRoute = {
  key: 'LoadingContainer',
  title: '',
};
const ApplicationTabRoute = {
  key: 'ApplicationTabs',
  title: NOT_SET,
};

const initialRoutes = [LoadingContainerRoute, ApplicationTabRoute];

const allPages = [
  LoadingContainerRoute,
  ApplicationTabRoute,
  {
    key: 'PreviewContainer',
    title: 'Preview',
  },
  {
    key: 'ActivityContainer',
    title: 'Activity',
  },
  {
    key: 'CompleteContainer',
    title: 'Complete',
  },
  {
    key: 'CreditContainer',
    title: 'Credits',
  },
  {
    key: 'MedicalInformationContainer',
    title: 'Medical Information',
  },
  {
    key: 'SoundContainer',
    title: 'Sounds',
  },
  {
    key: 'InstructionContainer',
    title: 'Instructions',
  },
];

const getIndexByKey = key => (
  allPages.reduce((cur, val, index) => (val.key === key && cur === -1 ? index : cur), -1)
);

export const navigationState = createReducer({ index: 0, routes: initialRoutes }, {
  [types.NAVIGATION_JUMP_TO](state, action) {
    return NavigationStateUtils.jumpTo(state, action.payload);
  },
  [types.NAVIGATION_PUSH](state, action) {
    const indexByKey = getIndexByKey(action.payload);
    return NavigationStateUtils.push(state, allPages[indexByKey]);
  },
  [types.NAVIGATION_POP](state, action) {
    return NavigationStateUtils.pop(state);
  },
  [types.NAVIGATION_FORWARD](state, action) {
    return NavigationStateUtils.forward(state);
  },
  [types.NAVIGATION_BACK](state, action) {
    return NavigationStateUtils.back(state);
  },
  [types.NAVIGATION_RESET](state, action) {
    const indexByKey = getIndexByKey(action.payload);
    const routes = [allPages[indexByKey]];

    return Object.assign(
      {},
      allPages[indexByKey],
      {
        key: action.payload,
        index: 0,
        routes,
      }
    );
  },
});
