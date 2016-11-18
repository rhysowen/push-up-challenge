import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { BASE_BACKGROUND_COLOR } from './style';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: BASE_BACKGROUND_COLOR,
  },
});

const BaseScreen = props => (
  <View
    style={[
      styles.wrapper,
      props.style,
    ]}
  >
    {props.children}
  </View>
);

export default BaseScreen;
