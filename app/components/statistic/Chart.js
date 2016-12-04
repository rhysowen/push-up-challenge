import React from 'react';
import {
  Platform,
  StyleSheet,
} from 'react-native';

import { HorizontalBarChart } from 'react-native-ios-charts';
import BarChart from 'react-native-chart-android/BarChart.android';

import { COLOR_ORANGE } from '../../theme/style';

const styles = StyleSheet.create({
  iosChart: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  androidChart: {
    flex: 1,
  },
});

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct', 'Sep', 'Nov', 'Dec'];

const iosConfig = {
  dataSets: [],
  backgroundColor: 'transparent',
  labels,
  showLegend: false,
  minOffset: 20,
  xAxis: {
    axisLineWidth: 0,
    position: 'bottom',
  },
  leftAxis: {
    spaceTop: 0.18,
  },
  rightAxis: {
    enabled: false,
    drawGridLines: false,
  },
  valueFormatter: {
    type: 'regular',
  },
  animation: {
    yAxisDuration: 1,
    easingOption: 'easeInQuart',
  },
};

const getChartIosConfig = (selectedYearChartData) => {
  const dataSet = {
    values: selectedYearChartData,
    valueTextFontSize: 12,
    colors: [COLOR_ORANGE],
  };

  iosConfig.dataSets.pop();
  iosConfig.dataSets.push(dataSet);

  return iosConfig;
};

const getChartAndroidData = (selectedYearChartData) => {
  const xValues = labels;

  const yValues = [{
    data: selectedYearChartData,
    label: '',
    config: { color: COLOR_ORANGE },
  }];

  const data = {
    xValues,
    yValues,
  };

  return data;
};

const Chart = (props) => {
  const { selectedYearChartData } = props;

  if (Platform.OS === 'ios') {
    const config = getChartIosConfig(selectedYearChartData);

    return (
      <HorizontalBarChart
        config={config}
        style={styles.iosChart}
      />
    );
  }

  const data = getChartAndroidData(selectedYearChartData);
  const yAxisRight = { enable: false };
  const legend = { enable: false };

  return (
    <BarChart
      style={styles.androidChart}
      yAxisRight={yAxisRight}
      description=""
      legend={legend}
      data={data}
    />
  );
};

Chart.propTypes = {
  selectedYearChartData: React.PropTypes.arrayOf(React.PropTypes.number),
};

export default Chart;
