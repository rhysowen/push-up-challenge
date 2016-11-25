import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import { PRO_ENABLED } from '../lib/constants';
import { combinedUtilInitialState } from '../lib/initialState';
import parseJson from '../lib/parseJson';
import * as assigns from '../lib/assignReducer';

export default createReducer(combinedUtilInitialState, {
  [types.UTIL_FETCH_ATTEMPT](state, action) {
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
  [types.UTIL_FETCH_FAILURE](state, action) {
    return assigns.fetchFailure(state);
  },
  [types.UTIL_SAVE_ATTEMPT](state, action) {
    return assigns.saveAttempt(state);
  },
  [types.UTIL_SAVE_SUCCESS](state, action) {
    return assigns.saveSuccess(state);
  },
  [types.UTIL_SAVE_FAILURE](state, action) {
    return assigns.saveFailure(state);
  },
  [types.UTIL_REMOVE_ATTEMPT](state, action) {
    return assigns.removeAttempt(state);
  },
  [types.UTIL_REMOVE_SUCCESS](state, action) {
    return assigns.removeSuccess(combinedUtilInitialState);
  },
  [types.UTIL_REMOVE_FAILURE](state, action) {
    return assigns.removeFailure(state);
  },
  [types.UTIL_ACTIVATE_PRO](state, action) {
    return Object.assign(
      {},
      state,
      { proMode: PRO_ENABLED },
    );
  },
});
