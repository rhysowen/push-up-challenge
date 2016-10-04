import * as types from './types';
import * as storage from '../lib/storage';
import {
  SET_KEY,
  GET_KEY,
  REMOVE_KEY,
  storageAsync,
} from '../lib/storageAsync';

export function setProgramByName(name) {
  const actionTypes = [
    types.PROGRAM_SAVE_NAME_SUCCESS,
    types.PROGRAM_SAVE_NAME_FAILURE,
  ];

  return storageAsync(storage.SELECTED_PROGRAM_NAME, actionTypes, SET_KEY, null, name);
}

export function removeSelectedProgram() {
  const actionTypes = [
    types.PROGRAM_REMOVE_SELECTED_SUCCESS,
    types.PROGRAM_REMOVE_SELECTED_FAILURE,
  ];

  return storageAsync(storage.SELECTED_PROGRAM_NAME, actionTypes, REMOVE_KEY);
}

export function fetchSelectedProgram() {
  const actionTypes = [
    types.PROGRAM_GET_SUCCESS,
    types.PROGRAM_GET_FAILURE,
  ];

  const initDispatch = types.PROGRAM_GET_FETCH;

  return storageAsync(storage.SELECTED_PROGRAM_NAME, actionTypes, GET_KEY, initDispatch);
}
