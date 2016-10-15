import * as types from './types';
import * as storage from '../lib/storage';
import {
  SET_KEY,
  GET_KEY,
  REMOVE_KEY,
  storageAsync,
} from '../lib/storageAsync';

export function setPreviewExercise(name) {
  return {
    type: types.PROGRAM_SET_PREVIEW_EXERCISE,
    payload: name,
  };
}

export function saveProgramByNameAsync(name) {
  const actionTypes = [
    types.PROGRAM_SAVE_NAME_SUCCESS,
    types.PROGRAM_SAVE_NAME_FAILURE,
  ];

  const dateSelected = new Date();

  const data = {
    name,
    dateSelected,
  };

  const dataJson = JSON.stringify(data);

  return storageAsync(
    storage.SELECTED_PROGRAM_NAME,
    actionTypes,
    SET_KEY,
    null,
    dataJson,
  );
}

export function removeSelectedProgramAsync() {
  const actionTypes = [
    types.PROGRAM_REMOVE_SELECTED_SUCCESS,
    types.PROGRAM_REMOVE_SELECTED_FAILURE,
  ];

  return storageAsync(storage.SELECTED_PROGRAM_NAME, actionTypes, REMOVE_KEY);
}

export function fetchSelectedProgramAsync() {
  const actionTypes = [
    types.PROGRAM_GET_SUCCESS,
    types.PROGRAM_GET_FAILURE,
  ];

  const initDispatch = types.PROGRAM_GET_FETCH;

  return storageAsync(storage.SELECTED_PROGRAM_NAME, actionTypes, GET_KEY, initDispatch);
}
