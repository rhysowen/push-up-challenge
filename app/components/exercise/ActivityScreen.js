import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Sound from 'react-native-sound';

import RepTimer from './RepTimer';
import Reps from './Reps';
import {
  COLOR_ORANGE,
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
  EXERCISE_COMPLETE,
  NOT_SET_SOUND,
  PERFORM_PUSH_UP_SOUND,
  REST_SOUND,
  EXERCISE_COMPLETE_SOUND,
  BEEP_SOUND,
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

const loadSound = fileName => (
  new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      // Log this?
    } else {
      // All OK.
    }
  })
);

const playSound = (soundCb) => {
  if (soundCb !== null) {
    soundCb.play((success) => {
      if (success) {
        // All OK.
      } else {
        // Log this?
      }
    });
  }
};

// Load all the sounds
const peformPushUps = loadSound('perform-push-ups.mp3');
const exerciseComplete = loadSound('exercise-complete.mp3');
const rest = loadSound('rest.mp3');
const beep = loadSound('beep.mp3');

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
    case EXERCISE_COMPLETE:
      return 'Complete';
    default:
      return '';
  }
};

const saveActivity = (props) => {
  props.saveActivity(exercise);
};

const getActiveSoundObj = (props) => {
  const { exercise } = props;

  switch (exercise.sound) {
    case NOT_SET_SOUND:
      return null;
    case PERFORM_PUSH_UP_SOUND:
      return peformPushUps;
    case REST_SOUND:
      return rest;
    case EXERCISE_COMPLETE_SOUND:
      return exerciseComplete;
    case BEEP_SOUND:
      return beep;
    default:
      return null;
  }
};

export default class ActivityScreen extends Component {

  componentDidUpdate() {
    const { exercise } = this.props;

    if (exercise.mode === EXERCISE_COMPLETE) {
      this.props.navigateReset('CompleteContainer');
    }
  }

  render() {
    const { exercise } = this.props;

    const sets = exercise.sets;
    const activeState = getActiveStateTitle(exercise);

    const activeSoundObj = getActiveSoundObj(this.props);
    playSound(activeSoundObj);

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
          {...this.props}
        />

        <View
          style={styles.btnWapper}
        >

          <DefaultButton
            name="Save & Close"
            buttonColor={COLOR_ORANGE}
            textColor="white"
            onPress={() => saveActivity(this.props)}
          />
        </View>

        <Reps
          {...this.props}
          sets={sets}
        />
      </BaseScreen>
    );
  }
}
