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

function setProgramSaveClose(repsCompleted) {
  return {
    type: types.PROGRAM_SAVE_CLOSE,
    payload: repsCompleted,
  };
}

export function setProgramSaveCloseAsync(repsCompleted) {
  return (dispatch, getState) => {
    dispatch(setProgramSaveClose(repsCompleted));

    const state = getState();
    const program = state.program;
    const programState = { repsCompleted: program.repsCompleted };
    dispatch(saveProgramStateAsync(programState, MERGE_KEY));
  };
}

function setProgramDayComplete(repsCompleted) {
  return {
    type: types.PROGRAM_DAY_COMPLETE,
    payload: repsCompleted,
  };
}

function setCompleteProgramState(programState) {
  const {
    day,
    repsCompleted,
    status,
  } = programState;

  return {
    type: types.PROGRAM_SET_COMPLETE_PROGRAM,
    payload: {
      day,
      repsCompleted,
      status,
    },
  };
}

export function setCompleteProgramStateAsync(repsCompleted) {
  return (dispatch, getState) => {
    dispatch(setProgramDayComplete(repsCompleted));

    const programDayCompleteState = getState().program;
    const programDayCompleteStateRet = {
      day: programDayCompleteState.day,
      repsCompleted: programDayCompleteState.repsCompleted,
      status: programDayCompleteState.status,
    };

    dispatch(setCompleteProgramState(programDayCompleteStateRet));

    const competeProgramState = getState().program;
    const competeProgramStateReturn = {
      day: competeProgramState.day,
      repsCompleted: competeProgramState.repsCompleted,
      status: competeProgramState.status,
    };

    dispatch(saveProgramStateAsync(competeProgramStateReturn, MERGE_KEY));
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

export function resetProgram() {
  return { type: types.PROGRAM_RESET };
}
