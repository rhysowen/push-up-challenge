import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import {
  EXERCISE_ACTIVE,
  EXERCISE_REST,
  EXERCISE_COMPLETE,
  NOT_SET_SOUND,
  PERFORM_PUSH_UP_SOUND,
  REST_SOUND,
  EXERCISE_COMPLETE_SOUND,
  BEEP_SOUND,
} from '../lib/constants';
import { combinedExerciseInitialState } from '../lib/initialState';
import parseJson from '../lib/parseJson';
import * as assigns from '../lib/assignReducer';

const TIMER_SECONDS = 60;

const getCalories = (repsCompleted) => {
  // Assumption is that around 4 push ups burn a single calorie
  const PUSH_UP_CALORIE_BURNT = 4;
  const CALORIES_BURNT = repsCompleted / PUSH_UP_CALORIE_BURNT;

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
    calories,
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
  let caloriesReturn = calories;

  if (rep > 0) {
    totalRepsRemainingReturn = totalRepsRemaining - 1;
    repsCompletedReturn = repsCompletedReturn += 1;
    sessionRepsCompletedReturn = sessionRepsCompletedReturn += 1;

    repCountSetReturn += 1;
    recordReturn = getRecord(repCountSetReturn, recordReturn);
    caloriesReturn = getCalories(sessionRepsCompletedReturn);
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

const getTotalRemainingReps = (sets, currentSet) => {
  if (sets.length > 0) {
    return sets.slice(currentSet).reduce((prev, cur) => prev + cur, 0);
  }

  return 0;
};

export default createReducer(combinedExerciseInitialState, {
  [types.EXERCISE_FETCH_ATTEMPT]() {
    return assigns.fetchAttempt(combinedExerciseInitialState);
  },
  [types.EXERCISE_FETCH_SUCCESS](state, action) {
    const result = parseJson(action.payload);

    let ret = {};

    if (result.exist) {
      ret = {
        timeElapsed: result.obj.timeElapsed,
        rep: result.obj.rep,
        repsCompleted: result.obj.repsCompleted,
        set: result.obj.set,
        record: result.obj.record,
        repCountSet: result.obj.repCountSet,
      };
    }

    return assigns.fetchSuccess(combinedExerciseInitialState, ret, result);
  },
  [types.EXERCISE_FETCH_FAILURE](state) {
    return assigns.fetchFailure(state);
  },
  [types.EXERCISE_SAVE_ATTEMPT](state) {
    return assigns.saveAttempt(state);
  },
  [types.EXERCISE_SAVE_SUCCESS](state) {
    return assigns.saveSuccess(state);
  },
  [types.EXERCISE_REMOVE_ATTEMPT](state) {
    return assigns.removeAttempt(state);
  },
  [types.EXERCISE_REMOVE_SUCCESS]() {
    return assigns.removeSuccess(combinedExerciseInitialState);
  },
  [types.EXERCISE_REMOVE_FAILURE]() {
    return assigns.removeFailure(combinedExerciseInitialState);
  },
  [types.EXERCISE_SET_REP](state, action) {
    return Object.assign(
      {},
      state,
      { rep: action.payload },
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
  [types.EXERCISE_NEXT_SET](state) {
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

    const calories = getCalories(sessionRepsCompleted);

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
        calories,
      },
    );
  },
  [types.EXERCISE_INCREMENT_REP](state) {
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
  [types.EXERCISE_DECREMENT_REP](state) {
    const decrementRepState = getDecrementRepState(state);

    return Object.assign(
      {},
      state,
      decrementRepState,
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
  [types.EXERCISE_CLEAR_DEC_INTERVAL_ID](state) {
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
  [types.EXERCISE_DECREASE_TIMER](state) {
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
  [types.EXERCISE_CLEAR_TIME_ELAPSED_INTERVAL_ID](state) {
    return Object.assign(
      {},
      state,
      {
        timeElapsedIntervalId: 0,
        timeElapsedIntervalSet: false,
      },
    );
  },
  [types.EXERCISE_ELAPSED_TIME_INCREASE](state) {
    return Object.assign(
      {},
      state,
      {
        timeElapsed: state.timeElapsed + 1,
        sound: NOT_SET_SOUND,
      },
    );
  },
  [types.EXERCISE_RESET](state) {
    return Object.assign(
      {},
      combinedExerciseInitialState,
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
      ret,
    );
  },
  [types.EXERCISE_CLEAN](state) {
    return Object.assign(
      {},
      state,
      {
        mode: EXERCISE_ACTIVE,
        sound: PERFORM_PUSH_UP_SOUND,
        sessionRepsCompleted: 0,
        repsAdded: 0,
        calories: 0,
      },
    );
  },
});
