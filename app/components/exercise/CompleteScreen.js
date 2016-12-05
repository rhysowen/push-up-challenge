import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '../shared/Button';
import BaseScreen from '../shared/BaseScreen';
import StatisticItem from '../shared/StatisticItem';
import Information from '../shared/Information';
import {
  COLOR_ORANGE,
  BASE_FONT_FAMILY_IOS,
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
  ACTIVITY_BACKGROUND_COLOR,
} from '../../theme/style';
import {
  formatTimeElapsed,
  formatCalories,
  formatReps,
} from '../../lib/format';
import {
  PROGRAM_ACTIVE,
  PROGRAM_COMPLETE,
} from '../../lib/constants';
import getIconJsx from '../../lib/icon';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 0,
  },
  topWrapper: {
    padding: 20,
    backgroundColor: ACTIVITY_BACKGROUND_COLOR,
    alignItems: 'center',
  },
  middleWrapper: {
    padding: 20,
    backgroundColor: COLOR_ORANGE,
  },
  infoWrapper: {
    paddingTop: 10,
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
  },
  bottomWrapper: { flex: 1 },
  statisticWrapper: {
    flexDirection: 'row',
  },
  praiseText: {
    color: 'white',
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontSize: 22,
  },
  exerciseCompleteText: {
    color: 'white',
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontSize: 16,
  },
});

const navigateResetAppTabs = props => props.navigateReset('ApplicationTabs');

const onPressActions = {
  returnDashboard: (props) => {
    navigateResetAppTabs(props);
    props.setTab(0);
  },
  viewStatistics: (props) => {
    navigateResetAppTabs(props);
    props.setTab(2);
  },
  manageSettings: (props) => {
    navigateResetAppTabs(props);
    props.setTab(3);
  },
};

const getExerciseCompleteText = (props) => {
  const { program } = props;

  switch (program.status) {
    case PROGRAM_ACTIVE:
      return 'Day Complete';
    case PROGRAM_COMPLETE:
      return 'Program Complete';
    default:
      return '';
  }
};

const CompleteScreen = (props) => {
  const { complete } = props;

  const {
    repsCompleted,
    timeElapsed,
    calories,
    praise,
  } = complete;

  const {
    returnDashboard,
    viewStatistics,
    manageSettings,
  } = onPressActions;

  const repsFormat = formatReps(repsCompleted);
  const timeElapsedFormat = formatTimeElapsed(timeElapsed);
  const caloriesFormat = formatCalories(calories);

  const exerciseCompleteText = getExerciseCompleteText(props);
  const infoText = 'For best results, train a minimum of 3 times a week (e.g. Monday, Wednesday and Friday). You can enable reminders via the Settings page.';

  const dashboardIconJsx = getIconJsx(Icon, 'dashboard');
  const statisticsIconJsx = getIconJsx(Icon, 'insert-chart');
  const settingsIconJsx = getIconJsx(Icon, 'more-horiz');

  const rightBorderStyle = {
    borderRightColor: '#B29034',
    borderRightWidth: 1,
  };

  const valueColorStyle = '#F2F2F2';
  const propertyColorStyle = 'white';

  return (
    <BaseScreen
      style={styles.wrapper}
    >
      <View
        style={styles.topWrapper}
      >
        <Text
          style={styles.praiseText}
        >
          {praise}
        </Text>
        <Text
          style={styles.exerciseCompleteText}
        >
          {exerciseCompleteText}
        </Text>
      </View>
      <View
        style={styles.middleWrapper}
      >
        <View
          style={styles.statisticWrapper}
        >
          <StatisticItem
            value={repsFormat}
            property="Reps"
            valueColorStyle={valueColorStyle}
            propertyColorStyle={propertyColorStyle}
            rightBorderStyle={rightBorderStyle}
          />
          <StatisticItem
            value={timeElapsedFormat}
            property="Elapsed"
            valueColorStyle={valueColorStyle}
            propertyColorStyle={propertyColorStyle}
            rightBorderStyle={rightBorderStyle}
          />
          <StatisticItem
            value={caloriesFormat}
            property="Calories"
            valueColorStyle={valueColorStyle}
            propertyColorStyle={propertyColorStyle}
          />
        </View>
      </View>
      <View
        style={styles.infoWrapper}
      >
        <Information
          infoText={infoText}
        />
      </View>
      <View
        style={styles.bottomWrapper}
      >
        <ScrollView>
          <Button>
            <Button.Item
              text="Return to Dashboard"
              iconJsx={dashboardIconJsx}
              onPress={() => returnDashboard(props)}
            />
            <Button.Item
              text="View Statistics"
              iconJsx={statisticsIconJsx}
              onPress={() => viewStatistics(props)}
            />
            <Button.Item
              text="Manage Settings"
              iconJsx={settingsIconJsx}
              onPress={() => manageSettings(props)}
              lastItem
            />
          </Button>
        </ScrollView>
      </View>
    </BaseScreen>
  );
};

CompleteScreen.propTypes = {
  complete: React.PropTypes.shape(
    {
      repsCompleted: React.PropTypes.number,
      timeElapsed: React.PropTypes.number,
      calories: React.PropTypes.number,
    },
  ),
};

export default CompleteScreen;
