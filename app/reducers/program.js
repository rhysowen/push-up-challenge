import Immutable from 'immutable';
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const programElements = Immutable.List([
  { name: 'Beginner Level 1',
    description: 'Under 5 pushups',
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
    days: [
      { sets: [55, 108, 55, 255, 1] },
      { sets: [7, 6, 8, 6, 6] },
      { sets: [8, 7, 6, 8, 7] },
      { sets: [9, 8, 7, 6, 8] },
      { sets: [10, 6, 8, 8, 10] },
    ],
  },
]);

export const programs = createReducer(programElements, {

});

/*export const dayId = createReducer(storage.getKey(storage.SELECTED_DAY), {

});*/

const programInitialState = {
  isFetching: false,
  isFetched: false,
  isError: false,
  isProgramFound: false,
  isViewRender: false,
  exercise: {},
};

const findProgramByName = name => programElements.find(program => program.name === name);

export const program = createReducer(programInitialState, {
  [types.PROGRAM_GET_FETCH](state, action) {
    return Object.assign(
      {},
      programInitialState,
      { isFetching: true }
    );
  },
  [types.PROGRAM_GET_SUCCESS](state, action) {

    const isProgramFound = action.payload !== null;
    const exerciseData = isProgramFound ? JSON.parse(action.payload) : null;

    return Object.assign(
      {},
      programInitialState,
      {
        isFetched: true,
        exercise: exerciseData !== null ? findProgramByName(exerciseData.name) : null,
        isProgramFound,
        isViewRender: true,
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
});
