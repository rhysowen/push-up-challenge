import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
  COLOR_ORANGE,
} from '../../theme/style';
import DefaultButton from '../../theme/DefaultButton';

import Info from '../shared/Info';
import Day from './Day';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
  },
  buttonWrapper: { paddingTop: 10 },
  infoWrapper: {
    flex: 1,
    justifyContent: 'space-around',
  },
  daysWrapper: { flex: 2 },
});

const renderDaysJsx = selectedProgram => (
  selectedProgram.days.map((day, index) => (
    <Day
      key={index}
      day={index + 1}
      sets={day.sets}
      complete
    />
  ))
);

const onPress = (props) => {
  const { previewProgram } = props;

  props.setSets(previewProgram.selectedProgram.days[0].sets);

  const FIRST_DAY = 1;
  props.setProgramStateAsync(previewProgram.selectedProgram.name, FIRST_DAY);

  // Skip doing an async fetch
  props.setProgramByName(previewProgram.selectedProgram.name);

  props.navigateReset('ActivityContainer');
};

export default (props) => {
  const { previewProgram } = props;
  const days = renderDaysJsx(previewProgram.selectedProgram);
  const totalDays = previewProgram.selectedProgram.days.length;

  return (
    <View
      style={styles.wrapper}  
    >
      <View
        style={styles.buttonWrapper}
      >
        <DefaultButton
          name="Start this program!"
          buttonColor={COLOR_ORANGE}
          textColor="white"
          onPress={() => onPress(props)}
        />
      </View>

      <View
        style={styles.infoWrapper}
      >
        <Info
          title="Program"
          value={previewProgram.selectedProgram.name}
        />
        <Info
          title="Total Days"
          value={totalDays}
        />
      </View>

      <View
        style={styles.daysWrapper}
      >
        <ScrollView>
          {days}
        </ScrollView>
      </View>
    </View>
  );
};
