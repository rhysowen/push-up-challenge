import * as types from './types';
import * as storage from '../lib/storage';
import {
  SET_KEY,
  GET_KEY,
  REMOVE_KEY,
  MERGE_KEY,
  storageAsync,
} from '../lib/storageAsync';

function saveMoreAsync(more, mode) {
  const actionTypes = [
    types.MORE_SAVE_ATTEMPT,
    types.MORE_SAVE_SUCCESS,
    types.MORE_SAVE_FAILURE,
  ];

  const moreJson = JSON.stringify(more);

  return storageAsync(
    storage.MORE,
    actionTypes,
    mode,
    moreJson
  );
}

function mergeMoreAsync(more) {
  return saveMoreAsync(more, MERGE_KEY);
}

export function setMoreAsync(more) {
  return saveMoreAsync(more, SET_KEY);
}

export function fetchMoreAsync() {
  const actionTypes = [
    types.MORE_GET_FETCH,
    types.MORE_GET_SUCCESS,
    types.MORE_GET_FAILURE,
  ];

  return storageAsync(storage.MORE, actionTypes, GET_KEY);
}

export function removeMoreAsync() {
  const actionTypes = [
    types.MORE_REMOVE_ATTEMPT,
    types.MORE_REMOVE_SUCCESS,
    types.MORE_REMOVE_FAILURE,
  ];

  return storageAsync(storage.MORE, actionTypes, REMOVE_KEY);
}


export const toggleNotification = () => (
  (dispatch, getState) => {
    dispatch({ type: types.MORE_NOTIFICATION_TOGGLE });

    const state = getState();
    dispatch(mergeMoreAsync(state));
  }
);

export const toggleSound = () => (
  { type: types.MORE_SOUND_TOGGLE }
);

export const toggleCoachSound = () => (
  { type: types.MORE_COACH_SOUND_TOGGLE }
);

export const toggleBeepSound = () => (
  { type: types.MORE_BEEP_SOUND_TOGGLE }
);
