import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  BASE_FONT_FAMILY_IOS,
  FADE_COLOR,
} from '../../theme/style';

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    alignItems: 'center',
  },
  value: {
    fontSize: 18,
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
  propertyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  property: {
    paddingLeft: 3,
    fontFamily: BASE_FONT_FAMILY_IOS,
    color: FADE_COLOR,
  },
});

export default props => (
  <View
    style={styles.wrapper}
  >
    <Text
      style={styles.value}
    >
      {props.value}
    </Text>
    <View
      style={styles.propertyWrapper}
    >
      {props.iconComponent}
      <Text
        style={styles.property}
      >
        {props.property}
      </Text>
    </View>
  </View>
);
