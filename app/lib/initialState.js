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

const statisticInitialState = {
  total: 0,
  record: 0,
  calories: 0,
  timeElapsed: 0,
  selectedYear: new Date(),
  selectedYearChartData: [],
  chartData: [],
  completed: {},
};

export const combinedMoreInitialState = Object.assign(
  {},
  initialAsyncState,
  moreInitialState
);

export const combinedStatisticInitialState = Object.assign(
  {},
  initialAsyncState,
  statisticInitialState
);
