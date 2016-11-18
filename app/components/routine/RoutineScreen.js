import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '../shared/Button';
import ProgramInfoItem from './ProgramInfoItem';

import abortTraining from '../../lib/abortTraining';
import getIconJsx from '../../lib/icon';

import {
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
  BASE_FONT_FAMILY_IOS,
} from '../../theme/style';
import { PROGRAM_COMPLETE } from '../../lib/constants';

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  topContainer: { flex: 1.5 },
  bottomContainer: { flex: 1 },
  muscleImage: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'flex-end',
  },
  statsWrapper: {
    flex: 1,
    backgroundColor: 'rgba(48, 45, 48, 0.6)',
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
    paddingTop: 8,
    paddingBottom: 8,
  },
  programInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noProgramWrapper: { alignItems: 'center' },
  noProgramText: {
    color: 'white',
    fontSize: 12,
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontWeight: 'bold',
  },
});

const MUSCLE_IMAGE = require('../../theme/images/screen/routine/gym.jpg');

const getMapSets = (props) => {
  const {
    program,
    exercise,
  } = props;

  return program.exercise.days[program.day - 1].sets.map((cur, index) => {
    if (index === exercise.set) {
      return exercise.rep > 0 ? exercise.rep : cur;
    }

    return cur;
  });
};

const onPressActions = {
  continueTraining: (props) => {
    const mapSets = getMapSets(props);
    props.setSets(mapSets);

    props.navigateReset('ActivityContainer');
  },
};

const getProgress = (props) => {
  const { program } = props;

  const totalReps = program.exercise.days
    .reduce((prev, cur) => prev + cur.sets
    .reduce((_prev, _cur) => _prev + _cur, 0), program.repsAdded);

  const MAX_PERCENT = 100;
  const ret = Math.ceil((program.repsCompleted / totalReps) * MAX_PERCENT);

  return ret > MAX_PERCENT ? MAX_PERCENT : ret;
};

const getButtonJsx = (props) => {
  const { program } = props;

  if (program.status === PROGRAM_COMPLETE || !program.isProgramFound) {
    const selectProgramIconJsx = getIconJsx(Icon, 'play-circle-filled');

    return (
      <Button>
        <Button.Item
          text="Select Program"
          iconJsx={selectProgramIconJsx}
          onPress={() => props.setTab(1)}
        />
      </Button>
    );
  }

  const continueTrainingIconJsx = getIconJsx(Icon, 'play-circle-filled');
  const instructionsIconJsx = getIconJsx(Icon, 'assistant');
  const abortTrainingIconJsx = getIconJsx(Icon, 'stop');

  const { continueTraining } = onPressActions;

  return (
    <Button>
      <Button.Item
        text="Continue Training"
        iconJsx={continueTrainingIconJsx}
        onPress={() => continueTraining(props)}
      />
      <Button.Item
        text="Instructions"
        iconJsx={instructionsIconJsx}
        //onPress={() => continueTraining(props)}
      />
      <Button.Item
        lastItem
        text="Abort Training"
        iconJsx={abortTrainingIconJsx}
        onPress={() => abortTraining(props)}
      />
    </Button>
  );
};

const getRenderJsx = (props) => {
  const { program } = props;

  if (program.isProgramFound) {
    const { name } = program.exercise;
    const {
      day,
      repsCompleted,
    } = program;

    const progress = getProgress(props);
    const progressFormat = `${progress}%`;

    return {
      statsJsx:
      (
        <View
          style={styles.programInfoWrapper}
        >
          <ProgramInfoItem
            property="Program"
            value={name}
          />
          <ProgramInfoItem
            property="Day"
            value={day}
          />
          <ProgramInfoItem
            property="Reps"
            value={repsCompleted}
          />
          <ProgramInfoItem
            property="Progress"
            value={progressFormat}
          />
        </View>
      ),
      buttonsJsx: getButtonJsx(props),
    };
  } else if (!program.isViewRender) {
    return {
      statsJsx:
      (
        <View />
      ),
      buttonsJsx:
      (
        <View />
      ),
    };
  }

  return {
    statsJsx:
    (
      <View
        style={styles.noProgramWrapper}
      >
        <Text
          style={styles.noProgramText}
        >
          No program selected
        </Text>
      </View>
    ),
    buttonsJsx: getButtonJsx(props),
  };
};

export default (props) => {
  const { program } = props;

  const renderJsx = getRenderJsx(props);

  const {
    statsJsx,
    buttonsJsx,
  } = renderJsx;

  return (
    <View
      style={styles.wrapper}
    >
      <View
        style={styles.topContainer}
      >
        <Image
          source={MUSCLE_IMAGE}
          style={styles.muscleImage}
          resizeMode="cover"
        >
          <View>
            <View
              style={styles.statsWrapper}
            >
              {statsJsx}
            </View>
          </View>
        </Image>
      </View>

      <ScrollView
        style={styles.bottomContainer}
      >
        {buttonsJsx}
      </ScrollView>
    </View>
  );
};
