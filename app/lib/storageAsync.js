import * as storage from '../lib/storage';

const SET_KEY = 'SET_KEY';
const GET_KEY = 'GET_KEY';
const REMOVE_KEY = 'REMOVE_KEY';

const storageAsync = (key, actionTypes, mode, initDispatch = null, data = null) => (
  (dispatch, getState) => {
    let storageKey;

    switch (mode) {
      case SET_KEY:
        storageKey = storage.setKey(key, data);
        break;
      case GET_KEY:
        storageKey = storage.getKey(key);
        break;
      case REMOVE_KEY:
        storageKey = storage.removeKey(key);
        break;
      default:
        // Handle error - perhaps log it?
        break;
    }

    // We can update the view to show the initial dispatch - usually a fetch
    if (initDispatch !== null) {
      dispatch({ type: initDispatch });
    }

    if (storageKey !== 'undefined') {
      storageKey.then(
        (response) => {
          dispatch({
            type: actionTypes[0],
            payload: response,
          });
        },
        (error) => {
          dispatch({
            type: actionTypes[1],
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
  storageAsync,
};
