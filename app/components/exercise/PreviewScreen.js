import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import StatisticItem from './StatisticItem';
import {
  isProEnabled,
  upgrade,
} from '../../lib/util';
import { PRO_PROGRAM } from '../../lib/constants';
import {
  COLOR_ORANGE,
  LINE_COLOR,
  FADE_COLOR,
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
  BASE_FONT_FAMILY_IOS,
} from '../../theme/style';
import Instruction from '../shared/Instruction';
import Pro from '../shared/Pro';
import getIconJsx from '../../lib/icon';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollWrapper: {
    flex: 1,
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
  },
  topWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: LINE_COLOR,
    borderBottomWidth: 1,
  },
  middleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: LINE_COLOR,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  bottomWrapper: {
    flex: 2,
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  titleIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
  iconWrapper: { paddingLeft: 5 },
  repsWrapper: {
    flex: 1,
    borderRightColor: LINE_COLOR,
    borderRightWidth: 1,
  },
  daysWrapper: { flex: 1 },
  buttonWrapper: {
    backgroundColor: COLOR_ORANGE,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    color: 'white',
    fontSize: 18,
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
});

const cleanReset = (props) => {
  props.resetExercise();
  props.resetProgram();
};

const onPressActions = {
  startProgram: (props, proEnabled) => {
    const { previewProgram } = props;

    const selectedProgram = previewProgram.selectedProgram;

    if (!proEnabled && selectedProgram.mode === PRO_PROGRAM) {
      upgrade(props);
    } else {
      cleanReset(props);

      props.setSets(selectedProgram.days[0].sets);

      // TODO: Refactor this!
      props.setNewProgramStateAsync(selectedProgram.name);
      // Skip doing an async fetch
      props.setProgramByName(selectedProgram.name);

      props.navigateReset('ActivityContainer');
    }
  },
};

export default (props) => {
  const {
    previewProgram,
    util,
  } = props;

  const { startProgram } = onPressActions;

  const proEnabled = isProEnabled(util.proMode);

  const selectedProgram = previewProgram.selectedProgram;

  const isProMode = selectedProgram.mode === PRO_PROGRAM && !proEnabled;
  const title = selectedProgram.name;
  const totalReps = 124;
  const totalDays = selectedProgram.days.length;

  const iconStyle = [14, FADE_COLOR];
  const repsIconJsx = getIconJsx(Icon, 'repeat', ...iconStyle);
  const daysIconJsx = getIconJsx(Icon, 'today', ...iconStyle);

  return (
    <View
      style={styles.wrapper}
    >
      <ScrollView
        style={styles.scrollWrapper}
      >
        <View
          style={styles.topWrapper}
        >
          <View
            style={styles.titleIconWrapper}
          >
            <Text
              style={styles.title}
            >
              {title}
            </Text>
            <View
              style={styles.iconWrapper}
            >
              <Pro />
            </View>
          </View>
        </View>
        <View
          style={styles.middleWrapper}
        >
          <View
            style={styles.repsWrapper}
          >
            <StatisticItem
              value={totalReps}
              property="Reps"
              iconComponent={repsIconJsx}
            />
          </View>
          <View
            style={styles.daysWrapper}
          >
            <StatisticItem
              value={totalDays}
              property="Days"
              iconComponent={daysIconJsx}
            />
          </View>
        </View>
        <View
          style={styles.bottomWrapper}
        >
          <Instruction />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => startProgram(props, isProMode)}
      >
        <View
          style={styles.buttonWrapper}
        >
          <Text
            style={styles.button}
          >
            Start Program {'\u003E'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
