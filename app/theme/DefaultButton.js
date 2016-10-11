import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import { BASE_FONT_FAMILY_IOS } from './style';

const styles = StyleSheet.create({
  wrapper: {

  },
  outerStyle: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
});

const DefaultButton = props => (
  <View
    style={[props.outerStyle, styles.outerStyle]}
  >
    <TouchableHighlight
      onPress={() => props.onPress()}
    >
      <View
        style={[styles.wrapper, props.style, { backgroundColor: props.buttonColor }]}>
        <Text
          style={[styles.text, { color: props.textColor }]}>
            {props.name.toUpperCase()}
        </Text>
      </View>
    </TouchableHighlight>
  </View>
);

DefaultButton.propTypes = {
  buttonColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: View.propTypes.style,
  outerStyle: View.propTypes.style,
};

export default DefaultButton;
