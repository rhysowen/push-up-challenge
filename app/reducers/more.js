import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import { 
  NOTIFICATION_ENABLED,
  NOTIFICATION_DISABLED,
  SOUND_ENABLED,
  SOUND_DISABLED,
} from '../lib/constants';

const moreInitialState = {
  notification: {
    mode: NOTIFICATION_DISABLED,
    date: new Date(),
  },
  sound: {
    mode: SOUND_ENABLED,
    coachMode: SOUND_ENABLED,
    beepMode: SOUND_ENABLED,
  },
};

export default createReducer(moreInitialState, {
  [types.MORE_NOTIFICATION_TOGGLE](state, action) {
    return Object.assign(
      {},
      state,
      {
        notification: {
          mode: state.notification.mode === SOUND_ENABLED ? SOUND_DISABLED : SOUND_ENABLED,
          date: state.notification.date,
        },
      },
    );
  },
});
