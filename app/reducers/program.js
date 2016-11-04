import Immutable from 'immutable';
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import {
  BEGINNER_LEVEL,
  INTERMEDIATE_LEVEL,
  ADVANCED_LEVEL,
  EXPERT_LEVEL,
  PROGRAM_ACTIVE,
  PROGRAM_COMPLETE,
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
  repsCompleted: 0,
  status: PROGRAM_ACTIVE,
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
    const programObj = JSON.parse(action.payload);
    const programObjExist = programObj !== null;

    let ret = {};

    if (programObjExist) {
      const exercise = findProgramByName(programObj.name);

      ret = Object.assign(
        {},
        programInitialState,
        {
          exercise,
          day: programObj.day,
          repsCompleted: programObj.repsCompleted,
          status: programObj.status,
          isProgramFound: true,
        },
      );
    } else {
      ret = programInitialState;
    }

    return Object.assign(
      {},
      ret,
      {
        isViewRender: true,
        isFetched: true,
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
  [types.PROGRAM_DAY_COMPLETE](state, action) {
    const NEXT_DAY_INCREMENT = 1;
    const NEXT_DAY = state.day + NEXT_DAY_INCREMENT;
    const IS_PROGRAM_COMPLETE = NEXT_DAY > state.exercise.days.length;
    const currentTotalReps = state.day === 1 ? 0 : state.repsCompleted;

    return Object.assign(
      {},
      state,
      {
        repsCompleted: action.payload + currentTotalReps,
        day: IS_PROGRAM_COMPLETE ? state.day : NEXT_DAY,
        status: IS_PROGRAM_COMPLETE ? PROGRAM_COMPLETE : PROGRAM_ACTIVE,
      },
    );
  },
  [types.PROGRAM_GET_EXERCISE_BY_NAME](state, action) {
    const exercise = findProgramByName(action.payload);

    return Object.assign(
      {},
      state,
      {
        exercise,
        isFetched: true,
        isProgramFound: true,
      },
    );
  },
  [types.PROGRAM_RESET](state, action) {
    return Object.assign(
      {},
      programInitialState,
    );
  },
  [types.PROGRAM_SET_COMPLETE_PROGRAM](state, action) {
    return Object.assign(
      {},
      state,
      {
        isViewRender: true,
        day: action.payload.day,
        repsCompleted: action.payload.repsCompleted,
        status: action.payload.status,
      }
    );
  },
  [types.PROGRAM_SAVE_CLOSE](state, action) {
    return Object.assign(
      {},
      state,
      {
        isViewRender: true,
        repsCompleted: action.payload,
      }
    );
  },
});
