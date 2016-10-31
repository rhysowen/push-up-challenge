import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert,
} from 'react-native';

import DefaultButton from '../../theme/DefaultButton';
import {
  COLOR_ORANGE,
  COLOR_RED,
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
} from '../../theme/style';
import BaseScreen from '../../theme/BaseScreen';
import Info from '../shared/Info';

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
  },
  infoWapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 3,
  },
  defaultBtnWrapper: {
    flex: 2,
    justifyContent: 'center',
  },
});

const NO_PROGRAM_SELECTED = 'No program selected';

const fetchAsync = (props) => {
  props.fetchSelectedProgramAsync();
  props.fetchExerciseStateAsync();
};

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

const continueTraining = (props) => {
  const {
    program,
    exercise,
  } = props;

  const mapSets = getMapSets(props);
  props.setSets(mapSets);

  props.navigateReset('ActivityContainer');
};

const onAbort = (props) => {
  props.removeSelectedProgramAsync();
  props.removeExerciseStateAsync();
};

const abortTraining = (props) => {
  Alert.alert(
    'Confirmation',
    'Are you sure you want to abort training?',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Abort', onPress: () => onAbort(props) },
    ]
  );
};

/*const getProgress = (props) => {
  const { program } = props;

  const totalReps = program.exercise.days
    .reduce((prev, cur) => prev + cur.sets
    .reduce((_prev, _cur) => _prev + _cur, 0), 0);

  const MAX_PERCENT = 100;
  const ret = Math.ceil((program.repsCompleted / totalReps) * MAX_PERCENT);

  return ret > MAX_PERCENT ? MAX_PERCENT : ret;
};*/

export default class RoutineScreen extends Component {

  componentWillMount() {
    fetchAsync(this.props);
  }

  renderButtons() {
    const { program } = this.props;

    let ret;

    if (program.isProgramFound) {
      ret = (
        <View
          style={styles.defaultBtnWrapper}
        >
          <DefaultButton
            name="Continue Training"
            buttonColor={COLOR_ORANGE}
            textColor="white"
            onPress={() => continueTraining(this.props)}
          />
          <DefaultButton
            name="Abort Training"
            buttonColor={COLOR_RED}
            textColor="white"
            onPress={() => abortTraining(this.props)}
          />
        </View>
      );
    } else {
      ret = (
        <View
          style={styles.defaultBtnWrapper}
        >
          <DefaultButton
            name="Select Program"
            buttonColor={COLOR_ORANGE}
            textColor="white"
            onPress={() => console.log('Todo')}
          />
        </View>
      );
    }

    return ret;
  }

  render() {
    const { program } = this.props;

    let ret;

    if (program.isViewRender) {
      let progress = 0;

      if (program.isProgramFound) {
        progress = 0; //getProgress(this.props);
      }

      const progressFormat = String.raw`${progress}%`;

      ret = (
        <BaseScreen
          style={styles.wrapper}
        >
          <View
            style={styles.infoWapper}
          >
            <Info
              title="Program"
              value={program.isProgramFound ? program.exercise.name : NO_PROGRAM_SELECTED}
            />
            <Info
              title="Day"
              value={program.day}
            />
            <Info
              title="Reps Complete"
              value={program.repsCompleted}
            />
            <Info
              title="Progress"
              value={progressFormat}
            />
          </View>
          {this.renderButtons()}
        </BaseScreen>
      );
    } else {
      ret = (
        <View />
      );
    }

    return ret;
  }

}

RoutineScreen.propTypes = {
  fetchSelectedProgramAsync: React.PropTypes.func.isRequired,
  fetchStatisticsAsync: React.PropTypes.func.isRequired,
  program: React.PropTypes.shape({
    isViewRender: React.PropTypes.bool.isRequired,
    isProgramFound: React.PropTypes.bool.isRequired,
    exercise: React.PropTypes.shape({
      name: React.PropTypes.string,
      description: React.PropTypes.string,
      days: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          sets: React.PropTypes.arrayOf(React.PropTypes.number),
        }),
      ),
    }),
  }),
  statistics: React.PropTypes.shape({
    isViewRender: React.PropTypes.bool,
    total: React.PropTypes.number,
    record: React.PropTypes.number,
  }),
};
