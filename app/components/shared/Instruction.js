import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  BASE_PADDING_TOP,
  COLOR_ORANGE,
  BASE_FONT_FAMILY_IOS,
} from '../../theme/style';
import Content from './Content';
import getIconJsx from '../../lib/icon';

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  exercise: {
    width: null,
    height: 200,
  },
  infoWrapper: {
    backgroundColor: COLOR_ORANGE,
    flexDirection: 'row',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  infoText: {
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontSize: 14,
    color: 'white',
    paddingLeft: 10,
    flex: 1,
  },
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

export default () => {
  const iconJsx = getIconJsx(Icon, 'info', 30, 'white');

  return (
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
        {iconJsx}
        <Text
          style={styles.infoText}
        >
          {infoText}
        </Text>
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
};
