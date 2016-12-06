import React, { Component } from 'react';
import {
  View,
  Modal,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

import { onLoadCreateAsyncActions } from '../../lib/initialState';
import {
  combinedProgramProps,
  combinedExerciseProps,
  combinedUtilProps,
  combinedReminderProps,
  combinedSoundProps,
  combinedAnalyticsProps,
  navigateResetProps,
} from '../../lib/commonProps';
import { TAB_COLOR } from '../../theme/style';

const loadingGif = require('../../theme/images/screen/config/ring.gif');

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: TAB_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const getAsync = (props) => {
  props.fetchProgramAsync();
  props.fetchExerciseAsync();
  props.fetchStatisticsAsync();
  props.fetchUtilAsync();
  props.fetchReminderAsync();
  props.fetchSoundAsync();
  props.fetchAnalyticsAsync();
};

const setAsync = props => onLoadCreateAsyncActions(props);

export default class LoadingScreen extends Component {

  componentWillMount() {
    getAsync(this.props);
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      SplashScreen.hide();
    }
  }

  componentDidUpdate() {
    const {
      program,
      exercise,
      util,
      reminder,
      sound,
      analytics,
    } = this.props;

    const isSetRequired = (util.isInitRequired && !util.isSaveAttempt) &&
      (reminder.isInitRequired && !reminder.isSaveAttempt) &&
      (sound.isInitRequired && !sound.isSaveAttempt) &&
      (analytics.isInitRequired && !analytics.isSaveAttempt);

    if (isSetRequired) {
      setAsync(this.props);
    }

    const isViewRender =
      program.isViewRender &&
      exercise.isViewRender &&
      util.isViewRender &&
      reminder.isViewRender &&
      sound.isViewRender &&
      analytics.isViewRender;

    if (isViewRender) {
      this.props.navigateReset('ApplicationTabs');
    }
  }

  render() {
    return (
      <Modal
        animationType="none"
        transparent
        visible
        onRequestClose={() => -1}
      >
        <View
          style={styles.wrapper}
        >
          <Image
            source={loadingGif}
          />
        </View>
      </Modal>
    );
  }
}

LoadingScreen.propTypes = {
  program: combinedProgramProps,
  exercise: combinedExerciseProps,
  util: combinedUtilProps,
  reminder: combinedReminderProps,
  sound: combinedSoundProps,
  analytics: combinedAnalyticsProps,
  navigateReset: navigateResetProps,
};
