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
    <View>
      {props.content}
    </View>
  </View>
);
