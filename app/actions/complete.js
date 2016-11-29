import * as types from './types';

export const setComplete = (repsCompleted, calories, timeElapsed) => ({
  type: types.COMPLETE_SET,
  payload: {
    repsCompleted,
    calories,
    timeElapsed,
  },
});

export const resetComplete = () => ({
  type: types.COMPLETE_RESET,
});
