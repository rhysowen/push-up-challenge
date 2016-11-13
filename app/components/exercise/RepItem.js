import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  BASE_FONT_FAMILY_IOS,
  ACTIVITY_BACKGROUND_COLOR,
  COLOR_ORANGE,
} from '../../theme/style';

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: ACTIVITY_BACKGROUND_COLOR,
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontFamily: BASE_FONT_FAMILY_IOS,
    color: COLOR_ORANGE,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default props => (
  <View
    style={[
      styles.wrapper,
      { backgroundColor: props.backgroundColorStyle },
    ]}
  >
    <Text
      style={[
        styles.text,
        {
          color: props.textColorStyle,
          fontWeight: props.fontWeightStyle,
        },
      ]}
    >
      {props.value}
    </Text>
  </View>
);
