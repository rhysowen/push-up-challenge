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
  const getAdditionalDays = (todayDate) => {
    const todayDay = todayDate.getDay();
    const todayHours = todayDate.getHours();
    const todayMinutes = todayDate.getMinutes();

    const oldDay = oldDate.getDay();
    const oldHours = oldDate.getHours();
    const oldMinutes = oldDate.getMinutes();

    const INCREMENT_BY_WEEK = 7;

    // Old time = 6:13PM
    // Today time = 11:14PM
    if (todayDay === oldDay &&
       (oldHours < todayHours || (oldHours === todayHours && oldMinutes < todayMinutes))) {
      return INCREMENT_BY_WEEK;
    }

    return 0;
  };

  const hours = oldDate.getHours();
  const minutes = oldDate.getMinutes();
  const seconds = oldDate.getSeconds();

  const day = dayToNumber(selectedDay);

  const todayDate = new Date();
  const additionalDays = getAdditionalDays(todayDate);

  todayDate.setDate(todayDate.getDate() + ((day + (7 - todayDate.getDay())) % 7) + additionalDays);
  todayDate.setHours(hours, minutes, seconds);

  return todayDate;
};

const scheduleNotification = (day, date) => {
  const id = day;

  PushNotification.localNotificationSchedule({
    message: 'It\'s time to workout!',
    date,
    userInfo: { id },
    repeatInterval: 'week',
    id,
  });
};

const cancelScheduleNotification = (day) => {
  PushNotification.cancelLocalNotifications({ id: day });
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

const getDays = (days, selectedDay, datePickerDate) => {
  const datePickerRequired = typeof datePickerDate !== 'undefined';

  return days.map((val) => {
    if (val.day === selectedDay) {
      const mode = datePickerRequired ? val.mode : getMode(val.mode);
      const dateToConvert = datePickerRequired ? datePickerDate : val.date;
      const date = convertOldDate(dateToConvert, selectedDay);

      const day = dayToNumber(selectedDay).toString();
      doNotificationSchedule(mode, day, date);

      return Object.assign(
        {},
        val,
        {
          mode,
          date,
        },
      );
    }
    return val;
  });
};

export default createReducer(combinedReminderInitialState, {
  [types.REMINDER_FETCH_ATTEMPT]() {
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
            { date: new Date(day.date) },
          )
        )),
      };
    } else {
      ret = { isInitRequired: true };
    }

    return assigns.fetchSuccess(combinedReminderInitialState, ret, result);
  },
  [types.REMINDER_FETCH_FAILURE](state) {
    return assigns.fetchFailure(state);
  },
  [types.REMINDER_SAVE_ATTEMPT](state) {
    return assigns.saveAttempt(state);
  },
  [types.REMINDER_SAVE_SUCCESS](state) {
    return assigns.saveSuccess(state);
  },
  [types.REMINDER_REMOVE_ATTEMPT](state) {
    return assigns.removeAttempt(state);
  },
  [types.REMINDER_REMOVE_SUCCESS]() {
    PushNotification.cancelAllLocalNotifications(0);
    return assigns.removeSuccess(combinedReminderInitialState);
  },
  [types.REMINDER_REMOVE_FAILURE]() {
    return assigns.removeFailure(combinedReminderInitialState);
  },
  [types.REMINDER_MODAL_TOGGLE](state) {
    return Object.assign(
      {},
      state,
      { modalVisible: !state.modalVisible },
    );
  },
  [types.REMINDER_SWITCH_TOGGLE](state, action) {
    const days = getDays(state.days, action.payload);

    return Object.assign(
      {},
      state,
      { days },
    );
  },
  [types.REMINDER_SET_DATE](state, action) {
    return Object.assign(
      {},
      state,
      { datePickerDate: action.payload },
    );
  },
  [types.REMINDER_SET_OLD_DATE](state, action) {
    return Object.assign(
      {},
      state,
      { oldDatePickerDate: action.payload },
    );
  },
  [types.REMINDER_SET_SELECTED_DAY](state, action) {
    return Object.assign(
      {},
      state,
      { selectedDay: action.payload },
    );
  },
  [types.REMINDER_SET_SELECTED_DAY_TIME](state) {
    const days = getDays(state.days, state.selectedDay, state.datePickerDate);

    return Object.assign(
      {},
      state,
      { days },
    );
  },
});
