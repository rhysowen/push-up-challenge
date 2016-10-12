import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
    <TouchableOpacity
      onPress={() => props.onPress()}
    >
      <View
        style={[styles.wrapper, props.style, { backgroundColor: props.buttonColor }]}
      >
        <Text
          style={[styles.text,
            {
              color: props.textColor,
              fontSize: props.textSize,
            },
          ]}
        >
          {props.name.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

DefaultButton.propTypes = {
  buttonColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  textSize: PropTypes.number,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: View.propTypes.style,
  outerStyle: View.propTypes.style,
};

export default DefaultButton;
