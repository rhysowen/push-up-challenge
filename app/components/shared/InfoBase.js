import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', flex: 1 },
});

const Info = props => (
  <View
    style={styles.wrapper}
  >
    {props.children}
  </View>
);

export default Info;
