import * as types from './types';
import {
  EXERCISE_ACTIVE,
  EXERCISE_ABORT,
} from '../lib/constants';
import * as storage from '../lib/storage';
import {
  SET_KEY,
  GET_KEY,
  REMOVE_KEY,
  storageAsync,
} from '../lib/storageAsync';

const saveAsync = (data, mode) => {
  const actionTypes = [
    types.EXERCISE_SAVE_ATTEMPT,
    types.EXERCISE_SAVE_SUCCESS,
    types.EXERCISE_SAVE_FAILURE,
  ];

  const dataJson = JSON.stringify(data);

  return storageAsync(
    storage.EXERCISE,
    actionTypes,
    mode,
    dataJson
  );
};

export const setExerciseAsync = data => (
  (dispatch) => {
    const dataStore = {
      timeElapsed: data.timeElapsed,
      rep: data.rep,
      repsCompleted: data.repsCompleted,
      set: data.set,
      day: data.day,
      record: data.record,
      repCountSet: data.repCountSet,
    };

    dispatch(saveAsync(dataStore, SET_KEY));
  }
);

export const fetchExerciseAsync = () => {
  const actionTypes = [
    types.EXERCISE_FETCH_ATTEMPT,
    types.EXERCISE_FETCH_SUCCESS,
    types.EXERCISE_FETCH_FAILURE,
  ];

  return storageAsync(storage.EXERCISE, actionTypes, GET_KEY);
};

export const removeExerciseAsync = () => {
  const actionTypes = [
    types.EXERCISE_REMOVE_ATTEMPT,
    types.EXERCISE_REMOVE_SUCCESS,
    types.EXERCISE_REMOVE_FAILURE,
  ];

  return storageAsync(storage.EXERCISE, actionTypes, REMOVE_KEY);
};

export const cleanExercise = () => (
  { type: types.EXERCISE_CLEAN }
);

export const setRep = rep => (
  {
    type: types.EXERCISE_SET_REP,
    payload: rep,
  }
);

export const setSets = sets => (
  {
    type: types.EXERCISE_SET_SETS,
    payload: sets,
  }
);

export const nextSet = () => (
  { type: types.EXERCISE_NEXT_SET }
);

export const incrementRep = () => (
  {
    type: types.EXERCISE_INCREMENT_REP,
  }
);

export const decrementRep = () => (
  {
    type: types.EXERCISE_DECREMENT_REP,
  }
);

export const setMode = mode => (
  {
    type: types.EXERCISE_SET_MODE,
    payload: mode,
  }
);

export const setDecIntervalId = decIntervalId => (
  {
    type: types.EXERCISE_SET_DEC_INTERVAL_ID,
    payload: decIntervalId,
  }
);

export const clearDecIntervalId = () => (
  {
    type: types.EXERCISE_CLEAR_DEC_INTERVAL_ID,
  }
);

export const setTimeElapsedIntervalId = (timeElapsedIntervalId) => (
  {
    type: types.EXERCISE_SET_TIME_ELAPSED_INTERVAL_ID,
    payload: timeElapsedIntervalId,
  }
);

export const clearTimeElapsedIntervalId = () => (
  {
    type: types.EXERCISE_CLEAR_TIME_ELAPSED_INTERVAL_ID,
  }
);

export const timerDecrease = () => (
  {
    type: types.EXERCISE_DECREASE_TIMER,
  }
);

export const timerElapsedTimeIncrease = () => (
  {
    type: types.EXERCISE_ELAPSED_TIME_INCREASE,
  }
);

export const abort = () => setMode(EXERCISE_ABORT);

export const skipRestMode = () => setMode(EXERCISE_ACTIVE);

export const resetExercise = () => (
  { type: types.EXERCISE_RESET }
);

export const setProximity = data => (
  {
    type: types.EXERCISE_SET_PROXIMITY,
    payload: data.proximity,
  }
);
