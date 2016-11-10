import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';

import {
  isProEnabled,
  upgrade,
} from '../../lib/util';
import { PRO_PROGRAM } from '../../lib/constants';
import {
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
} from '../../theme/style';
import Day from './Day';
import Instruction from '../shared/Instruction';

/*const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
  },
  buttonWrapper: {
    paddingTop: 10,
    flex: 1,
  },
  infoWrapper: { flex: 2 },
  daysWrapper: { flex: 3 },
});*/

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

const cleanReset = (props) => {
  props.resetExercise();
  props.resetProgram();
};

const onPress = (props, proEnabled) => {
  const { previewProgram } = props;

  const selectedProgram = previewProgram.selectedProgram;

  if (!proEnabled && selectedProgram.mode === PRO_PROGRAM) {
    upgrade(props);
  } else {
    cleanReset(props);

    props.setSets(selectedProgram.days[0].sets);
    props.setNewProgramStateAsync(selectedProgram.name);
    // Skip doing an async fetch
    props.setProgramByName(selectedProgram.name);

    props.navigateReset('ActivityContainer');
  }
};


export default (props) => {
  const {
    previewProgram,
    util,
  } = props;

  const proEnabled = isProEnabled(util.proMode);

  const selectedProgram = previewProgram.selectedProgram;
  const isProMode = selectedProgram.mode === PRO_PROGRAM && !proEnabled;

  const days = renderDaysJsx(selectedProgram);
  const totalDays = selectedProgram.days.length;

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', flex: 0.5, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green'}}>
        <View style={{padding: 5, alignItems: 'center'}}>
          <Text>124</Text>
          <Text>Reps</Text>
        </View>
        <View style={{padding: 5, alignItems: 'center'}}>
          <Text>30</Text>
          <Text>Days</Text>
        </View>
      </View>
      <View style={{flex: 2}}>
        <Instruction />
      </View>
    </View>
  );
};
