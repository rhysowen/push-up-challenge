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
import { formatToLocale } from '../../lib/format';

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  value: {
    fontSize: 18,
    fontFamily: BASE_FONT_FAMILY_IOS,
    textAlign: 'center',
  },
  propertyWrapper: { paddingTop: 3 },
  property: {
    fontFamily: BASE_FONT_FAMILY_IOS,
    color: FADE_COLOR,
    textAlign: 'center',
  },
});

export default (props) => {
  const wrapperStyle = [
    styles.wrapper,
    typeof props.rightBorderStyle !== 'undefined' ? props.rightBorderStyle : {},
  ];

  const valueTextStyle = [
    styles.value,
    { color: props.valueColorStyle },
  ];

  const propertyTextStyle = [
    styles.property,
    { color: props.propertyColorStyle },
  ];

  const valueFormat = formatToLocale(props.value);

  return (
    <View
      style={wrapperStyle}
    >
      <Text
        style={valueTextStyle}
      >
        {valueFormat}
      </Text>
      <View
        style={styles.propertyWrapper}
      >
        <Text
          style={propertyTextStyle}
        >
          {props.property}
        </Text>
      </View>
    </View>
  );
};
