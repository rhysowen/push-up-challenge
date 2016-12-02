import React from 'react';

const initialAsyncProps = {
  isFetching: React.PropTypes.bool,
  isFetched: React.PropTypes.bool,
  isRemoving: React.PropTypes.bool,
  isRemoved: React.PropTypes.bool,
  isSaving: React.PropTypes.bool,
  isSaveSuccess: React.PropTypes.bool,
  isError: React.PropTypes.bool,
  isObjFound: React.PropTypes.bool,
  isViewRender: React.PropTypes.bool,
  isInitRequired: React.PropTypes.bool,
};

const exerciseProps = {
  set: React.PropTypes.number,
  rep: React.PropTypes.number,
  mode: React.PropTypes.string,
  sets: React.PropTypes.arrayOf(React.PropTypes.number),
  timer: React.PropTypes.number,
  decIntervalId: React.PropTypes.number,
  decIntervalSet: React.PropTypes.bool,
  timeElapsedIntervalId: React.PropTypes.number,
  timeElapsedIntervalSet: React.PropTypes.bool,
  sessionRepsCompleted: React.PropTypes.number,
  repsCompleted: React.PropTypes.number,
  repsAdded: React.PropTypes.number,
  timeElapsed: React.PropTypes.number,
  calories: React.PropTypes.number,
  totalRepsRemaining: React.PropTypes.number,
  record: React.PropTypes.number,
  repCountSet: React.PropTypes.number,
  soundCoachEnabled: React.PropTypes.bool,
  soundBeepEnabled: React.PropTypes.bool,
};

export const combinedExerciseProps = React.PropTypes.shape(
  Object.assign(
    {},
    initialAsyncProps,
    exerciseProps,
  ),
);

const programProps = {
  exercise: React.PropTypes.shape(exerciseProps),
  preview: React.PropTypes.shape(exerciseProps),
  day: React.PropTypes.number,
  repsCompleted: React.PropTypes.number,
  repsAdded: React.PropTypes.number,
  status: React.PropTypes.string,
};

export const combinedProgramProps = React.PropTypes.shape(
  Object.assign(
    {},
    initialAsyncProps,
    programProps,
  ),
);

const utilProps = { proMode: React.PropTypes.string };

export const combinedUtilProps = React.PropTypes.shape(
  Object.assign(
    {},
    initialAsyncProps,
    utilProps,
  ),
);

const reminderProps = {
  days: React.PropTypes.arrayOf(
    React.PropTypes.shape(
      {
        mode: React.PropTypes.string,
        date: React.PropTypes.instanceOf(Date),
        day: React.PropTypes.string,
      },
    ),
  ),
  modalVisible: React.PropTypes.bool,
  modalDatePickerDate: React.PropTypes.instanceOf(Date),
  modalOldDatePickerDate: React.PropTypes.instanceOf(Date),
};

export const combinedReminderProps = React.PropTypes.shape(
  Object.assign(
    {},
    initialAsyncProps,
    reminderProps,
  ),
);

const soundProps = {
  coachMode: React.PropTypes.string,
  beepMode: React.PropTypes.string,
};

export const combinedSoundProps = React.PropTypes.shape(
  Object.assign(
    {},
    initialAsyncProps,
    soundProps,
  ),
);

const analyticsProps = {
  positiveCount: React.PropTypes.number,
  showRateDialog: React.PropTypes.bool,
};

export const combinedAnalyticsProps = React.PropTypes.shape(
  Object.assign(
    {},
    initialAsyncProps,
    analyticsProps,
  ),
);

const statisticsProps = {
  total: React.PropTypes.number,
  record: React.PropTypes.number,
  calories: React.PropTypes.number,
  timeElapsed: React.PropTypes.number,
  selectedYear: React.PropTypes.instanceOf(Date),
  selectedYearChartData: React.PropTypes.arrayOf(React.PropTypes.number),
  chartData: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      month: React.PropTypes.arrayOf(React.PropTypes.number),
      year: React.PropTypes.number,
    }),
  ),
};

export const combinedStatisticsProps = React.PropTypes.shape(
  Object.assign(
    {},
    initialAsyncProps,
    statisticsProps,
  ),
);

export const navigateResetProps = React.PropTypes.func;

export const childrenProps = React.PropTypes.oneOfType([
  React.PropTypes.element,
  React.PropTypes.arrayOf(React.PropTypes.element),
]);

export const navigationProps = React.PropTypes.shape({
  index: React.PropTypes.number,
  routes: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      key: React.PropTypes.string,
      title: React.PropTypes.string,
    }),
  ),
});

const routeProps = {
  key: React.PropTypes.string,
  index: React.PropTypes.number,
  title: React.PropTypes.string,
};

export const tabProps = React.PropTypes.shape(
  Object.assign(
    {},
    routeProps,
    {
      routes: React.PropTypes.arrayOf(
        React.PropTypes.shape(routeProps),
      ),
    },
  ),
);
