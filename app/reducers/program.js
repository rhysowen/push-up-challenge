import Immutable from 'immutable';
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import {
  BEGINNER_LEVEL,
  INTERMEDIATE_LEVEL,
  ADVANCED_LEVEL,
  EXPERT_LEVEL,
} from '../lib/constants';

const programElements = Immutable.List([
  { name: 'Beginner Level 1',
    description: 'Under 5 pushups',
    level: BEGINNER_LEVEL,
    days: [
      { sets: [2, 3, 2, 2, 3] },
      { sets: [3, 4, 3, 3, 2] },
      { sets: [4, 3, 3, 4, 2] },
      { sets: [5, 4, 4, 5, 3] },
      { sets: [5, 5, 4, 5, 4] },
    ],
  },
  { name: 'Beginner Level 2',
    description: '6 - 10 pushups',
    level: BEGINNER_LEVEL,
    days: [
      { sets: [6, 6, 7, 6, 6] },
      { sets: [7, 6, 8, 6, 6] },
      { sets: [8, 7, 6, 8, 7] },
      { sets: [9, 8, 7, 6, 8] },
      { sets: [10, 6, 8, 8, 10] },
    ],
  },
  { name: 'Intermediate Level 1',
    description: '11 - 20 pushups',
    level: INTERMEDIATE_LEVEL,
    days: [
      { sets: [6, 6, 7, 6, 6] },
      { sets: [7, 6, 8, 6, 6] },
      { sets: [8, 7, 6, 8, 7] },
      { sets: [9, 8, 7, 6, 8] },
      { sets: [10, 6, 8, 8, 10] },
    ],
  },
  { name: 'Intermediate Level 2',
    description: '21 - 30 pushups',
    level: INTERMEDIATE_LEVEL,
    days: [
      { sets: [6, 6, 7, 6, 6] },
      { sets: [7, 6, 8, 6, 6] },
      { sets: [8, 7, 6, 8, 7] },
      { sets: [9, 8, 7, 6, 8] },
      { sets: [10, 6, 8, 8, 10] },
    ],
  },
  { name: 'Advanced Level 1',
    description: '31 - 40 pushups',
    level: ADVANCED_LEVEL,
    days: [
      { sets: [6, 6, 7, 6, 6] },
      { sets: [7, 6, 8, 6, 6] },
      { sets: [8, 7, 6, 8, 7] },
      { sets: [9, 8, 7, 6, 8] },
      { sets: [10, 6, 8, 8, 10] },
    ],
  },
  { name: 'Advanced Level 2',
    description: '41 - 50 pushups',
    level: ADVANCED_LEVEL,
    days: [
      { sets: [6, 6, 7, 6, 6] },
      { sets: [7, 6, 8, 6, 6] },
      { sets: [8, 7, 6, 8, 7] },
      { sets: [9, 8, 7, 6, 8] },
      { sets: [10, 6, 8, 8, 10] },
    ],
  },
  { name: 'Advanced Level 3',
    description: '51 - 60 pushups',
    level: ADVANCED_LEVEL,
    days: [
      { sets: [6, 6, 7, 6, 6] },
      { sets: [7, 6, 8, 6, 6] },
      { sets: [8, 7, 6, 8, 7] },
      { sets: [9, 8, 7, 6, 8] },
      { sets: [10, 6, 8, 8, 10] },
    ],
  },
  { name: 'Expert Level 1',
    description: '61 - 70 pushups',
    level: EXPERT_LEVEL,
    days: [
      { sets: [6, 6, 7, 6, 6] },
      { sets: [7, 6, 8, 6, 6] },
      { sets: [8, 7, 6, 8, 7] },
      { sets: [9, 8, 7, 6, 8] },
      { sets: [10, 6, 8, 8, 10] },
    ],
  },
  { name: 'Expert Level 2',
    description: '71 - 80 pushups',
    level: EXPERT_LEVEL,
    days: [
      { sets: [55, 108, 55, 255, 1] },
      { sets: [7, 6, 8, 6, 6] },
      { sets: [8, 7, 6, 8, 7] },
      { sets: [9, 8, 7, 6, 8] },
      { sets: [10, 6, 8, 8, 10] },
    ],
  },
]);

const findProgramByName = name => programElements.find(program => program.name === name);

export const programs = createReducer(programElements, {

});

const previewProgramInitialState = {
  selectedProgram: {},
};

export const previewProgram = createReducer(previewProgramInitialState, {
  [types.PROGRAM_SET_PREVIEW_EXERCISE](state, action) {
    return Object.assign(
      {},
      previewProgramInitialState,
      { selectedProgram: findProgramByName(action.payload) },
    );
  },
});

const programInitialState = {
  isFetching: false,
  isFetched: false,
  isError: false,
  isProgramFound: false,
  isViewRender: false,
  exercise: {},
  day: 1,
  exerciseComplete: false,
};

const getExerciseComplete = (state) => {
  let exerciseCompleteReturn = state.exerciseComplete;
  let dayReturn = state.day;

  if (state.exercise.days.length === state.day) {
    exerciseCompleteReturn = true;
  } else {
    dayReturn += 1;
  }

  return {
    exerciseComplete: exerciseCompleteReturn,
    day: dayReturn,
  };
};

export const program = createReducer(programInitialState, {
  [types.PROGRAM_GET_FETCH](state, action) {
    return Object.assign(
      {},
      programInitialState,
      { isFetching: true }
    );
  },
  [types.PROGRAM_GET_SUCCESS](state, action) {
    const exerciseObj = JSON.parse(action.payload);
    const isExerciseExist = exerciseObj !== null;

    return Object.assign(
      {},
      programInitialState,
      {
        isFetched: true,
        exercise: isExerciseExist ? findProgramByName(exerciseObj.name) : null,
        isProgramFound: isExerciseExist,
        isViewRender: true,
        day: isExerciseExist ? exerciseObj.day : programInitialState.day,
      }
    );
  },
  [types.PROGRAM_GET_FAILURE](state, action) {
    return Object.assign(
      {},
      programInitialState,
      { isError: true }
    );
  },
  [types.PROGRAM_REMOVE_SELECTED_SUCCESS](state, action) {
    return Object.assign(
      {},
      programInitialState,
      { isViewRender: true }
    );
  },
  [types.PROGRAM_REMOVE_SELECTED_FAILURE](state, action) {
    return {}; // Todo
  },
  [types.PROGRAM_EXERCISE_COMPLETE](state, action) {
    const exerciseComplete = getExerciseComplete(state);

    return Object.assign(
      state,
      exerciseComplete,
    );
  },
});
