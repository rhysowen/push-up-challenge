import * as types from './types';
import { EXERCISE_ABORT } from '../lib/constants';
import * as storage from '../lib/storage';
import {
  SET_KEY,
  GET_KEY,
  REMOVE_KEY,
  MERGE_KEY,
  storageAsync,
} from '../lib/storageAsync';

function saveExerciseStateAsync(exerciseState, mode) {
  const actionTypes = [
    types.EXERCISE_SAVE_ATTEMPT,
    types.EXERCISE_SAVE_SUCCESS,
    types.EXERCISE_SAVE_FAILURE,
  ];

  const exerciseStateJson = JSON.stringify(exerciseState);

  return storageAsync(
    storage.EXERCISE_STATE,
    actionTypes,
    mode,
    exerciseStateJson
  );
}

export function setNextDayAsync(day, repsCompleted) {
  const exerciseState = {
    day,
    repsCompleted,
    timeElapsed: 0,
    rep: 0,
    set: 0,
  };

  return saveExerciseStateAsync(exerciseState, MERGE_KEY);
}

export function cleanExercise() {
  return { type: types.EXERCISE_CLEAN };
}

export function setExerciseSaveCloseAsync(timeElapsed, rep, repsCompleted, set, day) {
  const exerciseState = {
    timeElapsed,
    rep,
    repsCompleted,
    set,
    day,
  };

  return saveExerciseStateAsync(exerciseState, SET_KEY);
}

export function removeExerciseStateAsync() {
  const actionTypes = [
    types.EXERCISE_REMOVE_ATTEMPT,
    types.EXERCISE_REMOVE_SUCCESS,
    types.EXERCISE_REMOVE_FAILURE,
  ];

  return storageAsync(storage.EXERCISE_STATE, actionTypes, REMOVE_KEY);
}

export function fetchExerciseStateAsync() {
  const actionTypes = [
    types.EXERCISE_GET_FETCH,
    types.EXERCISE_GET_SUCCESS,
    types.EXERCISE_GET_FAILURE,
  ];

  return storageAsync(storage.EXERCISE_STATE, actionTypes, GET_KEY);
}

export function setRep(rep) {
  return {
    type: types.EXERCISE_SET_REP,
    payload: rep,
  };
}

export function setSets(sets) {
  return {
    type: types.EXERCISE_SET_SETS,
    payload: sets,
  };
}

export function nextSet() {
  return {
    type: types.EXERCISE_NEXT_SET,
  };
}

export function incrementRep() {
  return {
    type: types.EXERCISE_INCREMENT_REP,
  };
}

export function decrementRep() {
  return {
    type: types.EXERCISE_DECREMENT_REP,
  };
}

function setMode(mode) {
  return {
    type: types.EXERCISE_SET_MODE,
    payload: mode,
  };
}

export function setDecIntervalId(decIntervalId) {
  return {
    type: types.EXERCISE_SET_DEC_INTERVAL_ID,
    payload: decIntervalId,
  };
}

export function clearDecIntervalId() {
  return {
    type: types.EXERCISE_CLEAR_DEC_INTERVAL_ID,
  };
}

export function setTimeElapsedIntervalId(timeElapsedIntervalId) {
  return {
    type: types.EXERCISE_SET_TIME_ELAPSED_INTERVAL_ID,
    payload: timeElapsedIntervalId,
  };
}

export function clearTimeElapsedIntervalId() {
  return {
    type: types.EXERCISE_CLEAR_TIME_ELAPSED_INTERVAL_ID,
  };
}

export function timerDecrease() {
  return {
    type: types.EXERCISE_DECREASE_TIMER,
  };
}

export function timerElapsedTimeIncrease() {
  return {
    type: types.EXERCISE_ELAPSED_TIME_INCREASE,
  };
}

export function abort() {
  return setMode(EXERCISE_ABORT);
}

export function resetExercise() {
  return { type: types.EXERCISE_RESET };
}

export function toggleVolume() {
  return { type: types.EXERCISE_TOGGLE_SOUND };
}

export function setProximity(data) {
  return {
    type: types.EXERCISE_SET_PROXIMITY,
    payload: data.proximity,
  };
}
