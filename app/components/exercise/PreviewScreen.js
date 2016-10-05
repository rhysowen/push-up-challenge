import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
  COLOR_ORANGE,
} from '../../theme/style';
import DefaultButton from '../../theme/DefaultButton';

import Day from './Day';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
  },
});

const renderDaysJsx = (program) => {
  const ret = [];

  if (program.isProgramFound && program.exercise.days !== 'undefined') {
    return program.exercise.days.map((day, index) => (
      <Day
        key={index}
        complete
      />
    ));
  } else {
    return [];
  }
};

export default (props) => {
  const { program } = props;

  const days = renderDaysJsx(program);

  return (
  <View
    style={styles.wrapper}
  >
    <DefaultButton
      name="Start this program!"
      buttonColor={COLOR_ORANGE}
      textColor="white"
      // style={styles.btnStyle}
      onPress={() => console.log('Todo')}
    />
    {days}
  </View>
  );
};
