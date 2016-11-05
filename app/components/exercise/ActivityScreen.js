import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Sound from 'react-native-sound';
import Proximity from 'react-native-proximity';

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
  SOUND_ENABLED,
} from '../../lib/constants';
import navigateReset from '../../lib/navigator';

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

// Sound categories
const COACH_SOUND_CATEGORY = 'COACH_SOUND_CATEGORY';
const BEEP_SOUND_CATEGORY = 'BEEP_SOUND_CATEGORY';

// Sound objects
const peformPushUpsSound = {
  file: peformPushUps,
  category: COACH_SOUND_CATEGORY,
};
const exerciseCompleteSound = {
  file: exerciseComplete,
  category: COACH_SOUND_CATEGORY,
};
const restSound = {
  file: rest,
  category: COACH_SOUND_CATEGORY,
};
const beepSound = {
  file: beep,
  category: BEEP_SOUND_CATEGORY,
};

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

const saveExerciseSaveClose = (props) => {
  props.setProgramSaveCloseAsync(
    props.exercise.sessionRepsCompleted,
    props.exercise.repsAdded,
  );

  props.setExerciseSaveCloseAsync(
    props.exercise.timeElapsed,
    props.exercise.rep,
    props.exercise.repsCompleted,
    props.exercise.set,
    props.exercise.day,
  );

  props.cleanExercise();

  navigateReset(props);
};



const getSoundEnabled = (sounds, props) => {
  const { sound } = props;

  let coachFilter = [];
  if (sound.coachMode === SOUND_ENABLED) {
    coachFilter = sounds.filter(soundObj => soundObj.category === COACH_SOUND_CATEGORY);
  }

  let beepFilter = [];
  if (sound.beepMode === SOUND_ENABLED) {
    beepFilter = sounds.filter(soundObj => soundObj.category === BEEP_SOUND_CATEGORY);
  }

  return [...coachFilter, ...beepFilter];
};

const getActiveSoundObj = (props) => {
  const { exercise } = props;

  switch (exercise.sound) {
    case NOT_SET_SOUND:
      return null;
    case PERFORM_PUSH_UP_SOUND:
      return getSoundEnabled([peformPushUpsSound], props);
    case REST_SOUND:
      return getSoundEnabled([beepSound, restSound], props);
    case EXERCISE_COMPLETE_SOUND:
      return getSoundEnabled([beepSound, exerciseCompleteSound], props);
    case BEEP_SOUND:
      return getSoundEnabled([beepSound], props);
    default:
      return null;
  }
};

const saveStatisticsAsync = (props) => {
  const { exercise } = props;

  props.setStatisticsAsync(
    exercise.repsCompleted,
    10, // Record
    exercise.calories,
    exercise.timeElapsed
  );
};

const cleanUpTimers = (props) => {
  const { exercise } = props;

  clearInterval(exercise.decIntervalId);
  props.clearDecIntervalId();

  clearInterval(exercise.timeElapsedIntervalId);
  props.clearTimeElapsedIntervalId();
};

// Should probably re-think this as it's anti-Redux pattern?
const initSound = (props) => {
  const sounds = getActiveSoundObj(props);
  const soundObjExist = sounds !== null && sounds instanceof Array;

  if (soundObjExist) {
    for (let i = 0; i < sounds.length; i += 1) {
      playSound(sounds[i].file);
    }
  }
};

const cleanUpState = (props) => {
  const { exercise } = props;

  // Save statistics
  saveStatisticsAsync(props);

  // Save program
  props.setCompleteProgramStateAsync(exercise.sessionRepsCompleted, exercise.repsAdded);

  // Set complete props
  props.setComplete(exercise.repsCompleted, exercise.calories, exercise.timeElapsed);

  // Remove exercise from storage
  props.removeExerciseStateAsync();

  // Reset navigiation
  props.navigateReset('CompleteContainer');
};

export default class ActivityScreen extends Component {

  componentDidMount() {
    this.props.setTimeElapsedIntervalId(setInterval(this.props.timerElapsedTimeIncrease, 1000));

    Proximity.addListener(this.props.setProximity);
  }

  componentDidUpdate() {
    const { exercise } = this.props;

    if (exercise.mode === EXERCISE_COMPLETE) {
      cleanUpState(this.props);
    }
  }

  componentWillUnmount() {
    // Consider using TimerMixin - no ES6 API so use react-mixin?
    cleanUpTimers(this.props);

    Proximity.removeListener(this.props.setProximity);
  }

  render() {
    const { exercise } = this.props;

    const sets = exercise.sets;
    const activeState = getActiveStateTitle(exercise);

    initSound(this.props);

    return (
      <BaseScreen
        style={styles.wrapper}
        hideAdvert
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
            onPress={() => saveExerciseSaveClose(this.props)}
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
