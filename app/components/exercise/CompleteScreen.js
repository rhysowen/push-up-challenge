import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Info from '../shared/Info';
import BaseScreen from '../../theme/BaseScreen';
import {
  COLOR_ORANGE,
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
  BASE_FONT_FAMILY_IOS,
} from '../../theme/style';
import DefaultButton from '../../theme/DefaultButton';
import format from '../../lib/format';
import {
  PROGRAM_ACTIVE,
  PROGRAM_COMPLETE,
  PRO_DISABLED,
} from '../../lib/constants';
import navigateReset from '../../lib/navigator';
import { displayInterstitial } from '../../lib/ads';

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  exerciseCompleteText: {
    color: COLOR_ORANGE,
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontSize: 22,
  },
});

const onDashboardPress = (props) => {
  navigateReset(props);
};

const getTimeElapsed = (props) => {
  const { complete } = props;

  return format(complete.timeElapsed);
};

const getExerciseCompleteText = (props) => {
  const { program } = props;
  switch (program.status) {
    case PROGRAM_ACTIVE:
      return 'Day Complete!';
    case PROGRAM_COMPLETE:
      return 'Program Complete!';
    default:
      return 'Complete!';
  }
};

const CompleteScreen = (props) => {
  const {
    complete,
    util,
  } = props;

  if (util.proMode === PRO_DISABLED) {
    displayInterstitial();
  }

  const timeElapsed = getTimeElapsed(props);
  const exerciseCompleteText = getExerciseCompleteText(props);

  return (
    <BaseScreen
      style={styles.wrapper}
    >
      <View
        style={{flex: 1, alignItems: 'center'}}
      >
        <Text
          style={styles.exerciseCompleteText}
        >
          {exerciseCompleteText}
        </Text>
      </View>
      <View
        style={{flex: 2, justifyContent: 'space-between'}}
      >
        <Info
          title="Total Reps"
          value={complete.repsCompleted}
        />
        <Info
          title="Calories"
          value={complete.calories}
        />
        <Info
          title="Time Elapsed"
          value={timeElapsed}
        />
      </View>
      <View
        style={{flex: 2, justifyContent: 'center'}}
      >
        <DefaultButton
          name="Back to dashboard"
          buttonColor={COLOR_ORANGE}
          textColor="white"
          onPress={() => onDashboardPress(props)}
        />
      </View>

    </BaseScreen>
  );
};

CompleteScreen.propTypes = {
  // programs: PropTypes.object,
};

export default CompleteScreen;
