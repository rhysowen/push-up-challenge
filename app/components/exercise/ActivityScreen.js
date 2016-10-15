import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import RepTimer from './RepTimer';
import Reps from './Reps';
import {
  COLOR_ORANGE,
  COLOR_RED,
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
  BASE_FONT_FAMILY_IOS,
} from '../../theme/style';
import BaseScreen from '../../theme/BaseScreen';
import DefaultButton from '../../theme/DefaultButton';
import {
  EXERCISE_ACTIVE,
  EXERCISE_PAUSE,
  EXERCISE_REST,
} from '../../lib/constants';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  activeState: {
    color: COLOR_ORANGE,
    fontSize: 26,
    textAlign: 'center',
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
  btnWapper: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 10,
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
    //maxHeight: 150,
  },
});

// Todo: centralize such code?
const programReps = (props) => {
  const { exercise } = props;

  const currentDay = exercise.day;

  return exercise.days[currentDay].sets;
};

const getActiveStateTitle = (exercise) => {
  switch (exercise.mode) {
    case EXERCISE_ACTIVE:
      return 'Perform Push-Ups';
    case EXERCISE_PAUSE:
      return 'Paused';
    case EXERCISE_REST:
      return 'Rest';
    default:
      return '';
  }
};

const saveComplete = (props) => {
  //props.
};

export default (props) => {
  const { exercise } = props;

  const sets = exercise.sets;
  const activeState = getActiveStateTitle(exercise);

  return (
    <BaseScreen
      style={styles.wrapper}
    >
      <Text
        style={styles.activeState}
      >
        {activeState}
      </Text>
      <RepTimer
        {...props}
      />

      <View
        style={styles.btnWapper}
      >

        <DefaultButton
          name="Save & Close"
          buttonColor={COLOR_ORANGE}
          textColor="white"
          onPress={() => console.log('Todo')}
        />
      </View>

      <Reps
        {...props}
        sets={sets}
      />
    </BaseScreen>
  );
};
