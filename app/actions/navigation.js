import ReactNative from 'react-native';
import * as types from './types';

const { NavigationExperimental } = ReactNative;
const { jumpToIndex } = NavigationExperimental.StateUtils;

export const setTab = tabIndex => (
  (dispatch, getState) => {
    const { tabs } = getState();

    dispatch(
      Object.assign(
        { type: types.SET_TAB },
        jumpToIndex(tabs, tabIndex),
      ),
    );
  }
);

export const navigateJumpTo = key => ({
  type: types.NAVIGATION_JUMP_TO,
  payload: key,
});

export const navigatePop = () => ({
  type: types.NAVIGATION_POP,
});

export const navigatePush = key => ({
  type: types.NAVIGATION_PUSH,
  payload: key,
});

export const navigateForward = state => ({
  type: types.NAVIGATION_FORWARD,
  payload: state,
});

export const navigate = state => navigateForward(state);

export const navigateBack = state => ({
  type: types.NAVIGATION_BACK,
  payload: state,
});

export const navigateReset = key => ({
  type: types.NAVIGATION_RESET,
  payload: key,
});
