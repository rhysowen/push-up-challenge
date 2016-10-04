import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert,
} from 'react-native';

import DefaultButton from '../theme/DefaultButton';
import {
  COLOR_BLUE,
  COLOR_RED,
} from '../theme/style';
import BaseScreen from '../theme/BaseScreen';
import Info from './routine/Info';

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 25,
    paddingRight: 25,
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
  btnStyle: {
    marginBottom: 10,
  },
});

const NO_PROGRAM_SELECTED = 'No program selected';

export default class RoutineScreen extends Component {

  componentDidMount() {
    this.props.fetchSelectedProgram();
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
            buttonColor={COLOR_BLUE}
            textColor="white"
            style={styles.btnStyle}
          />
          <DefaultButton
            name="Abort Training"
            buttonColor={COLOR_RED}
            textColor="white"
            style={styles.btnStyle}
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
            buttonColor={COLOR_BLUE}
            textColor="white"
            style={styles.btnStyle}
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
              value="1"
            />
            <Info
              title="Total"
              value="25"
            />
            <Info
              title="Record"
              value="7"
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
