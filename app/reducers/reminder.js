import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import { combinedReminderInitialState } from '../lib/initialState';
import parseJson from '../lib/parseJson';
import * as assigns from '../lib/assignReducer';

export default createReducer(combinedReminderInitialState, {
  [types.REMINDER_FETCH_ATTEMPT](state, action) {
    return assigns.fetchAttempt(combinedReminderInitialState);
  },
  [types.REMINDER_FETCH_SUCCESS](state, action) {
    const result = parseJson(action.payload);

    let ret = {};

    if (result.exist) {
      ret = {
        days: result.obj.days.map(day => (
          Object.assign(
            {},
            day,
            { date: new Date(day.date) }
          )
        )),
      };
    } else {
      ret = { isInitRequired: true };
    }

    return assigns.fetchSuccess(combinedReminderInitialState, ret, result);
  },
  [types.REMINDER_FETCH_FAILURE](state, action) {
    return assigns.fetchFailure(state);
  },
  [types.REMINDER_SAVE_ATTEMPT](state, action) {
    return assigns.saveAttempt(state);
  },
  [types.REMINDER_SAVE_SUCCESS](state, action) {
    return assigns.saveSuccess(state);
  },
  [types.REMINDER_REMOVE_ATTEMPT](state, action) {
    return assigns.removeAttempt(state);
  },
  [types.REMINDER_REMOVE_SUCCESS](state, action) {
    return assigns.removeSuccess(combinedReminderInitialState);
  },
  [types.REMINDER_REMOVE_FAILURE](state, action) {
    return assigns.removeFailure(combinedReminderInitialState);
  },
  [types.REMINDER_MODAL_TOGGLE](state, action) {
    return Object.assign(
      {},
      state,
      { modalVisible: !state.modalVisible }
    );
  },
  [types.REMINDER_SET_DATE](state, action) {
    return Object.assign(
      {},
      state,
      { modalDatePickerDate: action.payload }
    );
  },
  [types.REMINDER_SET_OLD_DATE](state, action) {
    return Object.assign(
      {},
      state,
      { modalOldDatePickerDate: action.payload }
    );
  },
  [types.REMINDER_SET_SELECTED_DATE_ID](state, action) {
    return Object.assign(
      {},
      state,
      { modalSelectedDateId: action.payload }
    );
  },
});
