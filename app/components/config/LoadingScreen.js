import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { onCreateAsyncActions } from '../../lib/initialState';
import BaseScreen from '../shared/BaseScreen';
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

const getAsync = (props) => {
  props.fetchProgramAsync();
  props.fetchExerciseAsync();
  props.fetchStatisticsAsync();
  props.fetchUtilAsync();
  props.fetchReminderAsync();
  props.fetchSoundAsync();
};

const setAsync = props => onCreateAsyncActions(props);


export default class LoadingScreen extends Component {

  componentWillMount() {
    getAsync(this.props);
  }

  componentDidUpdate() {
    const {
      program,
      exercise,
      util,
      reminder,
      sound,
    } = this.props;

    const isSetRequired = (util.isInitRequired && !util.isSaveAttempt) &&
      (reminder.isInitRequired && !reminder.isSaveAttempt) &&
      (sound.isInitRequired && !sound.isSaveAttempt);

    if (isSetRequired) {
      setAsync(this.props);
    }

    const isViewRender = program.isViewRender &&
      exercise.isViewRender &&
      util.isViewRender &&
      reminder.isViewRender &&
      sound.isViewRender;

    if (isViewRender) {
      this.props.navigateReset('ApplicationTabs');
    }
  }

  render() {
    const {
      program,
      exercise,
      util,
      reminder,
      sound,
    } = this.props;

    const isProgramViewRender = program.isViewRender;
    const isExerciseViewRender = exercise.isViewRender;
    const isUtilViewRender = util.isViewRender;
    const isReminderViewRender = reminder.isViewRender;
    const isSoundViewRender = sound.isViewRender;

    const viewRenders = [
      isProgramViewRender,
      isExerciseViewRender,
      isUtilViewRender,
      isReminderViewRender,
      isSoundViewRender,
    ];

    const progressSum = viewRenders.reduce((prev, current) => prev + current);
    const total = viewRenders.length;

    return (
      <BaseScreen>
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

