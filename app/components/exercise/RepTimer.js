import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  COLOR_ORANGE,
  BASE_FONT_FAMILY_IOS,
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
} from '../../theme/style';
import DefaultButton from '../../theme/DefaultButton';
import {
  EXERCISE_ACTIVE,
  EXERCISE_PAUSE,
  EXERCISE_REST,
} from '../../lib/constants';

const styles = StyleSheet.create({
  wrapper: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  repsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  repsRemaining: {
    color: COLOR_ORANGE,
    fontSize: 140,
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
  timerBtnWrapper: {
    flexDirection: 'row',
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
  },
  timerBtn: {
    flex: 1,
  },
});

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

    return (
      <View
        style={styles.wrapper}
      >

        <View
          style={styles.repsWrapper}
        >
          <Text
            style={styles.repsRemaining}
          >
            {activeTimer}
          </Text>
        </View>

        <View
          style={styles.timerBtnWrapper}
        >
          <DefaultButton
            name="-"
            buttonColor="transparent"
            textColor={COLOR_ORANGE}
            textSize={50}
            outerStyle={[styles.timerBtn]}
            onPress={() => this.props.decrementRep()}
          />
          <View
            style={styles.timerBtn}
          />
          <DefaultButton
            name="+"
            buttonColor="transparent"
            textColor={COLOR_ORANGE}
            textSize={50}
            outerStyle={[styles.timerBtn]}
            onPress={() => this.props.incrementRep()}
          />
        </View>

      </View>
    );
  }
}
