import * as types from './types';

export function setComplete(repsCompleted, calories, timeElapsed) {
  return {
    type: types.COMPLETE_SET,
    payload: {
      repsCompleted,
      calories,
      timeElapsed,
    },
  };
}

export function resetComplete() {
  return { type: types.COMPLETE_RESET };
}
