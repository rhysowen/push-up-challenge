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
import Info from './Info';

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

export default class RoutineScreen extends Component {

  componentWillMount() {
    this.props.fetchSelectedProgram();
    this.props.fetchStatistics();
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
            onPress={() => console.log('Todo')}
          />
          <DefaultButton
            name="Abort Training"
            buttonColor={COLOR_RED}
            textColor="white"
            onPress={() => Alert.alert(
              'Confirmation',
              'Are you sure you want to abort training?',
              [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Abort', onPress: () => this.props.removeSelectedProgram() },
              ]
            )}
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
    const {
      program,
      statistics,
    } = this.props;

    let ret;

    if (program.isViewRender && statistics.isViewRender) {
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
              value={1}
            />
            <Info
              title="Total"
              value={statistics.total}
            />
            <Info
              title="Record"
              value={statistics.record}
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
  fetchSelectedProgram: React.PropTypes.func.isRequired,
  fetchStatistics: React.PropTypes.func.isRequired,
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
