import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  LINE_COLOR,
  FADE_COLOR,
  DISABLED_COLOR,
  BASE_PADDING_TOP,
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
  BASE_FONT_FAMILY_IOS,
} from '../../theme/style';

const styles = StyleSheet.create({
  padding: {
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
    paddingTop: BASE_PADDING_TOP,
    paddingBottom: 10,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: { width: 40 },
  text: {
    fontSize: 16,
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
  description: {
    fontSize: 13,
    fontFamily: BASE_FONT_FAMILY_IOS,
    color: FADE_COLOR,
  },
  disabledText: { color: DISABLED_COLOR },
});

const getWrapperStyle = (lastItem) => {
  let wrapper = {};

  if (!lastItem) {
    wrapper = {
      borderBottomColor: LINE_COLOR,
      borderBottomWidth: 1,
    };
  }

  return wrapper;
};

const getDescriptionText = (description, isButtonEnabled) => {
  if (description) {
    return (
      <Text
        style={[
          styles.description,
          isButtonEnabled ? {} : styles.disabledText,
        ]}
      >
        {description}
      </Text>
    );
  }

  return (
    <View />
  );
};

const getRightJsx = (rightComponent) => {
  if (rightComponent) {
    return rightComponent;
  }

  return (
    <View />
  );
};

const getMainJsx = (props, buttonJsx, isButtonEnabled) => {
  if (isButtonEnabled) {
    return (
      <TouchableOpacity
        onPress={() => props.onPress()}
      >
        {buttonJsx}
      </TouchableOpacity>
    );
  }

  return buttonJsx;
};

const ButtonItem = (props) => {
  const {
    lastItem,
    description,
    rightComponent,
    buttonDisabled,
  } = props;

  const isButtonEnabled = typeof buttonDisabled === 'undefined' || !buttonDisabled;
  const wrapperStyle = getWrapperStyle(lastItem);
  const descriptionTextJsx = getDescriptionText(description, isButtonEnabled);
  const rightJsx = getRightJsx(rightComponent);

  const buttonJsx = (
    <View
      style={styles.padding}
    >
      <View
        style={styles.itemWrapper}
      >
        <View
          style={styles.iconWrapper}
        >
          {props.iconJsx}
        </View>
        <View>
          <Text
            style={[
              styles.text,
              isButtonEnabled ? {} : styles.disabledText,
            ]}
          >
            {props.text}
          </Text>
          {descriptionTextJsx}
        </View>
        {rightJsx}
      </View>
    </View>
  );

  const mainJsx = getMainJsx(props, buttonJsx, isButtonEnabled);

  return (
    <View
      style={wrapperStyle}
    >
      {mainJsx}
    </View>
  );
};

ButtonItem.propTypes = {
  lastItem: React.PropTypes.bool,
  description: React.PropTypes.string,
  rightComponent: React.PropTypes.element,
  buttonDisabled: React.PropTypes.bool,
  iconJsx: React.PropTypes.element,
  text: React.PropTypes.string,
};

getMainJsx.propTypes = { onPress: React.PropTypes.func };

export default ButtonItem;
