import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import { BASE_FONT_FAMILY_IOS } from '../../theme/style';

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center' },
  value: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
  property: {
    color: 'white',
    fontSize: 12,
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
});

export default props => (
  <View
    style={styles.wrapper}
  >
    <Text
      style={styles.property}
    >
      {props.property}
    </Text>
    <Text
      style={styles.value}
    >
      {props.value}
    </Text>
  </View>
);
