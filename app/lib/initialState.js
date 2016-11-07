import {
  NOTIFICATION_DISABLED,
  SOUND_ENABLED,
  PRO_DISABLED,
} from '../lib/constants';

const initialAsyncState = {
  isFetching: false,
  isFetched: false,
  isError: false,
  isObjFound: false,
  isViewRender: false,
  isInitRequired: false,
  isSaveAttempt: false,
};

const moreInitialState = {
  notification: {
    mode: NOTIFICATION_DISABLED,
    date: new Date(),
  },
  sound: {
    coachMode: SOUND_ENABLED,
    beepMode: SOUND_ENABLED,
  },
  util: {
    proMode: PRO_DISABLED,
  },
};

export default Object.assign(
  {},
  initialAsyncState,
  moreInitialState
);
