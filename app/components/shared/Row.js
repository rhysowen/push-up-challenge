import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  BASE_FONT_FAMILY_IOS,
  COLOR_ORANGE,
  ICON_SIZE,
} from '../../theme/style';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    padding: 15,
  },
  iconWrapper: {
    paddingRight: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
  textWrapper: {
    justifyContent: 'center',
    flex: 3,
  },
  titleText: {
    fontSize: 16,
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
  description: {
    fontFamily: BASE_FONT_FAMILY_IOS,
    paddingTop: 5,
    color: '#777777',
  },
  rightWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  arrowIconWrapper: {
    justifyContent: 'center',
  },
});

const getDescriptionText = (props) => {
  if (typeof props.descriptionText !== 'undefined') {
    return (
      <Text
        style={styles.description}
      >
        {props.descriptionText}
      </Text>
    );
  }

  return (
    <View />
  );
};

const getPrimaryIcon = (props) => {
  if (typeof props.iconSource !== 'undefined') {
    return (
      <Image
        style={styles.icon}
        source={props.iconSource}
      />
    );
  }

  return props.vectorJsx !== 'undefined' ? props.vectorJsx : <View />;
};

const Row = (props) => {
  const primaryIcon = getPrimaryIcon(props);
  const descriptionText = getDescriptionText(props);
  const arrowIcon = (
    <Icon
      name="keyboard-arrow-right"
      size={ICON_SIZE}
      color={COLOR_ORANGE}
    />
  );

  const ICON_WRAPPER = typeof props.iconSource !== 'undefined' ? styles.iconWrapper : 0;

  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
    >
      <View
        style={props.wrapperStyle || styles.wrapper}
      >
        <View
          style={ICON_WRAPPER}
        >
          {primaryIcon}
        </View>
        <View
          style={styles.textWrapper}
        >
          <Text
            style={props.titleTextStyle || styles.titleText}
          >
            {props.titleText}
          </Text>
          {descriptionText}
        </View>
        <View
          style={styles.rightWrapper}
        >
          <View
            style={styles.arrowIconWrapper}
          >
            {arrowIcon}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

Row.propTypes = {
  exercise: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
  }),
  onPress: PropTypes.func.isRequired,
};

export default Row;
