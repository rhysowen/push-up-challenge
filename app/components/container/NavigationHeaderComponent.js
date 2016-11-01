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
  BASE_PADDING_RIGHT,
} from '../../theme/style';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const isRouteValid = (props) => {
  const { navigationState } = props;

  return navigationState.routes[navigationState.index].key === props.screenName;
};

const getIconJsx = (name, color = COLOR_ORANGE, size = 20) => (
  <Icon
    name={name}
    size={size}
    color={color}
  />
);

const onComponentPress = (props) => {
  const callbacksValid = props.callbacks !== undefined;

  if (callbacksValid) {
    for (let i = 0; i < props.callbacks.length; i += 1) {
      const func = props.callbacks[i];
      const isFunction = typeof func === 'function';

      if (isFunction) {
        func();
      }
    }
  }
};

const PADDING_LEFT_STYLE = { paddingLeft: BASE_PADDING_LEFT };
const PADDING_RIGHT_STYLE = { paddingRight: BASE_PADDING_LEFT };

export default (props) => {
  const { navigationState } = props;

  const routeValid = isRouteValid(props);
  const paddingComponentStyle = props.isLeft ? PADDING_LEFT_STYLE : PADDING_RIGHT_STYLE;

  let ret;

  if (routeValid) {
    const icon = getIconJsx(navigationState.leftComponent.icon);
    ret = (
      <View
        style={[styles.wrapper, paddingComponentStyle]}
      >
        <TouchableOpacity
          onPress={() => onComponentPress(props)}
        >
          {icon}
        </TouchableOpacity>
      </View>
    );
  } else {
    ret = (
      <View />
    );
  }

  return ret;
};
