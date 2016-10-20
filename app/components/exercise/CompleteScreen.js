import React from 'react';
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
  props.setTab(0);
  props.navigateReset('ApplicationTabs');
};

const getCalories = (props) => {
  const { exercise } = props;

  // Assumption is that 3 push ups burn a single calorie
  const PUSH_UP_CALORIE_BURNT = 3;
  const CALORIES_BURNT = Math.floor(exercise.repsCompleted / PUSH_UP_CALORIE_BURNT);

  return CALORIES_BURNT;
};

const getTimeElapsed = (props) => {
  const { exercise } = props;

  return format(exercise.timeElapsed);
};

const CompleteScreen = (props) => {
  const { exercise } = props;
  const calories = getCalories(props);
  const timeElapsed = getTimeElapsed(props);

  return (
    <BaseScreen
      style={styles.wrapper}
    >
      <View
      style={{flex: 1, alignItems: 'center'}}>
        <Text
          style={styles.exerciseCompleteText}
        >
          Exercise Complete
        </Text>
      </View>
      <View
      style={{flex: 2, justifyContent: 'space-between'}}>
        <Info
          title="Total Reps"
          value={exercise.repsCompleted}
        />
        <Info
          title="Calories"
          value={calories}
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
