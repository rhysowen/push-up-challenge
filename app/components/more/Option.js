import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import OptionItem from './OptionItem';

const styles = StyleSheet.create({
  wrapper: {},
});

const Option = props => (
  <View
    style={styles.wrapper}
  >
    {props.children}
  </View>
);

export default Option;

Option.Item = OptionItem;
