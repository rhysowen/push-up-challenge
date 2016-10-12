import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import { EXERCISE_ACTIVE } from '../lib/constants';

const exerciseInitialState = {
  isFetching: false,
  isFetched: false,
  isError: false,
  isViewRender: false,
  set: 0,
  rep: 0,
  day: 0,
};

export default createReducer(exerciseInitialState, {
  [types.EXERCISE_GET_SUCCESS](state, action) {
    return Object.assign(
      {},
      exerciseInitialState,
      {
        isFetched: true,
        isViewRender: true,
      },
      action.payload
    );
  },
});
