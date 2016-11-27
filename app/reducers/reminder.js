import PushNotification from 'react-native-push-notification';

import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import { combinedReminderInitialState } from '../lib/initialState';
import parseJson from '../lib/parseJson';
import * as assigns from '../lib/assignReducer';
import {
  REMINDER_DISABLED,
  REMINDER_ENABLED,
} from '../lib/constants';
import { dayToNumber } from '../lib/reminder';

const convertOldDate = (oldDate, selectedDay) => {
  const hours = oldDate.getHours();
  const minutes = oldDate.getMinutes();
  const seconds = oldDate.getSeconds();

  const day = dayToNumber(selectedDay);

  const todayDate = new Date();
  todayDate.setDate((todayDate.getDate() + (day + (7 - todayDate.getDay()))) % 7);
  todayDate.setHours(hours, minutes, seconds);

  return todayDate;
};

const scheduleNotification = (day, date) => {
  PushNotification.localNotificationSchedule({
    message: 'It\'s time to workout!',
    date,
    userInfo: { day },
    repeatInterval: 'week',
  });
};

const cancelScheduleNotification = (day) => {
  PushNotification.cancelLocalNotifications({ day });
};

const doNotificationSchedule = (mode, day, date) => {
  cancelScheduleNotification(day);

  if (mode === REMINDER_ENABLED) {
    scheduleNotification(day, date);
  }
};

const getMode = (mode) => {
  if (mode === REMINDER_DISABLED) {
    return REMINDER_ENABLED;
  }

  return REMINDER_DISABLED;
};

const getDays = (days, selectedDay, modalDatePickerDate) => {
  const modalDatePickerRequired = typeof modalDatePickerDate !== 'undefined';

  return days.map((val) => {
    if (val.day === selectedDay) {
      const mode = modalDatePickerRequired ? val.mode : getMode(val.mode);
      const dateToConvert = modalDatePickerRequired ? modalDatePickerDate : val.date;
      const date = convertOldDate(dateToConvert, selectedDay);

      doNotificationSchedule(mode, selectedDay, date);

      return Object.assign(
        {},
        val,
        {
          mode,
          date,
        }
      );
    }
    return val;
  });
};

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
    PushNotification.cancelAllLocalNotifications(0);
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
  [types.REMINDER_SWITCH_TOGGLE](state, action) {
    const days = getDays(state.days, action.payload);

    return Object.assign(
      {},
      state,
      { days }
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
  [types.REMINDER_SET_SELECTED_DAY](state, action) {
    return Object.assign(
      {},
      state,
      { modalSelectedDay: action.payload }
    );
  },
  [types.REMINDER_SET_SELECTED_DAY_TIME](state, action) {
    const days = getDays(state.days, state.modalSelectedDay, state.modalDatePickerDate);

    return Object.assign(
      {},
      state,
      { days }
    );
  },
});
