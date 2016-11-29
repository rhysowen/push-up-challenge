import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import { BASE_FONT_FAMILY_IOS } from '../../theme/style';
import { formatToLocale } from '../../lib/format';

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center' },
  value: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
  property: {
    color: 'white',
    fontSize: 12,
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
});

const ProgramInfoItem = (props) => {
  const valueFormat = formatToLocale(props.value);

  return (
    <View
      style={styles.wrapper}
    >
      <Text
        style={styles.property}
      >
        {props.property}
      </Text>
      <Text
        style={styles.value}
      >
        {valueFormat}
      </Text>
    </View>
  );
};

ProgramInfoItem.propTypes = {
  property: React.PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
};

export default ProgramInfoItem;
