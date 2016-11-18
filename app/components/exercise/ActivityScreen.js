import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';
import Proximity from 'react-native-proximity';

import StatisticItem from '../shared/StatisticItem';
import RepItem from './RepItem';
import Button from '../shared/Button';
import {
  COLOR_ORANGE,
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
  BASE_FONT_FAMILY_IOS,
  ACTIVITY_BACKGROUND_COLOR,
} from '../../theme/style';
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
import getIconJsx from '../../lib/icon';
import format from '../../lib/format';

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  topContainer: {
    paddingTop: 10,
    backgroundColor: ACTIVITY_BACKGROUND_COLOR,
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_ORANGE,
    borderTopColor: 'black',
    borderTopWidth: 0.5,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  bottomContainer: { flex: 1 },
  activeState: {
    color: 'white',
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontSize: 22,
    textAlign: 'center',
  },
  statisticWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  statisticInnerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  setWrapper: {
    backgroundColor: '#CCCCCC',
  },
  setInnerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
  },
  digit: {
    fontSize: 38,
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
  remaining: {
    color: '#333333',
    fontFamily: BASE_FONT_FAMILY_IOS,
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

const getActiveDigit = (exercise) => {
  const {
    mode,
    rep,
    timer,
  } = exercise;

  switch (mode) {
    case EXERCISE_ACTIVE:
      return rep;
    case EXERCISE_REST:
      return timer;
    default:
      return 0;
  }
};

const getRemainingJsx = (exercise) => {
  const { mode } = exercise;

  if (mode === EXERCISE_ACTIVE) {
    return (
      <Text
        style={styles.remaining}
      >
        Remaining
      </Text>
    );
  }

  return (
    <View />
  );
};

const getElapsedFormat = exercise => format(exercise.timeElapsed);

const getRepsJsx = exercise => exercise.sets.map((set, index) => {
  const isRepActive = index === exercise.set;
  const backgroundColor = isRepActive ? ACTIVITY_BACKGROUND_COLOR : '#CCCCCC';
  const textColor = isRepActive ? COLOR_ORANGE : 'black';
  const fontWeight = isRepActive ? 'bold' : 'normal';

  return (
    <RepItem
      key={index}
      backgroundColorStyle={backgroundColor}
      textColorStyle={textColor}
      fontWeightStyle={fontWeight}
      value={set}
    />
  );
});

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

const FADE_COLOR = '#CCCCCC';

const onPressActions = {
  saveExerciseSaveClose: (props) => {
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
  },
};

export default class ActivityScreen extends Component {

  componentDidMount() {
    this.props.setTimeElapsedIntervalId(setInterval(this.props.timerElapsedTimeIncrease, 1000));

    Proximity.addListener(this.props.setProximity);
  }

  componentDidUpdate() {
    const { exercise } = this.props;

    const {
      decIntervalSet,
      mode,
    } = exercise;

    if (exercise.mode === EXERCISE_COMPLETE) {
      cleanUpState(this.props);
    } else if (mode === EXERCISE_REST && !decIntervalSet) {
      this.props.setDecIntervalId(setInterval(this.props.timerDecrease, 1000));
    } else if (decIntervalSet && mode !== EXERCISE_REST) {
      clearInterval(this.props.exercise.decIntervalId);
      this.props.clearDecIntervalId();
    }
  }

  componentWillUnmount() {
    // Consider using TimerMixin - no ES6 API so use react-mixin?
    cleanUpTimers(this.props);

    Proximity.removeListener(this.props.setProximity);
  }

  render() {
    const { exercise } = this.props;
    const {
      sets,
      totalRepsRemaining,
    } = exercise;
    const { saveExerciseSaveClose } = onPressActions;

    const activeState = getActiveStateTitle(exercise);
    const activeDigit = getActiveDigit(exercise);
    const elapsedFormat = getElapsedFormat(exercise);

    const remainingJsx = getRemainingJsx(exercise);
    const repsJsx = getRepsJsx(exercise);

    const addRepIconJsx = getIconJsx(Icon, 'add');
    const nextSetIconJsx = getIconJsx(Icon, 'queue-play-next');
    const saveCloseIconJsx = getIconJsx(Icon, 'save');
    const abortIconJsx = getIconJsx(Icon, 'close');

    initSound(this.props);

    return (
      <View
        style={styles.wrapper}
      >
        <View style={styles.topContainer}>

          <View>
            <Text
              style={styles.activeState}
            >
              {activeState}
            </Text>
          </View>

          <View
            style={styles.statisticWrapper}
          >
            <View
              style={styles.statisticInnerWrapper}
            >
              <StatisticItem
                value={elapsedFormat}
                property="Elapsed"
                valueColorStyle="white"
                propertyColorStyle={FADE_COLOR}
              />
              <StatisticItem
                value={totalRepsRemaining}
                property="Remaining"
                valueColorStyle="white"
                propertyColorStyle={FADE_COLOR}
              />
              <StatisticItem
                value="29"
                property="Record"
                valueColorStyle="white"
                propertyColorStyle={FADE_COLOR}
              />
            </View>
          </View>
        </View>

        <View
          style={styles.setWrapper}
        >
          <View
            style={styles.setInnerWrapper}
          >
            {repsJsx}
          </View>
        </View>
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => this.props.decrementRep()}
        >
          <View
            style={styles.middleContainer}
          >
            <Text
              style={styles.digit}
            >
              {activeDigit}
            </Text>
            {remainingJsx}
          </View>
        </TouchableOpacity>
        <ScrollView
          style={styles.bottomContainer}
        >
          <Button>
            <Button.Item
              text="Add Rep"
              iconJsx={addRepIconJsx}
              onPress={() => this.props.incrementRep()}
            />
            <Button.Item
              text="Next Set"
              iconJsx={nextSetIconJsx}
              //onPress={() => continueTraining(props)}
            />
            <Button.Item
              text="Save & Close"
              iconJsx={saveCloseIconJsx}
              onPress={() => saveExerciseSaveClose(this.props)}
            />
            <Button.Item
              lastItem
              text="Abort Training"
              iconJsx={abortIconJsx}
              //onPress={() => abortTraining(props)}
            />
          </Button>
        </ScrollView>
      </View>
    );
  }
}
