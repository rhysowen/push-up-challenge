import * as types from './types';
import * as storage from '../lib/storage';
import {
  SET_KEY,
  GET_KEY,
  REMOVE_KEY,
  MERGE_KEY,
  storageAsync,
} from '../lib/storageAsync';
import { PROGRAM_ACTIVE } from '../lib/constants';

function saveProgramStateAsync(programState, mode) {
  const actionTypes = [
    types.PROGRAM_SAVE_ATTEMPT,
    types.PROGRAM_SAVE_SUCCESS,
    types.PROGRAM_SAVE_FAILURE,
  ];

  const programStateJson = JSON.stringify(programState);

  return storageAsync(
    storage.SELECTED_PROGRAM,
    actionTypes,
    mode,
    programStateJson
  );
}

export function setPreviewExercise(name) {
  return {
    type: types.PROGRAM_SET_PREVIEW_EXERCISE,
    payload: name,
  };
}

export function setProgramSaveCloseAsync(repsCompleted) {
  const programState = { repsCompleted };

  return saveProgramStateAsync(programState, MERGE_KEY);
}

export function setCompleteProgramStateAsync(day, repsCompleted, status) {
  const programState = {
    day,
    repsCompleted,
    status,
  };

  return saveProgramStateAsync(programState, MERGE_KEY);
}

export function programDayComplete(repsCompleted) {
  return {
    type: types.PROGRAM_DAY_COMPLETE,
    payload: repsCompleted,
  };
}

export function setNewProgramStateAsync(name) {
  const day = 1;
  const repsCompleted = 0;
  const status = PROGRAM_ACTIVE;

  const programState = {
    name,
    day,
    repsCompleted,
    status,
  };

  return saveProgramStateAsync(programState, SET_KEY);
}

export function setProgramByName(name) {
  return {
    type: types.PROGRAM_GET_EXERCISE_BY_NAME,
    payload: name,
  };
}

export function removeSelectedProgramAsync() {
  const actionTypes = [
    types.PROGRAM_REMOVE_SELECTED_ATTEMPT,
    types.PROGRAM_REMOVE_SELECTED_SUCCESS,
    types.PROGRAM_REMOVE_SELECTED_FAILURE,
  ];

  return storageAsync(storage.SELECTED_PROGRAM, actionTypes, REMOVE_KEY);
}

export function fetchSelectedProgramAsync() {
  const actionTypes = [
    types.PROGRAM_GET_FETCH,
    types.PROGRAM_GET_SUCCESS,
    types.PROGRAM_GET_FAILURE,
  ];

  return storageAsync(storage.SELECTED_PROGRAM, actionTypes, GET_KEY);
}
