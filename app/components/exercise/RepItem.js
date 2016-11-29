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

const RepItem = (props) => {
  const wrapperStyle = [
    styles.wrapper,
    { backgroundColor: props.backgroundColorStyle },
  ];

  const textStyle = [
    styles.text,
    {
      color: props.textColorStyle,
      fontWeight: props.fontWeightStyle,
    },
  ];

  return (
    <View
      style={wrapperStyle}
    >
      <Text
        style={textStyle}
      >
        {props.value}
      </Text>
    </View>
  );
};

RepItem.propTypes = {
  backgroundColorStyle: React.PropTypes.string,
  textColorStyle: React.PropTypes.string,
  fontWeightStyle: React.PropTypes.string,
  value: React.PropTypes.number,
};

export default RepItem;
