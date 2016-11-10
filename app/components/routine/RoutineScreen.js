import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '../shared/Button';
import StatisticItem from './StatisticItem';

import getIconJsx from '../../lib/icon';

import {
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
} from '../../theme/style';
import { PROGRAM_ACTIVE } from '../../lib/constants';

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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  abortTraining: (props) => {
    const onAbort = () => {
      props.removeSelectedProgramAsync();
      props.removeExerciseStateAsync();
    };

    Alert.alert(
      'Confirmation',
      'Are you sure you want to abort training?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Abort',
          onPress: () => onAbort(props),
          style: 'destructive',
        },
      ]
    );
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

export default (props) => {
  const { program } = props;

  const {
    continueTraining,
    abortTraining,
  } = onPressActions;

  const continueTrainingIconJsx = getIconJsx(Icon, 'play-circle-filled');
  const instructionsIconJsx = getIconJsx(Icon, 'assistant');
  const abortTrainingIconJsx = getIconJsx(Icon, 'stop');

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
              <StatisticItem
                property="Program"
                value="Expert Level 2"
              />
              <StatisticItem
                property="Day"
                value="2"
              />
              <StatisticItem
                property="Reps"
                value="12"
              />
              <StatisticItem
                property="Progress"
                value="88%"
              />
            </View>
          </View>
        </Image>
      </View>

      <ScrollView
        style={styles.bottomContainer}
      >
        <Button>
          <Button.Item
            text="Continue Training"
            iconJsx={continueTrainingIconJsx}
            onPress={() => continueTraining(props)}
          />
          <Button.Item
            text="Instructions"
            iconJsx={instructionsIconJsx}
            onPress={() => continueTraining(props)}
          />
          <Button.Item
            lastItem
            text="Abort Training"
            iconJsx={abortTrainingIconJsx}
            onPress={() => abortTraining(props)}
          />
        </Button>
      </ScrollView>
    </View>
  );
};
