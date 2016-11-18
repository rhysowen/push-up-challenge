import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import { combinedStatisticInitialState } from '../lib/initialState';

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
    const monthArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    monthArray[currentMonth] = totalReps;

    ret.push({
      year: currentYear,
      month: monthArray,
    });
  }

  return ret;
};

export default createReducer(combinedStatisticInitialState, {
  [types.STATISTICS_GET_FETCH](state, action) {
    return Object.assign(
      {},
      combinedStatisticInitialState,
      { isFetching: true }
    );
  },
  [types.STATISTICS_GET_SUCCESS](state, action) {
    const statisticsObj = JSON.parse(action.payload);
    const statisticsObjExist = statisticsObj !== null;

    let ret = {};
    if (statisticsObjExist) {
      ret = {
        isFetched: true,
        isViewRender: true,
        isObjFound: true,
        total: statisticsObj.total,
        record: statisticsObj.record,
        calories: statisticsObj.calories,
        timeElapsed: statisticsObj.timeElapsed,
        chartData: statisticsObj.chartData,
        selectedYearChartData:
          getSelectedYearChartData(
            state.selectedYear,
            statisticsObj.chartData
          ),
      };
    }

    return Object.assign(
      {},
      combinedStatisticInitialState,
      ret,
    );
  },
  [types.STATISTICS_GET_FAILURE](state, action) {
    return Object.assign(
      {},
      combinedStatisticInitialState,
      { isError: true }
    );
  },
  [types.STATISTICS_REMOVE_SUCCESS](state, action) {
    return Object.assign(
      {},
      combinedStatisticInitialState,
      { isViewRender: true }
    );
  },
  [types.STATISTICS_REMOVE_FAILURE](state, action) {
    return {}; // Todo
  },
  [types.STATISTICS_SET](state, action) {
    const chartData = getChartData(state, action.payload.total);

    return Object.assign(
      {},
      state,
      {
        total: state.total + action.payload.total,
        record: action.payload.record > state.record ? action.payload.record : state.record,
        calories: state.calories + action.payload.calories,
        timeElapsed: state.timeElapsed + action.payload.timeElapsed,
        chartData,
        selectedChartData: getSelectedYearChartData(state.selectedYear, chartData),
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
