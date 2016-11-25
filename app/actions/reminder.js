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
    types.REMINDER_SAVE_ATTEMPT,
    types.REMINDER_SAVE_SUCCESS,
    types.REMINDER_SAVE_FAILURE,
  ];

  const dataJson = JSON.stringify(data);

  return storageAsync(
    storage.REMINDER,
    actionTypes,
    mode,
    dataJson
  );
};

export const setReminderAsync = data => (
  (dispatch) => {
    const dataStore = { days: data.days };

    dispatch(saveAsync(dataStore, SET_KEY));
  }
);

export const fetchReminderAsync = () => {
  const actionTypes = [
    types.REMINDER_FETCH_ATTEMPT,
    types.REMINDER_FETCH_SUCCESS,
    types.REMINDER_FETCH_FAILURE,
  ];

  return storageAsync(storage.REMINDER, actionTypes, GET_KEY);
};

export const removeReminderAsync = () => {
  const actionTypes = [
    types.REMINDER_REMOVE_ATTEMPT,
    types.REMINDER_REMOVE_SUCCESS,
    types.REMINDER_REMOVE_FAILURE,
  ];

  return storageAsync(storage.REMINDER, actionTypes, REMOVE_KEY);
};

export const toggleReminderModal = () => (
  { type: types.REMINDER_MODAL_TOGGLE }
);

export const setModalDate = date => (
  {
    type: types.REMINDER_SET_DATE,
    payload: date,
  }
);

export const setModalOldDate = date => (
  {
    type: types.REMINDER_SET_OLD_DATE,
    payload: date,
  }
);

export const setModalSelectedDateId = dateId => (
  {
    type: types.REMINDER_SET_SELECTED_DATE_ID,
    payload: dateId,
  }
);

export const setSelectedDateIdTimeAsync = () => (
  (dispatch, getState) => {
    dispatch({ type: types.REMINDER_SET_SELECTED_DATE_ID_TIME });

    const data = getState().util;
    const saveData = {
      days: data.days,
    };

    return saveAsync(saveData, MERGE_KEY);
  }
);
