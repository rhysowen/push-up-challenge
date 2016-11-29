import * as types from './types';
import * as storage from '../lib/storage';
import {
  SET_KEY,
  GET_KEY,
  REMOVE_KEY,
  storageAsync,
} from '../lib/storageAsync';

const saveAsync = (data, mode) => {
  const actionTypes = [
    types.STATISTICS_SAVE_ATTEMPT,
    types.STATISTICS_SAVE_SUCCESS,
    types.STATISTICS_SAVE_FAILURE,
  ];

  const dataJson = JSON.stringify(data);

  return storageAsync(
    storage.STATISTICS,
    actionTypes,
    mode,
    dataJson,
  );
};

const setStatistics = (total, record, calories, timeElapsed) => ({
  type: types.STATISTICS_SET,
  payload: {
    total,
    record,
    calories,
    timeElapsed,
  },
});

export const setStatisticsAsync = (total, record, calories, timeElapsed) => (
  (dispatch, getState) => {
    dispatch(setStatistics(total, record, calories, timeElapsed));

    const state = getState();

    const data = {
      total: state.statistics.total,
      record: state.statistics.record,
      calories: state.statistics.calories,
      timeElapsed: state.statistics.timeElapsed,
      chartData: state.statistics.chartData,
      selectedYearChartData: state.statistics.selectedYearChartData,
    };

    dispatch(saveAsync(data, SET_KEY));
  }
);

export const fetchStatisticsAsync = () => {
  const actionTypes = [
    types.STATISTICS_FETCH_ATTEMPT,
    types.STATISTICS_FETCH_SUCCESS,
    types.STATISTICS_FETCH_FAILURE,
  ];

  return storageAsync(storage.STATISTICS, actionTypes, GET_KEY);
};

export const removeStatisticsAsync = () => {
  const actionTypes = [
    types.STATISTICS_REMOVE_ATTEMPT,
    types.STATISTICS_REMOVE_SUCCESS,
    types.STATISTICS_REMOVE_FAILURE,
  ];

  return storageAsync(storage.STATISTICS, actionTypes, REMOVE_KEY);
};

export const previousYear = () => ({ type: types.STATISTICS_PREVIOUS_YEAR });
export const nextYear = () => ({ type: types.STATISTICS_NEXT_YEAR });
