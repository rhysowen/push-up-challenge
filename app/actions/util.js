import * as types from './types';
import * as storage from '../lib/storage';
import {
  SET_KEY,
  GET_KEY,
  MERGE_KEY,
  REMOVE_KEY,
  storageAsync,
} from '../lib/storageAsync';

const saveAsync = (data, mode) => {
  const actionTypes = [
    types.UTIL_SAVE_ATTEMPT,
    types.UTIL_SAVE_SUCCESS,
    types.UTIL_SAVE_FAILURE,
  ];

  const dataJson = JSON.stringify(data);

  return storageAsync(
    storage.UTIL,
    actionTypes,
    mode,
    dataJson,
  );
};

export const setUtilAsync = data => (
  (dispatch) => {
    const dataStore = { proMode: data.proMode };

    dispatch(saveAsync(dataStore, SET_KEY));
  }
);

export const fetchUtilAsync = () => {
  const actionTypes = [
    types.UTIL_FETCH_ATTEMPT,
    types.UTIL_FETCH_SUCCESS,
    types.UTIL_FETCH_FAILURE,
  ];

  return storageAsync(storage.UTIL, actionTypes, GET_KEY);
};

export const removeUtilAsync = () => {
  const actionTypes = [
    types.UTIL_REMOVE_ATTEMPT,
    types.UTIL_REMOVE_SUCCESS,
    types.UTIL_REMOVE_FAILURE,
  ];

  return storageAsync(storage.UTIL, actionTypes, REMOVE_KEY);
};

export const activateProMode = () => (
  (dispatch, getState) => {
    dispatch({ type: types.UTIL_ACTIVATE_PRO });

    const data = getState().util;
    const saveData = {
      proMode: data.proMode,
    };

    dispatch(saveAsync(saveData, MERGE_KEY));
  }
);
