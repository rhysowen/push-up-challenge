import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center' },
  value: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  property: {
    color: 'white',
    fontSize: 12,
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
