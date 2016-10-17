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
} from '../../theme/style';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    padding: 15,
  },
  icon: {
    width: 50,
    height: 50,
  },
  textWrapper: {
    justifyContent: 'center',
    paddingLeft: 15,
    flex: 2,
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
    flex: 1,
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

  return props.vectorJsx;
};

const Row = (props) => {
  const primaryIcon = getPrimaryIcon(props);
  const descriptionText = getDescriptionText(props);
  const arrowIcon = (
    <Icon
      name="keyboard-arrow-right"
      size={30}
      color={COLOR_ORANGE}
    />
  );

  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
    >
      <View
        style={props.wrapperStyle || styles.wrapper}
      >
        <View>
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
