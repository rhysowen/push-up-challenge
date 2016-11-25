import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import { combinedProgramInitialState } from '../lib/initialState';
import { findProgramByName } from '../lib/program';
import parseJson from '../lib/parseJson';
import * as assigns from '../lib/assignReducer';
import {
  PROGRAM_ACTIVE,
  PROGRAM_COMPLETE,
} from '../lib/constants';

export default createReducer(combinedProgramInitialState, {
  [types.PROGRAM_FETCH_ATTEMPT](state, action) {
    return assigns.fetchAttempt(combinedProgramInitialState);
  },
  [types.PROGRAM_FETCH_SUCCESS](state, action) {
    const result = parseJson(action.payload);

    let ret = {};

    if (result.exist) {
      const exercise = findProgramByName(result.obj.name);

      ret = {
        exercise,
        day: result.obj.day,
        repsCompleted: result.obj.repsCompleted,
        repsAdded: result.obj.repsAdded,
        status: result.obj.status,
      };
    }

    return assigns.fetchSuccess(combinedProgramInitialState, ret, result);
  },
  [types.PROGRAM_FETCH_FAILURE](state, action) {
    return assigns.fetchFailure(state);
  },
  [types.PROGRAM_REMOVE_ATTEMPT](state, action) {
    return assigns.removeAttempt(state);
  },
  [types.PROGRAM_REMOVE_SUCCESS](state, action) {
    return assigns.removeSuccess(combinedProgramInitialState);
  },
  [types.PROGRAM_REMOVE_FAILURE](state, action) {
    return assigns.removeFailure(combinedProgramInitialState);
  },
  [types.PROGRAM_SET_BY_NAME](state, action) {
    const exercise = findProgramByName(action.payload);

    return Object.assign(
      {},
      state,
      {
        exercise,
        name: action.payload,
        isFetched: true,
        isObjFound: true,
      },
    );
  },
  [types.PROGRAM_RESET](state, action) {
    return Object.assign(
      {},
      combinedProgramInitialState,
    );
  },
  [types.PROGRAM_SET_PROGRAM_COMPLETE](state, action) {
    const NEXT_DAY_INCREMENT = 1;
    const NEXT_DAY = state.day + NEXT_DAY_INCREMENT;
    const IS_PROGRAM_COMPLETE = NEXT_DAY > state.exercise.days.length;

    return Object.assign(
      {},
      state,
      {
        repsCompleted: action.payload.repsCompleted + state.repsCompleted,
        repsAdded: action.payload.repsAdded + state.repsAdded,
        day: IS_PROGRAM_COMPLETE ? state.day : NEXT_DAY,
        status: IS_PROGRAM_COMPLETE ? PROGRAM_COMPLETE : PROGRAM_ACTIVE,
      },
    );
  },
  [types.PROGRAM_SET_PROGRAM_SAVE_CLOSE](state, action) {
    return Object.assign(
      {},
      state,
      {
        //isViewRender: true,
        repsCompleted: action.payload.repsCompleted + state.repsCompleted,
        repsAdded: action.payload.repsAdded + state.repsAdded,
      }
    );
  },
  [types.PROGRAM_SET_PREVIEW_BY_NAME](state, action) {
    const preview = findProgramByName(action.payload);

    return Object.assign(
      {},
      state,
      { preview }
    );
  },
});
