import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const statisticsInitialState = {
  isFetching: false,
  isFetched: false,
  isError: false,
  isViewRender: false,
  total: 0,
  record: 0,
};

export default createReducer(statisticsInitialState, {
  [types.STATISTICS_GET_FETCH](state, action) {
    return Object.assign(
      {},
      statisticsInitialState,
      { isFetching: true }
    );
  },
  [types.STATISTICS_GET_SUCCESS](state, action) {
    return Object.assign(
      {},
      statisticsInitialState,
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
      statisticsInitialState,
      { isError: true }
    );
  },
  [types.STATISTICS_REMOVE_SUCCESS](state, action) {
    return Object.assign(
      {},
      statisticsInitialState,
      { isViewRender: true }
    );
  },
  [types.STATISTICS_REMOVE_FAILURE](state, action) {
    return {}; // Todo
  },
});
