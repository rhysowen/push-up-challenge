import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  isProEnabled,
  upgrade,
} from '../../lib/util';
import { PRO_PROGRAM } from '../../lib/constants';

import {
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
  COLOR_ORANGE,
} from '../../theme/style';
import BaseScreen from '../../theme/BaseScreen';
import DefaultButton from '../../theme/DefaultButton';

import Info from '../shared/Info';
import InfoBadge from '../shared/InfoBadge';
import Day from './Day';

const styles = StyleSheet.create({
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
    <BaseScreen
      style={styles.wrapper}
    >
      <View
        style={styles.buttonWrapper}
      >
        <DefaultButton
          name="Start this program!"
          buttonColor={COLOR_ORANGE}
          textColor="white"
          onPress={() => onPress(props, proEnabled)}
        />
      </View>

      <View
        style={styles.infoWrapper}
      >
        <InfoBadge
          title="Program"
          value={selectedProgram.name}
          mode={isProMode}
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
    </BaseScreen>
  );
};
