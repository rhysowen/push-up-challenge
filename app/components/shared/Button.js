import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import ButtonItem from './ButtonItem';

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
});

const Button = props => (
  <View
    style={styles.wrapper}
  >
    {props.children}
  </View>
);

Button.Item = ButtonItem;

export default Button;
