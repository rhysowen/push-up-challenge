import * as types from './types';
import * as storage from '../lib/storage';
import {
  SET_KEY,
  GET_KEY,
  REMOVE_KEY,
  MERGE_KEY,
  storageAsync,
} from '../lib/storageAsync';

export function setPreviewExercise(name) {
  return {
    type: types.PROGRAM_SET_PREVIEW_EXERCISE,
    payload: name,
  };
}

function saveProgramStateAsync(programState, key) {
  const actionTypes = [
    types.PROGRAM_SAVE_ATTEMPT,
    types.PROGRAM_SAVE_SUCCESS,
    types.PROGRAM_SAVE_FAILURE,
  ];

  const dataJson = JSON.stringify(programState);

  return storageAsync(
    storage.SELECTED_PROGRAM_NAME,
    actionTypes,
    key,
    dataJson
  );
}

export function mergeDayAsync(day) {
  const programState = { day };

  return saveProgramStateAsync(programState, MERGE_KEY);
}

export function setProgramStateAsync(name, day) {
  const programState = {
    name,
    day,
  };

  return saveProgramStateAsync(programState, SET_KEY);
}

export function removeSelectedProgramAsync() {
  const actionTypes = [
    types.PROGRAM_REMOVE_SELECTED_ATTEMPT,
    types.PROGRAM_REMOVE_SELECTED_SUCCESS,
    types.PROGRAM_REMOVE_SELECTED_FAILURE,
  ];

  return storageAsync(storage.SELECTED_PROGRAM_NAME, actionTypes, REMOVE_KEY);
}

export function fetchSelectedProgramAsync() {
  const actionTypes = [
    types.PROGRAM_GET_FETCH,
    types.PROGRAM_GET_SUCCESS,
    types.PROGRAM_GET_FAILURE,
  ];

  return storageAsync(storage.SELECTED_PROGRAM_NAME, actionTypes, GET_KEY);
}

export function programComplete() {
  return { type: types.PROGRAM_EXERCISE_COMPLETE };
}
