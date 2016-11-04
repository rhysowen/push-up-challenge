import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import moreInitialState from '../lib/moreInitialState';
import {
  NOTIFICATION_ENABLED,
  NOTIFICATION_DISABLED,
} from '../lib/constants';

const initialAsyncState = {
  isFetching: false,
  isFetched: false,
  isError: false,
  isMoreFound: false,
  isViewRender: false,
  isInitRequired: false,
  isSaveAttempt: false,
};

const initialState = Object.assign(
  {},
  initialAsyncState,
  moreInitialState
);

export default createReducer(initialState, {
  [types.MORE_GET_FETCH](state, action) {
    return Object.assign(
      {},
      initialState,
      { isFetching: true }
    );
  },
  [types.MORE_GET_SUCCESS](state, action) {
    const moreObj = JSON.parse(action.payload);
    const moreObjExist = moreObj !== null;

    let ret = {};

    if (moreObjExist) {
      ret = {
        notification: moreObj.notification,
        sound: moreObj.sound,
        isMoreFound: true,
        isViewRender: true,
      };
    } else {
      ret = { isInitRequired: true };
    }

    return Object.assign(
      {},
      initialState,
      ret,
      { isFetched: true },
    );
  },
  [types.MORE_SAVE_ATTEMPT](state, action) {
    return Object.assign(
      {},
      initialState,
      { isSaveAttempt: true }
    );
  },
  [types.MORE_SAVE_SUCCESS](state, action) {
    return Object.assign(
      {},
      initialState,
      {
        isMoreFound: true,
        isViewRender: true,
      }
    );
  },
  [types.MORE_NOTIFICATION_TOGGLE](state, action) {
    return Object.assign(
      {},
      state,
      {
        notification: {
          mode: state.notification.mode === NOTIFICATION_ENABLED ? NOTIFICATION_DISABLED : NOTIFICATION_ENABLED,
          date: state.notification.date,
        },
      },
    );
  },
});
