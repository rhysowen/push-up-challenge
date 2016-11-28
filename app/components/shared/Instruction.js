import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

import {
  BASE_PADDING_TOP,
} from '../../theme/style';
import Content from './Content';
import Information from './Information';

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  exercise: {
    width: null,
    height: 200,
  },
  infoWrapper: { paddingTop: 10 },
  instructionsWrapper: {
    flex: 1,
    paddingTop: BASE_PADDING_TOP,
    paddingBottom: 10,
  },
  contentStyle: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  innerContentStyle: { paddingTop: 0 },
});

const infoText = 'Position your phone underneath your head to register pushups via the proximity sensor, or touch the screen with your chin.';

const STEP_1_HEADER = 'Step 1';
const STEP_1_CONTENT = 'Position your hands underneath your shoulders. Extend your legs and ground your toes into the floor in order to stabilize your lower half.';
const STEP_2_HEADER = 'Step 2';
const STEP_2_CONTENT = 'Lower your body down until your chest nearly touches the ground. Keep your core braced the entire time.';
const STEP_3_HEADER = 'Step 3';
const STEP_3_CONTENT = 'Push away from the floor and bring your body back up to the starting position.';

const exerciseGif = require('../../theme/images/screen/shared/exercise.gif');

export default () => (
  <View
    style={styles.wrapper}
  >
    <Image
      source={exerciseGif}
      style={styles.exercise}
    />
    <View
      style={styles.infoWrapper}
    >
      <Information
        infoText={infoText}
      />
    </View>
    <View
      style={styles.instructionsWrapper}
    >
      <Content
        disableScrollView
        contentStyle={styles.contentStyle}
        innerContentStyle={styles.innerContentStyle}
      >
        <Content.Item
          header={STEP_1_HEADER}
          content={STEP_1_CONTENT}
        />
        <Content.Item
          header={STEP_2_HEADER}
          content={STEP_2_CONTENT}
        />
        <Content.Item
          header={STEP_3_HEADER}
          content={STEP_3_CONTENT}
        />
      </Content>
    </View>
  </View>
);
