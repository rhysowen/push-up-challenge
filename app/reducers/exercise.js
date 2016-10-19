import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import {
  EXERCISE_ACTIVE,
  EXERCISE_PAUSE,
  EXERCISE_REST,
  NOT_SET_SOUND,
  PERFORM_PUSH_UP_SOUND,
  REST_SOUND,
  EXERCISE_COMPLETE_SOUND,
  BEEP_SOUND,
} from '../lib/constants';

const TIMER_SECONDS = 5;

const exerciseInitialState = {
  set: 0,
  rep: 0,
  mode: EXERCISE_ACTIVE,
  sets: [],
  timer: TIMER_SECONDS,
  intervalId: 0,
  intervalSet: false,
  sound: PERFORM_PUSH_UP_SOUND,
};

const getDecrementRepState = (state) => {
  const nextRep = state.sets[state.set + 1];
  const isLastRep = state.rep - 1 === 0;

  const {
    rep,
    set,
    mode,
    sound,
  } = state;

  let repReturn = rep;
  let setReturn = set;
  let modeReturn = mode;
  let soundReturn = sound;

  if (rep > 1) {
    repReturn = rep - 1;
  } else if (nextRep !== undefined) {
    repReturn = nextRep;
  } else {
    repReturn = 0;
  }

  if (rep === 1 && nextRep !== undefined) {
    setReturn = set + 1;
  }

  if (isLastRep) {
    modeReturn = EXERCISE_REST;
    soundReturn = REST_SOUND;
  } else {
    soundReturn = BEEP_SOUND;
  }

  return {
    rep: repReturn,
    set: setReturn,
    mode: modeReturn,
    sound: soundReturn,
  };
};

const getDecreaseTimerState = (state) => {
  const timer = state.timer - 1;

  let mode = state.mode;
  let sound = state.sound;

  if (state.mode === EXERCISE_REST && state.timer - 1 === 0) {
    mode = EXERCISE_ACTIVE;
    sound = PERFORM_PUSH_UP_SOUND;
  } else {
    sound = NOT_SET_SOUND;
  }

  return {
    mode,
    sound,
    timer,
  };
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
      {
        rep: state.rep + 1,
        sound: BEEP_SOUND,
      },
    );
  },
  [types.EXERCISE_DECREMENT_REP](state, action) {
    const decrementRepState = getDecrementRepState(state);

    return Object.assign(
      {},
      state,
      decrementRepState
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
        timer: TIMER_SECONDS,
      },
    );
  },
  [types.EXERCISE_DECREASE_TIMER](state, action) {
    const decreaseTimerState = getDecreaseTimerState(state);

    return Object.assign(
      {},
      state,
      decreaseTimerState,
    );
  },
});
