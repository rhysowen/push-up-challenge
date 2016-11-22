import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import BaseScreen from './BaseScreen';

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  baseScreenWrapper: { paddingTop: 0 },
});

export default props => (
  <ScrollView
    style={[
      styles.wrapper,
      props.scrollStyle,
    ]}
  >
    <BaseScreen
      style={[
        styles.baseScreenWrapper,
        props.baseStyle,
      ]}
    >
      {props.children}
    </BaseScreen>
  </ScrollView>
);
