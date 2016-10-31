import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const completeInitialState = {
  repsCompleted: 0,
  timeElapsed: 0,
  calories: 0,
};

export default createReducer(completeInitialState, {
  [types.COMPLETE_SET](state, action) {
    return Object.assign(
      {},
      {
        repsCompleted: action.payload.repsCompleted,
        timeElapsed: action.payload.timeElapsed,
        calories: action.payload.calories,
      },
    );
  },
});
