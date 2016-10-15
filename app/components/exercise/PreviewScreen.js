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

const renderDaysJsx = (selectedProgram) => {
  if (selectedProgram.days !== 'undefined') {
    return selectedProgram.days.map((day, index) => (
      <Day
        key={index}
        day={index + 1}
        sets={day.sets.length}
        total={day.sets.reduce((total, number) => total + number)}
        complete
      />
    ));
  }

  return [];
};

const onPress = (props) => {
  const { previewProgram } = props;

  props.setSets(previewProgram.selectedProgram.days[0].sets);
  props.saveProgramByNameAsync(previewProgram.selectedProgram.name);
  // Consider refactoring this.
  props.navigateReset({
    key: 'ActivityContainer',
    title: 'Activity',
  });
};

export default (props) => {
  const { previewProgram } = props;
  const days = renderDaysJsx(previewProgram.selectedProgram);

  return (
    <View
      style={styles.wrapper}
    >
      <DefaultButton
        name="Start this program!"
        buttonColor={COLOR_ORANGE}
        textColor="white"
        onPress={() => onPress(props)}
      />
      {days}
    </View>
  );
};
