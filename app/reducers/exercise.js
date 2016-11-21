import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import {
  EXERCISE_ACTIVE,
  EXERCISE_PAUSE,
  EXERCISE_REST,
  EXERCISE_COMPLETE,
  NOT_SET_SOUND,
  PERFORM_PUSH_UP_SOUND,
  REST_SOUND,
  EXERCISE_COMPLETE_SOUND,
  BEEP_SOUND,
  ENABLE_SOUND,
  DISABLE_SOUND,
} from '../lib/constants';

const TIMER_SECONDS = 50;

const exerciseInitialState = {
  isFetching: false,
  isFetched: false,
  isError: false,
  isViewRender: false,
  set: 0,
  rep: 0,
  mode: EXERCISE_ACTIVE,
  sets: [],
  timer: TIMER_SECONDS,
  decIntervalId: 0,
  decIntervalSet: false,
  timeElapsedIntervalId: 0,
  timeElapsedIntervalSet: false,
  sound: PERFORM_PUSH_UP_SOUND,
  sessionRepsCompleted: 0,
  repsCompleted: 0,
  repsAdded: 0,
  timeElapsed: 0,
  calories: 0,
  totalRepsRemaining: 0,
  record: 0,
  repCountSet: 0,
};

const getCalories = (state) => {
  const { repsCompleted } = state;

  // Assumption is that 3 push ups burn a single calorie
  const PUSH_UP_CALORIE_BURNT = 3;
  const CALORIES_BURNT = Math.floor(repsCompleted / PUSH_UP_CALORIE_BURNT);

  return CALORIES_BURNT;
};

const getModeSoundState = (rep, set, sets, mode) => {
  const isLastRep = rep - 1 <= 0;
  const isExerciseComplete = isLastRep && set + 1 === sets.length;

  if (isExerciseComplete) {
    return {
      mode: EXERCISE_COMPLETE,
      sound: EXERCISE_COMPLETE_SOUND,
    };
  } else if (isLastRep) {
    return {
      mode: EXERCISE_REST,
      sound: REST_SOUND,
    };
  }

  return {
    mode,
    sound: BEEP_SOUND,
  };
};

const getSoundMode = (mode) => {
  switch (mode) {
    case EXERCISE_ACTIVE:
      return PERFORM_PUSH_UP_SOUND;
    case EXERCISE_REST:
      return REST_SOUND;
    default:
      return NOT_SET_SOUND;
  }
};

const getNextRep = (state) => {
  const nextSet = state.set + 1;
  const nextRep = state.sets[nextSet];

  return typeof nextRep !== 'undefined' ? nextRep : 0;
};

const getRecord = (repCountSet, record) => (
  record > repCountSet ? record : repCountSet
);

const getDecrementRepState = (state) => {
  const nextRep = getNextRep(state);

  const {
    rep,
    set,
    mode,
    sound,
    sessionRepsCompleted,
    repsCompleted,
    totalRepsRemaining,
    repCountSet,
    record,
  } = state;

  let repReturn = rep;
  let setReturn = set;
  let modeReturn = mode;
  let soundReturn = sound;
  let sessionRepsCompletedReturn = sessionRepsCompleted;
  let repsCompletedReturn = repsCompleted;
  let totalRepsRemainingReturn = totalRepsRemaining;
  let repCountSetReturn = repCountSet;
  let recordReturn = record;

  if (rep > 0) {
    totalRepsRemainingReturn = totalRepsRemaining - 1;
    repsCompletedReturn = repsCompletedReturn += 1;
    sessionRepsCompletedReturn = sessionRepsCompletedReturn += 1;

    repCountSetReturn += 1;
    recordReturn = getRecord(repCountSetReturn, recordReturn);
  }

  if (rep > 1) {
    repReturn = rep - 1;
  } else {
    repCountSetReturn = 0;
    repReturn = nextRep;
  }

  if (rep === 1 && nextRep > 0) {
    setReturn = set + 1;
  }

  const modeSoundState = getModeSoundState(state.rep, state.set, state.sets, state.mode);
  modeReturn = modeSoundState.mode;
  soundReturn = modeSoundState.sound;

  return {
    rep: repReturn,
    set: setReturn,
    mode: modeReturn,
    sound: soundReturn,
    sessionRepsCompleted: sessionRepsCompletedReturn,
    repsCompleted: repsCompletedReturn,
    totalRepsRemaining: totalRepsRemainingReturn,
    repCountSet: repCountSetReturn,
    record: recordReturn,
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

const getTotalRemainingReps = (sets, currentSet) => {
  if (sets.length > 0) {
    return sets.slice(currentSet).reduce((prev, cur) => prev + cur, 0);
  }

  return 0;
};

export default createReducer(exerciseInitialState, {
  [types.EXERCISE_GET_FETCH](state, action) {
    return Object.assign(
      {},
      exerciseInitialState,
      { isFetching: true }
    );
  },
  [types.EXERCISE_GET_SUCCESS](state, action) {
    const exerciseObj = JSON.parse(action.payload);
    const exerciseExist = exerciseObj !== null;

    let ret;

    if (exerciseExist) {
      ret = {
        timeElapsed: exerciseObj.timeElapsed,
        rep: exerciseObj.rep,
        repsCompleted: exerciseObj.repsCompleted,
        set: exerciseObj.set,
        record: exerciseObj.record,
        repCountSet: exerciseObj.repCountSet,
      };
    } else {
      ret = {
        timeElapsed: state.timeElapsed,
        rep: state.rep,
        repsCompleted: state.repsCompleted,
        set: state.set,
        record: state.record,
        repCountSet: state.repCountSet,
      };
    }

    return Object.assign(
      {},
      exerciseInitialState,
      {
        isFetched: true,
        isViewRender: true,
        timeElapsed: ret.timeElapsed,
        rep: ret.rep,
        repsCompleted: ret.repsCompleted,
        set: ret.set,
        record: ret.record,
        repCountSet: ret.repCountSet,
      }
    );
  },
  [types.EXERCISE_GET_FAILURE](state, action) {
    return Object.assign(
      {},
      exerciseInitialState,
      { isError: true }
    );
  },
  [types.EXERCISE_REMOVE_SUCCESS](state, action) {
    return Object.assign(
      {},
      exerciseInitialState,
      { isViewRender: true },
    );
  },
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
        totalRepsRemaining: getTotalRemainingReps(action.payload, state.set),
      },
    );
  },
  [types.EXERCISE_NEXT_SET](state, action) {
    const nextRep = getNextRep(state);
    const nextSet = nextRep > 0 ? state.set + 1 : 0;

    const modeSoundState = getModeSoundState(0, state.set, state.sets, state.mode);
    const mode = modeSoundState.mode;
    const sound = modeSoundState.sound;

    const totalRepsRemaining = state.totalRepsRemaining - state.rep;
    const repsCompleted = state.repsCompleted + state.rep;
    const sessionRepsCompleted = state.sessionRepsCompleted + state.rep;

    const totalReps = state.rep + state.repCountSet;
    const record = getRecord(totalReps, state.record);
    const repCountSet = 0;

    return Object.assign(
      {},
      state,
      {
        set: nextSet,
        rep: nextRep,
        mode,
        sound,
        totalRepsRemaining,
        repsCompleted,
        sessionRepsCompleted,
        record,
        repCountSet,
      }
    );
  },
  [types.EXERCISE_INCREMENT_REP](state, action) {
    return Object.assign(
      {},
      state,
      {
        repsAdded: state.repsAdded + 1,
        rep: state.rep + 1,
        totalRepsRemaining: state.totalRepsRemaining + 1,
        sound: NOT_SET_SOUND,
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
    const sound = getSoundMode(action.payload);

    return Object.assign(
      {},
      state,
      {
        mode: action.payload,
        sound,
      },
    );
  },
  [types.EXERCISE_SET_DEC_INTERVAL_ID](state, action) {
    return Object.assign(
      {},
      state,
      {
        decIntervalId: action.payload,
        decIntervalSet: true,
      },
    );
  },
  [types.EXERCISE_CLEAR_DEC_INTERVAL_ID](state, action) {
    return Object.assign(
      {},
      state,
      {
        decIntervalId: 0,
        decIntervalSet: false,
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
  [types.EXERCISE_SET_TIME_ELAPSED_INTERVAL_ID](state, action) {
    return Object.assign(
      {},
      state,
      {
        timeElapsedIntervalId: action.payload,
        timeElapsedIntervalSet: true,
      },
    );
  },
  [types.EXERCISE_CLEAR_TIME_ELAPSED_INTERVAL_ID](state, action) {
    return Object.assign(
      {},
      state,
      {
        timeElapsedIntervalId: 0,
        timeElapsedIntervalSet: false,
      },
    );
  },
  [types.EXERCISE_ELAPSED_TIME_INCREASE](state, action) {
    return Object.assign(
      {},
      state,
      {
        timeElapsed: state.timeElapsed + 1,
        sound: NOT_SET_SOUND,
      }
    );
  },
  [types.EXERCISE_RESET](state, action) {
    return Object.assign(
      {},
      exerciseInitialState,
      { day: state.day },
    );
  },
  [types.EXERCISE_SET_PROXIMITY](state, action) {
    let ret;

    if (action.payload && state.mode === EXERCISE_ACTIVE) {
      ret = getDecrementRepState(state);
    } else {
      ret = { sound: NOT_SET_SOUND };
    }

    return Object.assign(
      {},
      state,
      ret
    );
  },
  [types.EXERCISE_CLEAN](state, action) {
    return Object.assign(
      {},
      state,
      {
        mode: EXERCISE_ACTIVE,
        sound: PERFORM_PUSH_UP_SOUND,
        sessionRepsCompleted: 0,
        repsAdded: 0,
      }
    );
  },
});
