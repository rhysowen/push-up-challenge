import createReducer from '../lib/createReducer';
import { DEFAULT_MONTHS_ARRAY } from '../lib/constants';
import { combinedStatisticInitialState } from '../lib/initialState';
import * as types from '../actions/types';
import parseJson from '../lib/parseJson';
import * as assigns from '../lib/assignReducer';

const getSelectedYearChartData = (selectedYear, chartData) => {
  const selectedYearDate = selectedYear.getFullYear();
  const selectedYearChartDataFilter = chartData.length > 0 ?
    chartData.filter(val => val.year === selectedYearDate) : [];

  return selectedYearChartDataFilter.length === 1 ? selectedYearChartDataFilter[0].month : [];
};

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const yearMap = (state, mode) => {
  const fullYear = state.selectedYear.getFullYear();
  const newYear = mode === INCREMENT ? fullYear + 1 : fullYear - 1;

  const selectedYear = new Date(new Date().setFullYear(newYear));
  const selectedYearChartData = getSelectedYearChartData(selectedYear, state.chartData);

  return Object.assign(
    {},
    state,
    {
      selectedYear,
      selectedYearChartData,
    }
  );
};

const getChartData = (state, totalReps) => {
  // See if chart array has the current year.
  const { chartData } = state;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const currentYearDataFilter = chartData.filter(val => val.year === currentYear);
  const notCurrentYearDataFilter = chartData.filter(val => val.year !== currentYear);

  const ret = notCurrentYearDataFilter.length > 0 ? notCurrentYearDataFilter : [];
  const currentYearDataFilterLength = currentYearDataFilter.length;

  if (currentYearDataFilterLength > 0) {
    // Array has this year already.

    if (currentYearDataFilterLength > 1) {
      throw Error('Multiple years found!');
    }

    const currentYearObj = currentYearDataFilter[0];
    currentYearObj.month[currentMonth] += totalReps;

    ret.push(currentYearObj);
  } else {
    const monthArray = DEFAULT_MONTHS_ARRAY.slice();
    monthArray[currentMonth] = totalReps;

    ret.push({
      year: currentYear,
      month: monthArray,
    });
  }

  return ret;
};

export default createReducer(combinedStatisticInitialState, {
  [types.STATISTICS_FETCH_ATTEMPT](state, action) {
    return assigns.fetchAttempt(combinedStatisticInitialState);
  },
  [types.STATISTICS_FETCH_SUCCESS](state, action) {
    const result = parseJson(action.payload);

    let ret = {};

    if (result.exist) {
      const selectedYearChartData =
        getSelectedYearChartData(state.selectedYear, result.obj.chartData);

      ret = {
        total: result.obj.total,
        record: result.obj.record,
        calories: result.obj.calories,
        timeElapsed: result.obj.timeElapsed,
        chartData: result.obj.chartData,
        selectedYearChartData,
      };
    }

    return assigns.fetchSuccess(combinedStatisticInitialState, ret, result);
  },
  [types.STATISTICS_FETCH_FAILURE](state, action) {
    return assigns.fetchFailure(state);
  },
  [types.STATISTICS_SAVE_ATTEMPT](state, action) {
    return assigns.saveAttempt(state);
  },
  [types.STATISTICS_SAVE_SUCCESS](state, action) {
    return assigns.saveSuccess(state);
  },
  [types.STATISTICS_REMOVE_ATTEMPT](state, action) {
    return assigns.removeAttempt(state);
  },
  [types.STATISTICS_REMOVE_SUCCESS](state, action) {
    return assigns.removeSuccess(combinedStatisticInitialState);
  },
  [types.STATISTICS_REMOVE_FAILURE](state, action) {
    return assigns.removeFailure(combinedStatisticInitialState);
  },
  [types.STATISTICS_SET](state, action) {
    const chartData = getChartData(state, action.payload.total);
    const selectedYearChartData = getSelectedYearChartData(state.selectedYear, chartData);

    return Object.assign(
      {},
      state,
      {
        total: state.total + action.payload.total,
        record: action.payload.record > state.record ? action.payload.record : state.record,
        calories: state.calories + action.payload.calories,
        timeElapsed: state.timeElapsed + action.payload.timeElapsed,
        chartData,
        selectedYearChartData,
      }
    );
  },
  [types.STATISTICS_PREVIOUS_YEAR](state, action) {
    return yearMap(state, DECREMENT);
  },
  [types.STATISTICS_NEXT_YEAR](state, action) {
    return yearMap(state, INCREMENT);
  },
});
