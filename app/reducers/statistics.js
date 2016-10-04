import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const numericalFigureInitialState = {
  isFetching: false,
  isFetched: false,
  isError: false,
  isNumericalFigureFound: false,
  isViewRender: false,
  total: 0,
  record: 0,
};

export default createReducer(numericalFigureInitialState, {
  [types.STATISTICS_GET_FETCH](state, action) {
    return Object.assign(
      {},
      numericalFigureInitialState,
      { isFetching: true }
    );
  },
  [types.STATISTICS_GET_SUCCESS](state, action) {
    return Object.assign(
      {},
      numericalFigureInitialState,
      {
        isFetched: true,
        isViewRender: true,
      },
      action.payload
    );
  },
  [types.STATISTICS_GET_FAILURE](state, action) {
    return Object.assign(
      {},
      numericalFigureInitialState,
      { isError: true }
    );
  },
  [types.STATISTICS_REMOVE_SUCCESS](state, action) {
    return Object.assign(
      {},
      numericalFigureInitialState,
      { isViewRender: true }
    );
  },
  [types.STATISTICS_REMOVE_FAILURE](state, action) {
    return {}; // Todo
  },
});
