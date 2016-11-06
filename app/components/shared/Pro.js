import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  COLOR_ORANGE,
  BASE_FONT_FAMILY_IOS,
} from '../../theme/style';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLOR_ORANGE,
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontWeight: 'bold',
  },
});

export default () => (
  <View
    style={styles.wrapper}
  >
    <Text
      style={styles.text}
    >
      Pro
    </Text>
  </View>
);
