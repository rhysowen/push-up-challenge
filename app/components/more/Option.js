import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import OptionItem from './OptionItem';
import { childrenProps } from '../../lib/commonProps';

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

Option.Item = OptionItem;

Option.propTypes = { children: childrenProps };

export default Option;
