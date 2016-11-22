import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import {
  BASE_PADDING_TOP,
  BASE_BACKGROUND_COLOR,
} from '../../theme/style';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: BASE_PADDING_TOP,
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
