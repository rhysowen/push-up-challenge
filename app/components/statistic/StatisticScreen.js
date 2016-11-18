import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { HorizontalBarChart } from 'react-native-ios-charts';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
  BASE_FONT_FAMILY_IOS,
  COLOR_ORANGE,
  FADE_COLOR,
  LINE_COLOR,
} from '../../theme/style';
import BaseScreen from '../../theme/BaseScreen';
import StatisticItem from '../shared/StatisticItem';
import getIconJsx from '../../lib/icon';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
  },
  statisticsWrapper: {
    paddingBottom: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: LINE_COLOR,
  },
  yearWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 5,
  },
  yearText: {
    width: 70,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
  chartWrapper: {
    flex: 1,
  },
  chartTextWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartText: {
    fontSize: 18,
    fontFamily: BASE_FONT_FAMILY_IOS,
    color: FADE_COLOR,
  },
  chart: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

const config = {
  dataSets: [],
  backgroundColor: 'transparent',
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct', 'Sep', 'Nov', 'Dec'],
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

const getChartConfig = (props) => {
  const { statistics } = props;

  const dataSet = {
    values: statistics.selectedYearChartData,
    valueTextFontSize: 12,
    colors: [COLOR_ORANGE],
  };

  config.dataSets.pop();
  config.dataSets.push(dataSet);

  return config;
};

const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

const getYearIconJsx = (callback, mode) => {
  const name = mode === LEFT ? 'chevron-left' : 'chevron-right';
  const iconStyle = [35, COLOR_ORANGE];
  const iconJsx = getIconJsx(Icon, name, ...iconStyle);

  return (
    <TouchableOpacity
      onPress={() => callback()}
    >
      {iconJsx}
    </TouchableOpacity>
  );
};

const getRenderJsx = (props) => {
  const { statistics } = props;

  const chartConfig = getChartConfig(props);

  const isChartShow = statistics.isViewRender && statistics.selectedYearChartData.length > 0;

  if (isChartShow) {
    return (
      <HorizontalBarChart
        config={chartConfig}
        style={styles.chart}
      />
    );
  }

  return (
    <View
      style={styles.chartTextWrapper}
    >
      <Text
        style={styles.chartText}
      >
        No data available for this year
      </Text>
    </View>
  );
};

export default (props) => {
  const { statistics } = props;

  const {
    selectedYear,
    total,
    record,
    calories,
  } = statistics;
  const selectedYearFormat = selectedYear.getFullYear().toString();

  const previousYearIconJsx = getYearIconJsx(() => props.previousYear(), LEFT);
  const nextYearIconJsx = getYearIconJsx(() => props.nextYear(), RIGHT);
  const renderJsx = getRenderJsx(props);

  return (
    <BaseScreen
      style={styles.wrapper}
    >
      <View
        style={styles.statisticsWrapper}
      >
        <StatisticItem
          value={total}
          property="Reps"
          propertyColorStyle={FADE_COLOR}
          displayRightBorder
        />
        <StatisticItem
          value={record}
          property="Record"
          propertyColorStyle={FADE_COLOR}
          displayRightBorder
        />
        <StatisticItem
          value={calories}
          property="Calories"
          propertyColorStyle={FADE_COLOR}
        />
      </View>
      <View
        style={styles.yearWrapper}
      >
        {previousYearIconJsx}
        <Text
          style={styles.yearText}
        >
          {selectedYearFormat}
        </Text>
        {nextYearIconJsx}
      </View>
      <View
        style={styles.chartWrapper}
      >
        {renderJsx}
      </View>
    </BaseScreen>
  );
};
