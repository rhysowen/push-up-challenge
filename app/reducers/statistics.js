import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const statisticsInitialState = {
  isFetching: false,
  isFetched: false,
  isError: false,
  isViewRender: false,
  total: 0,
  record: 0,
  calories: 0,
  timeElapsed: 0,
  completed: {},
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
    const statisticsObj = JSON.parse(action.payload);
    return Object.assign(
      {},
      statisticsInitialState,
      {
        isFetched: true,
        isViewRender: true,
        total: statisticsObj.total,
        record: statisticsObj.record,
        calories: statisticsObj.calories,
        timeElapsed: statisticsObj.timeElapsed,
      }
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
  [types.STATISTICS_SET](state, action) {
    return Object.assign(
      state,
      {
        total: state.total + action.payload.total,
        record: action.payload.record > state.record ? action.payload.record : state.record,
        calories: state.calories + action.payload.calories,
        timeElapsed: state.timeElapsed + action.payload.timeElapsed,
      }
    );
  },
});
