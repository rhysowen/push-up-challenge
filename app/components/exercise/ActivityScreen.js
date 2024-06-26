import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import KeepAwake from 'react-native-keep-awake';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BaseScreen from '../shared/BaseScreen';
import StatisticItem from '../shared/StatisticItem';
import RepItem from './RepItem';
import Button from '../shared/Button';
import {
  COLOR_ORANGE,
  DISABLED_COLOR,
  BASE_PADDING_TOP,
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
} from '../../lib/constants';
import navigateReset from '../../lib/navigator';
import getIconJsx from '../../lib/icon';
import { formatTimeElapsed } from '../../lib/format';
import abortTraining from '../../lib/abortTraining';
import {
  combinedExerciseProps,
  combinedStatisticsProps,
} from '../../lib/commonProps';
import {
  displayInterstitial,
  isProEnabled,
} from '../../lib/ads';
import Proximity from '../../lib/proximity';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 0,
  },
  topContainer: {
    paddingTop: BASE_PADDING_TOP,
    backgroundColor: ACTIVITY_BACKGROUND_COLOR,
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_ORANGE,
  },
  bottomContainer: { flex: 1 },
  touchableMode: {
    flex: 1,
    borderTopColor: 'black',
    borderTopWidth: 0.5,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  activeState: {
    color: 'white',
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontSize: 22,
    textAlign: 'center',
  },
  statisticWrapper: {
    justifyContent: 'center',
    paddingTop: BASE_PADDING_TOP,
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
  activeText: {
    color: '#333333',
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
});

const saveStatisticsAsync = (props) => {
  const { exercise } = props;

  props.setStatisticsAsync(
    exercise.sessionRepsCompleted,
    exercise.record,
    exercise.calories,
    exercise.timeElapsed,
  );
};

const onPressActions = {
  saveExerciseSaveClose: (props) => {
    saveStatisticsAsync(props);

    props.setProgramSaveCloseAsync(
      props.exercise.sessionRepsCompleted,
      props.exercise.repsAdded,
    );

    props.setExerciseAsync(props.exercise);

    props.cleanExercise();

    navigateReset(props);
  },
  setComplete: (props) => {
    props.nextExerciseSet();
  },
  addRep: (props) => {
    props.incrementExerciseRep();
  },
  activeMode: (props) => {
    const { exercise } = props;

    switch (exercise.mode) {
      case EXERCISE_ACTIVE:
        return props.decrementExerciseRep();
      case EXERCISE_REST:
        return props.skipExerciseRestMode();
      default:
        return {};
    }
  },
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

const getActiveText = (exercise) => {
  const { mode } = exercise;

  switch (mode) {
    case EXERCISE_ACTIVE:
      return 'Remaining';
    case EXERCISE_REST:
      return 'Tap to Skip';
    default:
      return '';
  }
};

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

const cleanUpTimers = (props) => {
  const { exercise } = props;

  clearInterval(exercise.decIntervalId);
  props.clearExerciseDecIntervalId();

  clearInterval(exercise.timeElapsedIntervalId);
  props.clearExerciseTimeElapsedIntervalId();
};

const cleanUpState = (props) => {
  const {
    exercise,
    util,
  } = props;

  // Save statistics
  saveStatisticsAsync(props);

  // Save program
  props.setProgramCompleteAsync(exercise.sessionRepsCompleted, exercise.repsAdded);

  // Set complete props
  props.setComplete(exercise.repsCompleted, exercise.calories, exercise.timeElapsed);

  // Remove exercise from storage
  props.removeExerciseAsync();

  // Reset navigiation
  props.navigateReset('CompleteContainer');

  const proEnabled = isProEnabled(util.proMode);

  if (!proEnabled) {
    displayInterstitial();
  }
};

const FADE_COLOR = '#CCCCCC';

export default class ActivityScreen extends Component {

  componentDidMount() {
    this.props.setExerciseTimeElapsedIntervalId(
      setInterval(this.props.timerExerciseElapsedTimeIncrease, 1000),
    );

    Proximity.start(this.props.setExerciseProximity);

    KeepAwake.activate();
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
      this.props.setExerciseDecIntervalId(setInterval(this.props.timerExerciseDecrease, 1000));
    } else if (decIntervalSet && mode !== EXERCISE_REST) {
      clearInterval(this.props.exercise.decIntervalId);
      this.props.clearExerciseDecIntervalId();
    }
  }

  componentWillUnmount() {
    // Consider using TimerMixin - no ES6 API so use react-mixin?
    cleanUpTimers(this.props);

    Proximity.stop(this.props.setExerciseProximity);

    KeepAwake.deactivate();
  }

  render() {
    const {
      exercise,
      statistics,
    } = this.props;

    const {
      totalRepsRemaining,
      record,
      timeElapsed,
    } = exercise;

    const {
      saveExerciseSaveClose,
      addRep,
      setComplete,
      activeMode,
    } = onPressActions;

    const recordFormat = record > statistics.record ? record : statistics.record;

    const activeState = getActiveStateTitle(exercise);
    const activeDigit = getActiveDigit(exercise);
    const elapsedFormat = formatTimeElapsed(timeElapsed);

    const activeText = getActiveText(exercise);
    const saveCloseText = `Save ${'\u0026'} Close`;
    const repsJsx = getRepsJsx(exercise);

    const buttonDisabled = exercise.mode === EXERCISE_REST;
    const buttonColor = buttonDisabled ? DISABLED_COLOR : COLOR_ORANGE;
    const iconStyle = [30, buttonColor];

    const addRepIconJsx = getIconJsx(Icon, 'add', ...iconStyle);
    const setCompleteIconJsx = getIconJsx(Icon, 'done', ...iconStyle);
    const saveCloseIconJsx = getIconJsx(Icon, 'save');
    const abortIconJsx = getIconJsx(Icon, 'close');

    return (
      <BaseScreen
        style={styles.wrapper}
      >
        <View
          style={styles.topContainer}
        >
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
                value={recordFormat}
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
          style={styles.touchableMode}
          onPress={() => activeMode(this.props)}
        >
          <View
            style={styles.middleContainer}
          >
            <Text
              style={styles.digit}
            >
              {activeDigit}
            </Text>
            <Text
              style={styles.activeText}
            >
              {activeText}
            </Text>
          </View>
        </TouchableOpacity>
        <ScrollView
          style={styles.bottomContainer}
        >
          <Button>
            <Button.Item
              text="Add Rep"
              iconJsx={addRepIconJsx}
              onPress={() => addRep(this.props)}
              buttonDisabled={buttonDisabled}
            />
            <Button.Item
              text="Set Complete"
              iconJsx={setCompleteIconJsx}
              onPress={() => setComplete(this.props)}
              buttonDisabled={buttonDisabled}
            />
            <Button.Item
              text={saveCloseText}
              iconJsx={saveCloseIconJsx}
              onPress={() => saveExerciseSaveClose(this.props)}
            />
            <Button.Item
              lastItem
              text="Abort Training"
              iconJsx={abortIconJsx}
              onPress={() => abortTraining(this.props, () => navigateReset(this.props))}
            />
          </Button>
        </ScrollView>
      </BaseScreen>
    );
  }
}

ActivityScreen.propTypes = {
  exercise: combinedExerciseProps,
  statistics: combinedStatisticsProps,
  setExerciseTimeElapsedIntervalId: React.PropTypes.func,
  timerExerciseElapsedTimeIncrease: React.PropTypes.func,
  setExerciseProximity: React.PropTypes.func,
  setExerciseDecIntervalId: React.PropTypes.func,
  timerExerciseDecrease: React.PropTypes.func,
  clearExerciseDecIntervalId: React.PropTypes.func,
};
