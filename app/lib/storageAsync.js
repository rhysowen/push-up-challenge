import * as storage from '../lib/storage';

const SET_KEY = 'SET_KEY';
const GET_KEY = 'GET_KEY';
const MERGE_KEY = 'MERGE_KEY';
const REMOVE_KEY = 'REMOVE_KEY';

const storageAsync = (key, actionTypes, mode, data = null) => (
  (dispatch, getState) => {
    let storageKey;

    switch (mode) {
      case SET_KEY:
        storageKey = storage.setKey(key, data);
        break;
      case GET_KEY:
        storageKey = storage.getKey(key);
        break;
      case MERGE_KEY:
        storageKey = storage.mergeKey(key, data);
        break;
      case REMOVE_KEY:
        storageKey = storage.removeKey(key);
        break;
      default:
        throw new Error('Mode is not legal');
    }

    // We can update the view to show the initial dispatch - usually a fetch
    dispatch({ type: actionTypes[0] });

    if (storageKey !== 'undefined') {
      storageKey.then(
        (response) => {
          dispatch({
            type: actionTypes[1],
            payload: response,
          });
        },
        (error) => {
          dispatch({
            type: actionTypes[2],
            payload: error,
          });
        }
      );
    }
  }
);

export {
  SET_KEY,
  GET_KEY,
  REMOVE_KEY,
  MERGE_KEY,
  storageAsync,
};
