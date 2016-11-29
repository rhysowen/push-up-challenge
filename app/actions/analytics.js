import { Alert } from 'react-native';

import * as types from './types';
import * as storage from '../lib/storage';
import {
  SET_KEY,
  GET_KEY,
  MERGE_KEY,
  REMOVE_KEY,
  storageAsync,
} from '../lib/storageAsync';
import {
  MAX_POSITIVE_COUNT,
  RATE_APP,
  REMIND_LATER,
  NO_THANKS,
  APP_NAME,
  RATE_APP_URL,
} from '../lib/constants';
import openUrl from '../lib/linking';

const saveAsync = (data, mode) => {
  const actionTypes = [
    types.ANALYTICS_SAVE_ATTEMPT,
    types.ANALYTICS_SAVE_SUCCESS,
    types.ANALYTICS_SAVE_FAILURE,
  ];

  const dataJson = JSON.stringify(data);

  return storageAsync(
    storage.ANALYTICS,
    actionTypes,
    mode,
    dataJson,
  );
};

export const setAnalyticsAsync = data => (
  (dispatch) => {
    const dataStore = { proMode: data.proMode };

    dispatch(saveAsync(dataStore, SET_KEY));
  }
);

export const fetchAnalyticsAsync = () => {
  const actionTypes = [
    types.ANALYTICS_FETCH_ATTEMPT,
    types.ANALYTICS_FETCH_SUCCESS,
    types.ANALYTICS_FETCH_FAILURE,
  ];

  return storageAsync(storage.ANALYTICS, actionTypes, GET_KEY);
};

export const removeAnalyticsAsync = () => {
  const actionTypes = [
    types.ANALYTICS_REMOVE_ATTEMPT,
    types.ANALYTICS_REMOVE_SUCCESS,
    types.ANALYTICS_REMOVE_FAILURE,
  ];

  return storageAsync(storage.ANALYTICS, actionTypes, REMOVE_KEY);
};

export const dialogResponseAnalytics = response => (
  (dispatch, getState) => {
    dispatch({
      type: types.ANALYTICS_DIALOG_RESPONSE,
      payload: response,
    });

    const data = getState().analytics;
    const saveData = { showRateDialog: data.showRateDialog };

    dispatch(saveAsync(saveData, MERGE_KEY));
  }
);

const rateApp = (callback, dispatch) => {
  dispatch(callback(RATE_APP));
  openUrl(RATE_APP_URL);
};

const initDialog = (positiveCount, dispatch) => {
  const titleFormat = `Rate ${APP_NAME}`;
  const bodyFormat = `If you enjoy using ${APP_NAME}, would you mind taking a moment to rate it? Thanks for your support!`;

  if (positiveCount === MAX_POSITIVE_COUNT) {
    Alert.alert(
      titleFormat,
      bodyFormat,
      [
        {
          text: 'No, Thanks',
          onPress: () => dispatch(dialogResponseAnalytics(NO_THANKS)),
        },
        {
          text: 'Remind Me Later',
          onPress: () => dispatch(dialogResponseAnalytics(REMIND_LATER)),
        },
        {
          text: 'Rate It Now',
          style: 'cancel',
          onPress: () => rateApp(dialogResponseAnalytics, dispatch),
        },
      ],
    );
  }
};

export const incrementPositiveAnalytics = () => (
  (dispatch, getState) => {
    dispatch({ type: types.ANALYTICS_INCREMENT_POSITIVE });

    const data = getState().analytics;
    initDialog(data.positiveCount, dispatch);

    const saveData = { positiveCount: data.positiveCount };

    dispatch(saveAsync(saveData, MERGE_KEY));
  }
);
