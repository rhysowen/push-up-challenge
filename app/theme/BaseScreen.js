import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 10,
  },
});

const ScreenWrapper = props => (
  <View style={[styles.wrapper, props.style]}>
    {props.children}
  </View>
);

export default ScreenWrapper;
