import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  COLOR_ORANGE,
  BASE_FONT_FAMILY_IOS,
} from '../../theme/style';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
  value: {
    fontSize: 20,
    color: COLOR_ORANGE,
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
});

const Info = props => (
  <View style={styles.wrapper}>
    <Text style={styles.title}>{props.title}</Text>
    <Text style={styles.value}>{props.value}</Text>
  </View>
);

Info.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
};

export default Info;
