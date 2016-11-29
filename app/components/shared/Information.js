import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  BASE_FONT_FAMILY_IOS,
  COLOR_ORANGE,
} from '../../theme/style';
import getIconJsx from '../../lib/icon';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLOR_ORANGE,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  infoText: {
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontSize: 14,
    color: 'white',
    paddingLeft: 10,
    flex: 1,
  },
});

const Information = (props) => {
  const iconJsx = getIconJsx(Icon, 'info', 30, 'white');

  return (
    <View
      style={styles.wrapper}
    >
      {iconJsx}
      <Text
        style={styles.infoText}
      >
        {props.infoText}
      </Text>
    </View>
  );
};

Information.propTypes = { infoText: React.PropTypes.string };

export default Information;
