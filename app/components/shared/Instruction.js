import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import {
  FADE_COLOR,
  BASE_FONT_FAMILY_IOS,
} from '../../theme/style';

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  exercise: {
    width: null,
    height: null,
    flex: 1,
  },
  instructionsWrapper: { flex: 1, paddingTop: 10, paddingBottom: 10, },
  instructions: {
    fontFamily: BASE_FONT_FAMILY_IOS,
    color: FADE_COLOR,
    lineHeight: 20,
  },
});

const exerciseGif = require('../../theme/images/screen/shared/exercise.gif');

export default () => (
  <View
    style={styles.wrapper}
  >
    <Image
      source={exerciseGif}
      style={styles.exercise}
      resizeMode="contain"
    />
    <ScrollView
      style={styles.instructionsWrapper}
    >
      <Text
        style={styles.instructions}
      >
        Do normal a normal pushup with your hands just a few inches apart from each other underneath your chest. Start from the pushup position. Take one hand off the ground and raise it straight up in the air (making a T-shape out of your body). Keep your eyes locked on your raised hand.
      </Text>
    </ScrollView>
  </View>
);
