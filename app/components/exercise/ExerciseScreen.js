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
    fontSize: 20,
    textAlign: 'center',
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontWeight: 'bold',
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
  timerBtnWrapper: {
    flexDirection: 'row',
  },
  timerBtn: {
    flex: 1,
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
        <View
          style={styles.timerBtnWrapper}
        >
          <DefaultButton
            name="-30 secs"
            buttonColor={COLOR_ORANGE}
            textColor="white"
            outerStyle={[styles.timerBtn]}
            onPress={() => console.log('Todo')}
          />
          <View
            style={styles.timerBtn}
          />
          <DefaultButton
            name="+30 secs"
            buttonColor={COLOR_ORANGE}
            textColor="white"
            outerStyle={[styles.timerBtn]}
            onPress={() => console.log('Todo')}
          />
        </View>

        <DefaultButton
          name="Pause Training"
          buttonColor={COLOR_ORANGE}
          textColor="white"
          onPress={() => console.log('Todo')}
        />
        <DefaultButton
          name="Abort Training"
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
