import * as types from './types';
import { EXERCISE_ABORT } from '../lib/constants';

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
