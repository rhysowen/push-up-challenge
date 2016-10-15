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

export function setMode(mode) {
  return {
    type: types.EXERCISE_SET_MODE,
    payload: mode,
  };
}

export function setIntervalId(intervalId) {
  return {
    type: types.EXERCISE_SET_INTERVAL_ID,
    payload: intervalId,
  };
}

export function clearIntervalId() {
  return {
    type: types.EXERCISE_CLEAR_INTERVAL_ID,
  };
}

export function timerDecrease() {
  return {
    type: types.EXERCISE_DECREASE_TIMER,
  };
}

export function abort() {
  return setMode(EXERCISE_ABORT);
}
