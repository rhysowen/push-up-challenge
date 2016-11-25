import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import {
  SOUND_ENABLED,
  SOUND_DISABLED,
} from '../lib/constants';
import { combinedSoundInitialState } from '../lib/initialState';
import parseJson from '../lib/parseJson';
import * as assigns from '../lib/assignReducer';

export default createReducer(combinedSoundInitialState, {
  [types.SOUND_FETCH_ATTEMPT](state, action) {
    return assigns.fetchAttempt(combinedSoundInitialState);
  },
  [types.SOUND_FETCH_SUCCESS](state, action) {
    const result = parseJson(action.payload);

    let ret = {};

    if (result.exist) {
      ret = result.obj;
    } else {
      ret = { isInitRequired: true };
    }

    return assigns.fetchSuccess(combinedSoundInitialState, ret, result);
  },
  [types.SOUND_FETCH_FAILURE](state, action) {
    return assigns.fetchFailure(state);
  },
  [types.SOUND_SAVE_ATTEMPT](state, action) {
    return assigns.saveAttempt(state);
  },
  [types.SOUND_SAVE_SUCCESS](state, action) {
    return assigns.saveSuccess(state);
  },
  [types.SOUND_SAVE_FAILURE](state, action) {
    return assigns.saveFailure(state);
  },
  [types.SOUND_REMOVE_ATTEMPT](state, action) {
    return assigns.removeAttempt(state);
  },
  [types.SOUND_REMOVE_SUCCESS](state, action) {
    return assigns.removeSuccess(combinedSoundInitialState);
  },
  [types.SOUND_REMOVE_FAILURE](state, action) {
    return assigns.removeFailure(combinedSoundInitialState);
  },
  [types.SOUND_COACH_TOGGLE](state, action) {
    return Object.assign(
      {},
      state,
      {
        beepMode: state.beepMode,
        coachMode: state.coachMode === SOUND_ENABLED ? SOUND_DISABLED : SOUND_ENABLED,
      }
    );
  },
  [types.SOUND_BEEP_TOGGLE](state, action) {
    return Object.assign(
      {},
      state,
      {
        coachMode: state.coachMode,
        beepMode: state.beepMode === SOUND_ENABLED ? SOUND_DISABLED : SOUND_ENABLED,
      }
    );
  },
});
