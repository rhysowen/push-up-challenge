import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import { combinedAnalyticsInitialState } from '../lib/initialState';
import {
  MAX_POSITIVE_COUNT,
  REMIND_LATER,
} from '../lib/constants';
import parseJson from '../lib/parseJson';
import * as assigns from '../lib/assignReducer';

const getPositiveCount = (state) => {
  const {
    positiveCount,
    showRateDialog,
  } = state;

  if (showRateDialog) {
    const incrementPositiveCount = positiveCount + 1;

    if (incrementPositiveCount > MAX_POSITIVE_COUNT) {
      return 1;
    }

    return incrementPositiveCount;
  }

  return 0;
};

const getShowRateDialog = showRateDialog => showRateDialog === REMIND_LATER;

export default createReducer(combinedAnalyticsInitialState, {
  [types.ANALYTICS_FETCH_ATTEMPT](state, action) {
    return assigns.fetchAttempt(combinedAnalyticsInitialState);
  },
  [types.ANALYTICS_FETCH_SUCCESS](state, action) {
    const result = parseJson(action.payload);

    let ret = {};

    if (result.exist) {
      ret = result.obj;
    } else {
      ret = { isInitRequired: true };
    }

    return assigns.fetchSuccess(combinedAnalyticsInitialState, ret, result);
  },
  [types.ANALYTICS_FETCH_FAILURE](state, action) {
    return assigns.fetchFailure(state);
  },
  [types.ANALYTICS_SAVE_ATTEMPT](state, action) {
    return assigns.saveAttempt(state);
  },
  [types.ANALYTICS_SAVE_SUCCESS](state, action) {
    return assigns.saveSuccess(state);
  },
  [types.ANALYTICS_SAVE_FAILURE](state, action) {
    return assigns.saveFailure(state);
  },
  [types.ANALYTICS_REMOVE_ATTEMPT](state, action) {
    return assigns.removeAttempt(state);
  },
  [types.ANALYTICS_REMOVE_SUCCESS](state, action) {
    return assigns.removeSuccess(combinedAnalyticsInitialState);
  },
  [types.ANALYTICS_REMOVE_FAILURE](state, action) {
    return assigns.removeFailure(state);
  },
  [types.ANALYTICS_INCREMENT_POSITIVE](state, action) {
    const positiveCount = getPositiveCount(state);

    return Object.assign(
      {},
      state,
      { positiveCount }
    );
  },
  [types.ANALYTICS_DIALOG_RESPONSE](state, action) {
    const showRateDialog = getShowRateDialog(action.payload);

    return Object.assign(
      {},
      state,
      { showRateDialog }
    );
  },
});
