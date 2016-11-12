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
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
  BASE_FONT_FAMILY_IOS,
} from '../../theme/style';

const styles = StyleSheet.create({
  padding: {
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
    paddingTop: 10,
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

const getDescriptionText = (description) => {
  if (description) {
    return (
      <Text
        style={styles.description}
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

export default (props) => {
  const {
    lastItem,
    description,
    rightComponent,
  } = props;

  const wrapperStyle = getWrapperStyle(lastItem);
  const descriptionTextJsx = getDescriptionText(description);
  const rightJsx = getRightJsx(rightComponent);

  return (
    <View
      style={wrapperStyle}
    >
      <TouchableOpacity
        onPress={() => props.onPress()}
      >
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
                style={styles.text}
              >
                {props.text}
              </Text>
              {descriptionTextJsx}
            </View>
            {rightJsx}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
