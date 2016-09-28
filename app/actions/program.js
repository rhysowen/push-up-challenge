import * as types from './types';
import * as storage from '../lib/storage';

export function setProgramByName(programName) {
  return (dispatch, getState) => {
    dispatch({
      type: types.PROGRAM_SAVE,
      payload: programName,
    });
  };
}

export function getProgram() {
  return (dispatch, getState) => {

    dispatch({ type: types.PROGRAM_GET_NAME_FETCH });

    const key = storage.getKey(storage.SELECTED_PROGRAM_NAME);

    key.then(
      (response) => {
        dispatch({
          type: types.PROGRAM_GET_NAME_SUCCESS,
          payload: response,
        });
      },
      (error) => {
        dispatch({
          type: types.PROGRAM_GET_NAME_FAILURE,
          payload: error,
        });
      }
    );
  };
}
