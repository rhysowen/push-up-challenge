import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {

  },
  text: {
    textAlign: 'center',
    padding: 15,
  },
});

const DefaultButton = props => (
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
);

DefaultButton.propTypes = {
  buttonColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: View.propTypes.style,
};

export default DefaultButton;
