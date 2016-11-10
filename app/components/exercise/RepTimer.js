import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  COLOR_ORANGE,
  BASE_FONT_FAMILY_IOS,
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
} from '../../theme/style';
import {
  EXERCISE_ACTIVE,
  EXERCISE_PAUSE,
  EXERCISE_REST,
} from '../../lib/constants';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  repsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  repsRemaining: {
    color: COLOR_ORANGE,
    fontSize: 100,
    fontFamily: BASE_FONT_FAMILY_IOS,
    textAlign: 'center',
  },
});

const onButtonPress = (callback, buttonEnabled) => {
  if (buttonEnabled) {
    callback();
  }
};

export default class RepTimer extends Component {

  componentDidUpdate() {
    const { exercise } = this.props;

    const {
      decIntervalSet,
      mode,
    } = exercise;

    if (mode === EXERCISE_REST && !decIntervalSet) {
      this.props.setDecIntervalId(setInterval(this.props.timerDecrease, 1000));
    } else if (decIntervalSet && mode !== EXERCISE_REST) {
      clearInterval(this.props.exercise.decIntervalId);
      this.props.clearDecIntervalId();
    }
  }

  getActiveTimer() {
    const { exercise } = this.props;

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
  }

  render() {
    const { exercise } = this.props;

    const remainingReps = exercise.rep;
    const activeTimer = this.getActiveTimer();

    const buttonsEnabled = exercise.mode === EXERCISE_ACTIVE;

    return (
      <View
        style={styles.wrapper}
      >
        <View style={{flexDirection: 'row'}}>
          <View style={{justifyContent: 'center', flex: 0.4, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() =>  onButtonPress(this.props.decrementRep, true /**buttonsEnabled*/)}
            >
            <Text style={{fontSize: 50, color: COLOR_ORANGE}}>-</Text>
            </TouchableOpacity>
          </View>
          <View
            style={styles.repsWrapper}
          >
            <Text
              style={styles.repsRemaining}
            >
              {activeTimer}
            </Text>
          </View>
          <View style={{justifyContent: 'center', flex: 0.4, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() =>  onButtonPress(this.props.incrementRep, true /**buttonsEnabled*/)}
            >
            <Text style={{fontSize: 50, color: COLOR_ORANGE}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
