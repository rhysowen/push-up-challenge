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

function saveProgramStateAsync(programState, mode) {
  const actionTypes = [
    types.PROGRAM_SAVE_ATTEMPT,
    types.PROGRAM_SAVE_SUCCESS,
    types.PROGRAM_SAVE_FAILURE,
  ];

  return storageAsync(
    storage.SELECTED_PROGRAM_NAME,
    actionTypes,
    mode,
    programState
  );
}

export function setProgramStateAsync(name) {
  const programState = name;

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

export function setProgramByName(name) {
  return {
    type: types.PROGRAM_GET_EXERCISE_BY_NAME,
    payload: name,
  };
}

export function programComplete() {
  return { type: types.PROGRAM_EXERCISE_COMPLETE };
}
