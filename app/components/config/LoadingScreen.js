import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import moreInitialState from '../../lib/moreInitialState';
import BaseScreen from '../../theme/BaseScreen';
import { BASE_FONT_FAMILY_IOS } from '../../theme/style';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaadingText: {
    fontSize: 20,
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
  progressText: {
    fontSize: 16,
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
});

const fetchAsync = (props) => {
  props.fetchSelectedProgramAsync();
  props.fetchExerciseStateAsync();
  props.fetchMoreAsync();
};

const setAsync = (props) => {
  props.setMoreAsync(moreInitialState);
};

export default class LoadingScreen extends Component {

  componentWillMount() {
    fetchAsync(this.props);
  }

  componentDidUpdate() {
    const {
      program,
      exercise,
      more,
    } = this.props;

    if (more.isInitRequired && !more.isSaveAttempt) {
      setAsync(this.props);
    }

    if (program.isViewRender && exercise.isViewRender && more.isViewRender) {
      this.props.navigateReset('ApplicationTabs');
    }
  }

  render() {
    const {
      program,
      exercise,
      more,
    } = this.props;

    const isProgramViewRender = program.isViewRender;
    const isExerciseViewRender = exercise.isViewRender;
    const isMoreViewRender = more.isViewRender;

    const viewRenders = [
      isProgramViewRender,
      isExerciseViewRender,
      isMoreViewRender,
    ];

    const progressSum = viewRenders.reduce((prev, current) => prev + current);
    const total = viewRenders.length;

    return (
      <BaseScreen
        hideAdvert
      >
        <View
          style={styles.wrapper}
        >
          <Text
            style={styles.loaadingText}
          >
            Loading...
          </Text>
          <Text
            style={styles.progressText}
          >
            ({progressSum} / {total})
          </Text>
        </View>
      </BaseScreen>
    );
  }
}

