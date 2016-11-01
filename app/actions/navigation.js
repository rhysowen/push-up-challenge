import ReactNative from 'react-native';
import * as types from './types';

const { NavigationExperimental } = ReactNative;
const { jumpToIndex } = NavigationExperimental.StateUtils;

export function setTab(tabIndex) {
  return (dispatch, getState) => {
    const { tabs } = getState();

    dispatch(
      Object.assign(
        { type: types.SET_TAB },
        jumpToIndex(tabs, tabIndex)
      )
    );
  };
}

function navigateForward(state) {
  return {
    type: types.NAVIGATION_FORWARD,
    payload: state,
  };
}

export function navigate(state) {
  return navigateForward(state);
}

export function navigateBack(state) {
  return {
    type: types.NAVIGATION_BACK,
    payload: state,
  };
}

export function navigateReset(key) {
  return {
    type: types.NAVIGATION_RESET,
    payload: key,
  };
}

export function toggleIcon() {
  return { type: types.NAVIGATION_TOGGLE_ICON };
}