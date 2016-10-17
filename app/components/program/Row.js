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
  BEGINNER_LEVEL,
  INTERMEDIATE_LEVEL,
  ADVANCED_LEVEL,
  EXPERT_LEVEL,
} from '../../lib/constants';
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
  level: {
    width: 50,
    height: 50,
  },
  textWrapper: {
    justifyContent: 'center',
    paddingLeft: 15,
  },
  name: {
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

const beginnerLevel = require('../../theme/images/program/Beginner.png');
const intermediateLevel = require('../../theme/images/program/Intermediate.png');
const advancedLevel = require('../../theme/images/program/Advanced.png');
const expertLevel = require('../../theme/images/program/Expert.png');

const getImageLevelSource = (props) => {
  const { exercise } = props;

  switch (exercise.level) {
    case BEGINNER_LEVEL:
      return beginnerLevel;
    case INTERMEDIATE_LEVEL:
      return intermediateLevel;
    case ADVANCED_LEVEL:
      return advancedLevel;
    case EXPERT_LEVEL:
      return expertLevel;
    default:
      return beginnerLevel;
  }
};

const Row = (props) => {
  const { exercise } = props;

  const imageLevelSource = getImageLevelSource(props);
  const arrowIcon = (
    <Icon name="keyboard-arrow-right" size={30} color={COLOR_ORANGE} />
  );

  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
    >
      <View
        style={styles.wrapper}
      >
        <View>
          <Image
            style={styles.level}
            source={imageLevelSource}
          />
        </View>
        <View
          style={styles.textWrapper}
        >
          <Text
            style={styles.name}
          >
            {exercise.name}
          </Text>
          <Text
            style={styles.description}
          >
            {exercise.description}
          </Text>
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
