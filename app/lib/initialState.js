import {
  REMINDER_DISABLED,
  SOUND_ENABLED,
  PRO_DISABLED,
  PROGRAM_ACTIVE,
  EXERCISE_ACTIVE,
  PERFORM_PUSH_UP_SOUND,
} from '../lib/constants';
import {
  DAYS,
  BASE_DATE,
} from '../lib/reminder';

const initialAsyncState = {
  isFetching: false,
  isFetched: false,
  isRemoving: false,
  isRemoved: false,
  isSaving: false,
  isSaveSuccess: false,
  isError: false,
  isObjFound: false,
  isViewRender: false,
  isInitRequired: false,
};

// Program
const programInitialState = {
  exercise: {},
  preview: {},
  day: 1,
  repsCompleted: 0,
  repsAdded: 0,
  status: PROGRAM_ACTIVE,
};

const TIMER_SECONDS = 60;

// Exercise
const exerciseInitialState = {
  set: 0,
  rep: 0,
  mode: EXERCISE_ACTIVE,
  sets: [],
  timer: TIMER_SECONDS,
  decIntervalId: 0,
  decIntervalSet: false,
  timeElapsedIntervalId: 0,
  timeElapsedIntervalSet: false,
  sound: PERFORM_PUSH_UP_SOUND,
  sessionRepsCompleted: 0,
  repsCompleted: 0,
  repsAdded: 0,
  timeElapsed: 0,
  calories: 0,
  totalRepsRemaining: 0,
  record: 0,
  repCountSet: 0,
};

// Reminder
const DAY_OBJECT = {
  mode: REMINDER_DISABLED,
  date: BASE_DATE,
};
const NUMBER_OF_DAYS_WEEK = 7;
const days = Array(NUMBER_OF_DAYS_WEEK)
  .fill(DAY_OBJECT)
  .map((val, index) => (
    Object.assign(
      {},
      val,
      { day: DAYS[index] },
    )
  ),
);

const reminderInitialState = {
  days,
  modalVisible: false,
  modalDatePickerDate: BASE_DATE,
  modalOldDatePickerDate: BASE_DATE,
};

// Sound
const soundInitialState = {
  coachMode: SOUND_ENABLED,
  beepMode: SOUND_ENABLED,
};

// Util
const utilInitialState = { proMode: PRO_DISABLED };

// Statistics
const statisticInitialState = {
  total: 0,
  record: 0,
  calories: 0,
  timeElapsed: 0,
  selectedYear: new Date(),
  selectedYearChartData: [],
  chartData: [],
};

const analyticsInitialState = {
  positiveCount: 0,
  showRateDialog: true,
};

export const combinedProgramInitialState = Object.assign(
  {},
  initialAsyncState,
  programInitialState,
);

export const combinedExerciseInitialState = Object.assign(
  {},
  initialAsyncState,
  exerciseInitialState,
);

export const combinedReminderInitialState = Object.assign(
  {},
  initialAsyncState,
  reminderInitialState,
);

export const combinedSoundInitialState = Object.assign(
  {},
  initialAsyncState,
  soundInitialState,
);

export const combinedUtilInitialState = Object.assign(
  {},
  initialAsyncState,
  utilInitialState,
);

export const combinedStatisticInitialState = Object.assign(
  {},
  initialAsyncState,
  statisticInitialState,
);

export const combinedAnalyticsInitialState = Object.assign(
  {},
  initialAsyncState,
  analyticsInitialState,
);

export const onLoadCreateAsyncActions = (props) => {
  props.setUtilAsync(combinedUtilInitialState);
  props.setReminderAsync(combinedReminderInitialState);
  props.setSoundAsync(combinedSoundInitialState);
  props.setAnalyticsAsync(combinedAnalyticsInitialState);
};

export const onResetCreateAsyncActions = (props) => {
  props.setUtilAsync(combinedUtilInitialState);
  props.setReminderAsync(combinedReminderInitialState);
  props.setSoundAsync(combinedSoundInitialState);
};
