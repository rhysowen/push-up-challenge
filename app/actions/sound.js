import * as types from './types';
import * as storage from '../lib/storage';
import {
  SET_KEY,
  GET_KEY,
  MERGE_KEY,
  REMOVE_KEY,
  storageAsync,
} from '../lib/storageAsync';

const saveAsync = (data, mode) => {
  const actionTypes = [
    types.SOUND_SAVE_ATTEMPT,
    types.SOUND_SAVE_SUCCESS,
    types.SOUND_SAVE_FAILURE,
  ];

  const dataJson = JSON.stringify(data);

  return storageAsync(
    storage.SOUND,
    actionTypes,
    mode,
    dataJson,
  );
};

export const setSoundAsync = data => (
  (dispatch) => {
    const dataStore = {
      coachMode: data.coachMode,
      beepMode: data.beepMode,
    };

    dispatch(saveAsync(dataStore, SET_KEY));
  }
);

export const fetchSoundAsync = () => {
  const actionTypes = [
    types.SOUND_FETCH_ATTEMPT,
    types.SOUND_FETCH_SUCCESS,
    types.SOUND_FETCH_FAILURE,
  ];

  return storageAsync(storage.SOUND, actionTypes, GET_KEY);
};

export const removeSoundAsync = () => {
  const actionTypes = [
    types.SOUND_REMOVE_ATTEMPT,
    types.SOUND_REMOVE_SUCCESS,
    types.SOUND_REMOVE_FAILURE,
  ];

  return storageAsync(storage.SOUND, actionTypes, REMOVE_KEY);
};

export const toggleSoundCoach = () => (
  (dispatch, getState) => {
    dispatch({ type: types.SOUND_COACH_TOGGLE });

    const data = getState().sound;
    const saveData = {
      coachMode: data.coachMode,
    };

    dispatch(saveAsync(saveData, MERGE_KEY));
  }
);

export const toggleSoundBeep = () => (
  (dispatch, getState) => {
    dispatch({ type: types.SOUND_BEEP_TOGGLE });

    const data = getState().sound;
    const saveData = {
      beepMode: data.beepMode,
    };

    dispatch(saveAsync(saveData, MERGE_KEY));
  }
);
