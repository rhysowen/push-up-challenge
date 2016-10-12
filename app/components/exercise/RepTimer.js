import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  COLOR_ORANGE,
  BASE_FONT_FAMILY_IOS,
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
} from '../../theme/style';
import DefaultButton from '../../theme/DefaultButton';

const styles = StyleSheet.create({
  wrapper: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  repsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  repsRemaining: {
    color: COLOR_ORANGE,
    fontSize: 140,
    fontFamily: BASE_FONT_FAMILY_IOS,
  },
  timerBtnWrapper: {
    flexDirection: 'row',
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
  },
  timerBtn: {
    flex: 1,
  },
});

export default props => (
  <View
    style={styles.wrapper}
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

    <View
      style={styles.timerBtnWrapper}
    >
      <DefaultButton
        name="-"
        buttonColor="transparent"
        textColor={COLOR_ORANGE}
        textSize={50}
        outerStyle={[styles.timerBtn]}
        onPress={() => console.log('Todo')}
      />
      <View
        style={styles.timerBtn}
      />
      <DefaultButton
        name="+"
        buttonColor="transparent"
        textColor={COLOR_ORANGE}
        textSize={50}
        outerStyle={[styles.timerBtn]}
        onPress={() => console.log('Todo')}
      />
    </View>

  </View>
);
