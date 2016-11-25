import * as types from './types';
import * as storage from '../lib/storage';
import {
  SET_KEY,
  GET_KEY,
  MERGE_KEY,
  REMOVE_KEY,
  storageAsync,
} from '../lib/storageAsync';

const saveAsync = (programState, mode) => {
  const actionTypes = [
    types.PROGRAM_SAVE_ATTEMPT,
    types.PROGRAM_SAVE_SUCCESS,
    types.PROGRAM_SAVE_FAILURE,
  ];

  const programStateJson = JSON.stringify(programState);

  return storageAsync(
    storage.PROGRAM,
    actionTypes,
    mode,
    programStateJson
  );
};

export const setProgramAsync = data => (
  (dispatch) => {
    const dataStore = {
      name: data.name,
      day: data.day,
      repsCompleted: data.repsCompleted,
      repsAdded: data.repsAdded,
      status: data.status,
    };

    dispatch(saveAsync(dataStore, SET_KEY));
  }
);

export const fetchProgramAsync = () => {
  const actionTypes = [
    types.PROGRAM_FETCH_ATTEMPT,
    types.PROGRAM_FETCH_SUCCESS,
    types.PROGRAM_FETCH_FAILURE,
  ];

  return storageAsync(storage.PROGRAM, actionTypes, GET_KEY);
};

export const removeProgramAsync = () => {
  const actionTypes = [
    types.PROGRAM_REMOVE_ATTEMPT,
    types.PROGRAM_REMOVE_SUCCESS,
    types.PROGRAM_REMOVE_FAILURE,
  ];

  return storageAsync(storage.PROGRAM, actionTypes, REMOVE_KEY);
};

const setProgramReps = (repsCompleted, repsAdded, type) => (
  {
    type,
    payload:
    {
      repsCompleted,
      repsAdded,
    },
  }
);

const setProgramSaveClose = (repsCompleted, repsAdded) =>
  setProgramReps(repsCompleted, repsAdded, types.PROGRAM_SET_PROGRAM_SAVE_CLOSE);

export const setProgramSaveCloseAsync = (repsCompleted, repsAdded) => (
  (dispatch, getState) => {
    dispatch(setProgramSaveClose(repsCompleted, repsAdded));

    const state = getState().program;

    const programState = {
      repsCompleted: state.repsCompleted,
      repsAdded: state.repsAdded,
    };

    dispatch(saveAsync(programState, MERGE_KEY));
  }
);

const setProgramComplete = (repsCompleted, repsAdded) =>
  setProgramReps(repsCompleted, repsAdded, types.PROGRAM_SET_PROGRAM_COMPLETE);

export const setProgramCompleteAsync = (repsCompleted, repsAdded) => (
  (dispatch, getState) => {
    dispatch(setProgramComplete(repsCompleted, repsAdded));

    const state = getState().program;

    const programState = {
      day: state.day,
      status: state.status,
      repsCompleted: state.repsCompleted,
      repsAdded: state.repsAdded,
    };

    dispatch(saveAsync(programState, MERGE_KEY));
  }
);

const setProgramByName = name => (
  {
    type: types.PROGRAM_SET_BY_NAME,
    payload: name,
  }
);

export const setProgramByNameAsync = name => (
  (dispatch, getState) => {
    dispatch(setProgramByName(name));

    const state = getState().program;

    const programState = {
      name: state.name,
      day: state.day,
      repsCompleted: state.repsCompleted,
      repsAdded: state.repsAdded,
      status: state.status,
    };

    dispatch(saveAsync(programState, SET_KEY));
  }
);

export const resetProgram = () => (
  { type: types.PROGRAM_RESET }
);

export const setProgramPreviewByName = name => (
  {
    type: types.PROGRAM_SET_PREVIEW_BY_NAME,
    payload: name,
  }
);
