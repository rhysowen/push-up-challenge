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
  section: { paddingBottom: 20 },
  content: {
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontSize: 16,
  },
  header: {
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontSize: 18,
    color: COLOR_ORANGE,
    paddingBottom: 10,
  },
});

export default props => (
  <View
    style={styles.section}
  >
    <Text
      style={styles.header}
    >
      {props.header}
    </Text>
    <Text
      style={styles.content}
    >
      {props.content}
    </Text>
  </View>
);
