import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import {
  BASE_PADDING_TOP,
  BASE_BACKGROUND_COLOR,
} from '../../theme/style';
import { childrenProps } from '../../lib/commonProps';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: BASE_PADDING_TOP,
    backgroundColor: BASE_BACKGROUND_COLOR,
  },
});

const BaseScreen = (props) => {
  const wrapperStyle = [
    styles.wrapper,
    props.style,
  ];

  return (
    <View
      style={wrapperStyle}
    >
      {props.children}
    </View>
  );
};

BaseScreen.propTypes = {
  children: childrenProps,
  style: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
};

export default BaseScreen;
