import * as types from './types';
import { EXERCISE_ABORT } from '../lib/constants';

export function setSet(set) {
  return {
    type: types.EXERCISE_SET_SETS,
    payload: set,
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

export function abort() {
  return setMode(EXERCISE_ABORT);
}
