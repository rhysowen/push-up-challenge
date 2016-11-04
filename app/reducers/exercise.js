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

const TIMER_SECONDS = 5;

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
  soundMode: ENABLE_SOUND,
  sessionRepsCompleted: 0,
  repsCompleted: 0,
  timeElapsed: 0,
  calories: 0,
};

const getCalories = (state) => {
  const { repsCompleted } = state;

  // Assumption is that 3 push ups burn a single calorie
  const PUSH_UP_CALORIE_BURNT = 3;
  const CALORIES_BURNT = Math.floor(repsCompleted / PUSH_UP_CALORIE_BURNT);

  return CALORIES_BURNT;
};

const getDecrementRepState = (state) => {
  const nextRep = state.sets[state.set + 1];
  const isLastRep = state.rep - 1 <= 0;
  const isExerciseComplete = isLastRep && state.set + 1 === state.sets.length;

  const {
    rep,
    set,
    mode,
    sound,
    sessionRepsCompleted,
    repsCompleted,
    calories,
  } = state;

  let repReturn = rep;
  let setReturn = set;
  let modeReturn = mode;
  let soundReturn = sound;
  let sessionRepsCompletedReturn = sessionRepsCompleted;
  let repsCompletedReturn = repsCompleted;
  let caloriesReturn = calories;

  if (rep > 0) {
    repsCompletedReturn = repsCompletedReturn += 1;
    sessionRepsCompletedReturn = sessionRepsCompletedReturn += 1;
  }

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

  if (isExerciseComplete) {
    modeReturn = EXERCISE_COMPLETE;
    soundReturn = EXERCISE_COMPLETE_SOUND;
    caloriesReturn = getCalories(state);
  } else if (isLastRep) {
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
    sessionRepsCompleted: sessionRepsCompletedReturn,
    repsCompleted: repsCompletedReturn,
    calories: caloriesReturn,
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
      };
    } else {
      ret = {
        timeElapsed: state.timeElapsed,
        rep: state.rep,
        repsCompleted: state.repsCompleted,
        set: state.set,
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
  [types.EXERCISE_TOGGLE_SOUND](state, action) {
    return Object.assign(
      {},
      state,
      { soundMode: state.soundMode === ENABLE_SOUND ? DISABLE_SOUND : ENABLE_SOUND },
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
      }
    );
  },
});
