import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  COLOR_ORANGE,
  BASE_PADDING_LEFT,
} from '../../theme/style';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  touchableOpacityWrapper: { padding: 10 },
});

const getIconJsx = (name, color = COLOR_ORANGE, size = 20) => (
  <Icon
    name={name}
    size={size}
    color={color}
  />
);

const onComponentPress = (props) => {
  const callbackValid = props.callback !== undefined;

  if (callbackValid) {
    const func = props.callback;
    const isFunction = typeof func === 'function';

    if (isFunction) {
      props.callback();
    }
  }
};

const PADDING_LEFT_STYLE = { paddingLeft: BASE_PADDING_LEFT };
const PADDING_RIGHT_STYLE = { paddingRight: BASE_PADDING_LEFT };

const NavigationHeaderComponent = (props) => {
  const paddingComponentStyle = props.isLeft ? PADDING_LEFT_STYLE : PADDING_RIGHT_STYLE;
  const icon = getIconJsx(props.icon);

  return (
    <View
      style={[styles.wrapper, paddingComponentStyle]}
    >
      <TouchableOpacity
        style={styles.touchableOpacityWrapper}
        onPress={() => onComponentPress(props)}
      >
        {icon}
      </TouchableOpacity>
    </View>
  );
};

NavigationHeaderComponent.propTypes = {
  isLeft: React.PropTypes.bool,
  icon: React.PropTypes.string,
};

export default NavigationHeaderComponent;
