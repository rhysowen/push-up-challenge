import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import {
  COLOR_ORANGE,
  BASE_FONT_FAMILY_IOS,
} from '../../theme/style';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  repsWrapper: {
    backgroundColor: COLOR_ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200,
    marginBottom: 20,
  },
  repsRemaining: {
    color: 'white',
    fontSize: 70,
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontWeight: 'bold',
  },
});

export default props => (
  <View
    style={styles.wrapper}
  >
    <TouchableHighlight
      onPress={() => console.log('Todo')}
    >
    <View
      style={styles.repsWrapper}
    >
      <Text
        style={styles.repsRemaining}
      >
        6
      </Text>
    </View>
    </TouchableHighlight>
  </View>
);
