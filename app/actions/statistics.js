import * as types from './types';
import * as storage from '../lib/storage';
import {
  SET_KEY,
  GET_KEY,
  REMOVE_KEY,
  storageAsync,
} from '../lib/storageAsync';

export function fetchStatistics() {
  const actionTypes = [
    types.STATISTICS_GET_SUCCESS,
    types.STATISTICS_GET_FAILURE,
  ];

  const initDispatch = types.STATISTICS_GET_FETCH;

  return storageAsync(storage.STATISTICS, actionTypes, GET_KEY, initDispatch);
}

export function setStatistics(total, record) {
  const actionTypes = [
    types.STATISTICS_GET_SUCCESS,
    types.STATISTICS_GET_FAILURE,
  ];

  const initDispatch = types.STATISTICS_GET_FETCH;

  const data = { total, record };

  return storageAsync(storage.STATISTICS, actionTypes, SET_KEY, initDispatch, data);
}

export function removeStatistics() {
  const actionTypes = [
    types.STATISTICS_REMOVE_SUCCESS,
    types.STATISTICS_REMOVE_FAILURE,
  ];

  return storageAsync(storage.STATISTICS, actionTypes, REMOVE_KEY);
}
