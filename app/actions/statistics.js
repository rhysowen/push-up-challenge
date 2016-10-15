import * as types from './types';
import * as storage from '../lib/storage';
import {
  SET_KEY,
  GET_KEY,
  REMOVE_KEY,
  storageAsync,
} from '../lib/storageAsync';

export function fetchStatisticsAsync() {
  const actionTypes = [
    types.STATISTICS_GET_FETCH,
    types.STATISTICS_GET_SUCCESS,
    types.STATISTICS_GET_FAILURE,
  ];

  return storageAsync(storage.STATISTICS, actionTypes, GET_KEY);
}

export function setStatisticsAsync(total, record, currentDay) {
  const actionTypes = [
    types.STATISTICS_SAVE_ATTEMPT,
    types.STATISTICS_SAVE_SUCCESS,
    types.STATISTICS_SAVE_FAILURE,
  ];

  const data = {
    total,
    record,
    currentDay,
  };

  return storageAsync(storage.STATISTICS, actionTypes, SET_KEY, data);
}

export function removeStatisticsAsync() {
  const actionTypes = [
    types.STATISTICS_REMOVE_ATTEMPT,
    types.STATISTICS_REMOVE_SUCCESS,
    types.STATISTICS_REMOVE_FAILURE,
  ];

  return storageAsync(storage.STATISTICS, actionTypes, REMOVE_KEY);
}
