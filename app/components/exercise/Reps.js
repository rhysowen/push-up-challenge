import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  TAB_COLOR,
  COLOR_ORANGE,
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
} from '../../theme/style';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: TAB_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
  },
  rep: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  activeTextRep: {
    color: TAB_COLOR,
  },
  defaultTextRep: {
    color: 'white',
  },
  viewRep: {
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  activeViewRep: {
    backgroundColor: COLOR_ORANGE,
  },
});

const renderRepsJsx = reps => reps.map((rep, index) => (
  <View
    key={index}
    style={[styles.viewRep, index === 0 ? styles.activeViewRep : {}]}
  >
    <Text
      style={[styles.rep, index === 0 ? styles.activeRep : styles.defaultRep]}
    >
      {rep}
    </Text>
  </View>
));

export default (props) => {
  const repsJsx = renderRepsJsx(props.reps);

  return (
    <View
      style={styles.wrapper}
    >
      {repsJsx}
    </View>
  );
};
