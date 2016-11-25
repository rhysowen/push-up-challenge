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
import {
  COLOR_ORANGE,
  BASE_FONT_FAMILY_IOS,
  ACTIVITY_BACKGROUND_COLOR,
  FADE_COLOR,
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
import {
  displayInterstitial,
  isProEnabled,
} from '../../lib/ads';
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
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    backgroundColor: COLOR_ORANGE,
  },
  bottomWrapper: { flex: 1 },
  statisticWrapper: {
    flexDirection: 'row',
  },
  wellDoneText: {
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

const returnDashboard = props => props.navigateReset('ApplicationTabs');

const onPressActions = {
  returnDashboard: (props) => {
    returnDashboard(props);
    props.setTab(0);
  },
  viewStatistics: (props) => {
    returnDashboard(props);
    props.setTab(2);
  },
  manageSettings: (props) => {
    returnDashboard(props);
    props.setTab(3);
  },
};

const getExerciseCompleteText = (props) => {
  const { program } = props;
  switch (program.status) {
    case PROGRAM_ACTIVE:
      return 'You\'re nearly there!';
    case PROGRAM_COMPLETE:
      return 'You\'ve completed the program!';
    default:
      return 'Well Done!';
  }
};

const CompleteScreen = (props) => {
  const {
    complete,
    util,
  } = props;

  const {
    repsCompleted,
    timeElapsed,
    calories,
  } = complete;

  const {
    returnDashboard,
    viewStatistics,
    manageSettings,
  } = onPressActions;

  const proEnabled = isProEnabled(util.proMode);
  if (!proEnabled) {
    displayInterstitial();
  }

  const repsFormat = formatReps(repsCompleted);
  const timeElapsedFormat = formatTimeElapsed(timeElapsed);
  const caloriesFormat = formatCalories(calories);

  const exerciseCompleteText = getExerciseCompleteText(props);

  const dashboardIconJsx = getIconJsx(Icon, 'dashboard');
  const statisticsIconJsx = getIconJsx(Icon, 'insert-chart');
  const settingsIconJsx = getIconJsx(Icon, 'more-horiz');

  const rightBorderStyle = {
    borderRightColor: '#B29034',
    borderRightWidth: 1,
  };

  return (
    <BaseScreen
      style={styles.wrapper}
    >
      <View
        style={styles.topWrapper}
      >
        <Text
          style={styles.wellDoneText}
        >
          Well Done!
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
            propertyColorStyle={FADE_COLOR}
            rightBorderStyle={rightBorderStyle}
          />
          <StatisticItem
            value={timeElapsedFormat}
            property="Elapsed"
            propertyColorStyle={FADE_COLOR}
            rightBorderStyle={rightBorderStyle}
          />
          <StatisticItem
            value={caloriesFormat}
            property="Calories"
            propertyColorStyle={FADE_COLOR}
          />
        </View>
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

export default CompleteScreen;
