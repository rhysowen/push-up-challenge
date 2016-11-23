import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import { combinedMoreInitialState } from '../lib/initialState';
import {
  SOUND_ENABLED,
  SOUND_DISABLED,
  PRO_ENABLED,
} from '../lib/constants';

export default createReducer(combinedMoreInitialState, {
  [types.MORE_SET](state, action) {
    return action.payload;
  },
  [types.MORE_GET_FETCH](state, action) {
    return Object.assign(
      {},
      combinedMoreInitialState,
      { isFetching: true }
    );
  },
  [types.MORE_GET_SUCCESS](state, action) {
    const moreObj = JSON.parse(action.payload);
    const moreObjExist = moreObj !== null;

    let ret = {};

    if (moreObjExist) {
      ret = {
        sound: moreObj.sound,
        util: moreObj.util,
        isObjFound: true,
      };
    } else {
      ret = { isInitRequired: true };
    }

    return Object.assign(
      {},
      combinedMoreInitialState,
      ret,
      {
        isFetched: true,
        isViewRender: true,
      },
    );
  },
  [types.MORE_SAVE_ATTEMPT](state, action) {
    return Object.assign(
      {},
      state,
      { isSaveAttempt: true }
    );
  },
  [types.MORE_SAVE_SUCCESS](state, action) {
    return Object.assign(
      {},
      state,
      {
        isObjFound: true,
        isViewRender: true,
      }
    );
  },
  [types.MORE_COACH_SOUND_TOGGLE](state, action) {
    return Object.assign(
      state,
      {
        sound: {
          beepMode: state.sound.beepMode,
          coachMode: state.sound.coachMode === SOUND_ENABLED ? SOUND_DISABLED : SOUND_ENABLED,
        },
      }
    );
  },
  [types.MORE_BEEP_SOUND_TOGGLE](state, action) {
    return Object.assign(
      state,
      {
        sound: {
          coachMode: state.sound.coachMode,
          beepMode: state.sound.beepMode === SOUND_ENABLED ? SOUND_DISABLED : SOUND_ENABLED,
        },
      }
    );
  },
  [types.MORE_UTIL_ACTIVATE_PRO](state, action) {
    return Object.assign(
      state,
      {
        util: {
          proMode: PRO_ENABLED,
        },
      }
    );
  },
});
