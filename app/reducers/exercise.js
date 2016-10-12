import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import { EXERCISE_ACTIVE } from '../lib/constants';

const exerciseInitialState = {
  set: 0,
  rep: 0,
  day: 0,
  mode: EXERCISE_ACTIVE,
};

export default createReducer(exerciseInitialState, {
  [types.EXERCISE_SET_SETS](state, action) {
    return Object.assign(
      {},
      state,
      { set: action.payload }
    );
  },
  [types.EXERCISE_NEXT_SET](state, action) {
    return Object.assign(
      {},
      state,
      { set: action.payload + 1 }
    );
  },
  [types.EXERCISE_INCREMENT_REP](state, action) {
    return Object.assign(
      {},
      state,
      { rep: action.payload + 1 }
    );
  },
  [types.EXERCISE_DECREMENT_REP](state, action) {
    return Object.assign(
      {},
      state,
      { rep: state.rep > 0 ? action.payload - 1 : 0 }
    );
  },
  [types.EXERCISE_SET_MODE](state, action) {
    return Object.assign(
      {},
      state,
      { mode: action.payload },
    );
  },
});
