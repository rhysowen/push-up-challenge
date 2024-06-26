import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';

import {
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
  BASE_FONT_FAMILY_IOS,
  COLOR_ORANGE,
  FADE_COLOR,
  LINE_COLOR,
} from '../../theme/style';
import BaseScreen from '../shared/BaseScreen';
import StatisticItem from '../shared/StatisticItem';
import getIconJsx from '../../lib/icon';
import { DEFAULT_MONTHS_ARRAY } from '../../lib/constants';
import { combinedStatisticsProps } from '../../lib/commonProps';
import Chart from './Chart';

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
});

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

  const isDefaultMonthEqualDataMonth =
    _.isEqual(DEFAULT_MONTHS_ARRAY, statistics.selectedYearChartData);

  const isChartShow = statistics.isViewRender &&
    statistics.selectedYearChartData.length > 0 &&
    !isDefaultMonthEqualDataMonth;

  if (isChartShow) {
    return (
      <Chart
        selectedYearChartData={statistics.selectedYearChartData}
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

const StatisticScreen = (props) => {
  const { statistics } = props;

  const {
    selectedYear,
    total,
    record,
    calories,
  } = statistics;

  const selectedYearFormat = selectedYear.getFullYear().toString();
  const caloriesFormat = Math.floor(calories);

  const previousYearIconJsx = getYearIconJsx(() => props.previousYear(), LEFT);
  const nextYearIconJsx = getYearIconJsx(() => props.nextYear(), RIGHT);
  const renderJsx = getRenderJsx(props);

  const rightBorderStyle = {
    borderRightColor: LINE_COLOR,
    borderRightWidth: 1,
  };

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
          rightBorderStyle={rightBorderStyle}
        />
        <StatisticItem
          value={record}
          property="Record"
          propertyColorStyle={FADE_COLOR}
          rightBorderStyle={rightBorderStyle}
        />
        <StatisticItem
          value={caloriesFormat}
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

StatisticScreen.propTypes = {
  statistics: combinedStatisticsProps,
  nextYear: React.PropTypes.func,
};

getRenderJsx.propTypes = { statistics: combinedStatisticsProps };

export default StatisticScreen;
