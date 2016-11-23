import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import StatisticItem from '../shared/StatisticItem';
import { upgrade } from '../../lib/util';
import {
  getProEnabled,
  getTotalReps,
} from '../../lib/program';
import {
  COLOR_ORANGE,
  LINE_COLOR,
  FADE_COLOR,
  BASE_PADDING_TOP,
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
  BASE_FONT_FAMILY_IOS,
} from '../../theme/style';
import BaseScreen from '../shared/BaseScreen';
import Instruction from '../shared/Instruction';
import Pro from '../shared/Pro';

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
    paddingTop: BASE_PADDING_TOP,
    paddingBottom: 10,
  },
  bottomWrapper: {
    flex: 2,
    justifyContent: 'flex-start',
    paddingTop: BASE_PADDING_TOP,
  },
  titleIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: BASE_PADDING_TOP,
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

    if (proEnabled) {
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

const getProIconJsx = (props, proEnabled) => {
  if (proEnabled) {
    return (
      <View
        style={styles.iconWrapper}
      >
        <Pro />
      </View>
    );
  }

  return (
    <View />
  );
};

export default (props) => {
  const {
    previewProgram,
    util,
  } = props;

  const { startProgram } = onPressActions;

  const selectedProgram = previewProgram.selectedProgram;

  const proEnabled = getProEnabled(selectedProgram.mode, util.proMode);

  const title = selectedProgram.name;
  const totalReps = getTotalReps(selectedProgram);
  const totalDays = selectedProgram.days.length;
  const proIconJsx = getProIconJsx(props, proEnabled);

  const rightBorderStyle = {
    borderRightColor: LINE_COLOR,
    borderRightWidth: 1,
  };

  return (
    <BaseScreen
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
            {proIconJsx}
          </View>
        </View>
        <View
          style={styles.middleWrapper}
        >
          <StatisticItem
            value={totalReps}
            property="Reps"
            propertyColorStyle={FADE_COLOR}
            rightBorderStyle={rightBorderStyle}
          />
          <StatisticItem
            value={totalDays}
            propertyColorStyle={FADE_COLOR}
            property="Days"
          />
        </View>
        <View
          style={styles.bottomWrapper}
        >
          <Instruction />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => startProgram(props, proEnabled)}
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
    </BaseScreen>
  );
};
