import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import {
  EXERCISE_ACTIVE,
  EXERCISE_PAUSE,
  EXERCISE_REST,
} from '../lib/constants';

const timer = 5;

const exerciseInitialState = {
  set: 0,
  rep: 0,
  mode: EXERCISE_ACTIVE,
  sets: [],
  timer,
  intervalId: 0,
  intervalSet: false,
};

const getReps = (state, nextRep) => {
  const { rep } = state;

  if (rep > 1) {
    return rep - 1;
  }

  if (nextRep !== undefined) {
    return nextRep;
  }

  return 0;
};

const getSet = (state, nextRep) => {
  const {
    rep,
    set,
  } = state;

  if (rep === 1 && nextRep !== undefined) {
    return set + 1;
  }

  return set;
};

export default createReducer(exerciseInitialState, {
  [types.EXERCISE_SET_REP](state, action) {
    return Object.assign(
      {},
      state,
      { rep: action.payload }
    );
  },
  [types.EXERCISE_SET_SETS](state, action) {
    return Object.assign(
      {},
      state,
      {
        sets: action.payload,
        rep: action.payload[state.set],
      },
    );
  },
  [types.EXERCISE_NEXT_SET](state, action) {
    return Object.assign(
      {},
      state,
      { set: state.set + 1 }
    );
  },
  [types.EXERCISE_INCREMENT_REP](state, action) {
    return Object.assign(
      {},
      state,
      { rep: state.rep + 1 }
    );
  },
  [types.EXERCISE_DECREMENT_REP](state, action) {

    const nextRep = state.sets[state.set + 1];

    return Object.assign(
      {},
      state,
      {
        rep: getReps(state, nextRep),
        set: getSet(state, nextRep),
        mode: state.rep - 1 === 0 ? EXERCISE_PAUSE : state.mode,
      },
    );
  },
  [types.EXERCISE_SET_MODE](state, action) {
    return Object.assign(
      {},
      state,
      { mode: action.payload },
    );
  },
  [types.EXERCISE_SET_INTERVAL_ID](state, action) {
    return Object.assign(
      {},
      state,
      {
        intervalId: action.payload,
        intervalSet: true,
      },
    );
  },
  [types.EXERCISE_CLEAR_INTERVAL_ID](state, action) {
    return Object.assign(
      {},
      state,
      {
        intervalId: 0,
        intervalSet: false,
        timer,
      },
    );
  },
  [types.EXERCISE_DECREASE_TIMER](state, action) {
    return Object.assign(
      {},
      state,
      { timer: state.timer - 1 },
      { mode: state.mode === EXERCISE_PAUSE && state.timer - 1 === 0 ? EXERCISE_ACTIVE : state.mode },
    );
  },
});
