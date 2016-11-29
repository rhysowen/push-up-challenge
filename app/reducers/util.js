import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import { PRO_ENABLED } from '../lib/constants';
import { combinedUtilInitialState } from '../lib/initialState';
import parseJson from '../lib/parseJson';
import * as assigns from '../lib/assignReducer';

export default createReducer(combinedUtilInitialState, {
  [types.UTIL_FETCH_ATTEMPT]() {
    return assigns.fetchAttempt(combinedUtilInitialState);
  },
  [types.UTIL_FETCH_SUCCESS](state, action) {
    const result = parseJson(action.payload);

    let ret = {};

    if (result.exist) {
      ret = result.obj;
    } else {
      ret = { isInitRequired: true };
    }

    return assigns.fetchSuccess(combinedUtilInitialState, ret, result);
  },
  [types.UTIL_FETCH_FAILURE](state) {
    return assigns.fetchFailure(state);
  },
  [types.UTIL_SAVE_ATTEMPT](state) {
    return assigns.saveAttempt(state);
  },
  [types.UTIL_SAVE_SUCCESS](state) {
    return assigns.saveSuccess(state);
  },
  [types.UTIL_SAVE_FAILURE](state) {
    return assigns.saveFailure(state);
  },
  [types.UTIL_REMOVE_ATTEMPT](state) {
    return assigns.removeAttempt(state);
  },
  [types.UTIL_REMOVE_SUCCESS]() {
    return assigns.removeSuccess(combinedUtilInitialState);
  },
  [types.UTIL_REMOVE_FAILURE](state) {
    return assigns.removeFailure(state);
  },
  [types.UTIL_ACTIVATE_PRO](state) {
    return Object.assign(
      {},
      state,
      { proMode: PRO_ENABLED },
    );
  },
});
