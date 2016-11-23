import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  BASE_FONT_FAMILY_IOS,
  FADE_COLOR,
  LINE_COLOR,
} from '../../theme/style';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  value: {
    fontSize: 18,
    fontFamily: BASE_FONT_FAMILY_IOS,
    textAlign: 'center',
  },
  property: {
    fontFamily: BASE_FONT_FAMILY_IOS,
    color: FADE_COLOR,
    flex: 1,
    textAlign: 'center',
  },
});

export default props => (
  <View
    style={[
      styles.wrapper,
      typeof props.rightBorderStyle !== 'undefined' ? props.rightBorderStyle : {},
    ]}
  >
    <Text
      style={[
        styles.value,
        { color: props.valueColorStyle },
      ]}
    >
      {props.value}
    </Text>
    <View style={{paddingTop: 3}}>
      <Text
        style={[
          styles.property,
          { color: props.propertyColorStyle },
        ]}
      >
        {props.property}
      </Text>
    </View>
  </View>
);
