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
  const {
    program,
    exerciseData,
  } = props;

  const programDays = program.exercise.days.length;
  const currentDay = 0; // exerciseData.currentDay;

  return program.exercise.days[currentDay].sets;
};

export default (props) => {
  const reps = programReps(props);

  return (
    <BaseScreen
      style={styles.wrapper}
    >
      <Text
        style={styles.activeState}
      >
        Perform Push-Ups
      </Text>
      <RepTimer />

      <View
        style={styles.btnWapper}
      >

        <DefaultButton
          name="Done"
          buttonColor={COLOR_ORANGE}
          textColor="white"
          onPress={() => console.log('Todo')}
        />
        <DefaultButton
          name="Abort"
          buttonColor={COLOR_RED}
          textColor="white"
          onPress={() => console.log('Todo')}
        />
      </View>

      <Reps
        reps={reps}
      />
    </BaseScreen>
  );
};
