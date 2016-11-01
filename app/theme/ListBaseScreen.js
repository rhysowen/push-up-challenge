import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import BaseScreen from './BaseScreen';

const styles = StyleSheet.create({
  wrapper: { paddingTop: 0 },
});

export default props => (
  <BaseScreen
    style={styles.wrapper}
  >
    {props.children}
  </BaseScreen>
);
