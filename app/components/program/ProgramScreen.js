import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Foundation';
import Pro from '../shared/Pro';
import Button from '../shared/Button';
import getIconJsx from '../../lib/icon';
import { getProEnabled } from '../../lib/program';

import {
  BEGINNER_LEVEL,
  INTERMEDIATE_LEVEL,
  ADVANCED_LEVEL,
  EXPERT_LEVEL,
} from '../../lib/constants';

const styles = StyleSheet.create({
  proWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 2,
    alignItems: 'center',
  },
});

const getIconColour = (level) => {
  switch (level) {
    case BEGINNER_LEVEL:
      return 'lightskyblue';
    case INTERMEDIATE_LEVEL:
      return 'green';
    case ADVANCED_LEVEL:
      return 'orange';
    case EXPERT_LEVEL:
      return 'red';
    default:
      return 'turquoise';
  }
};

const onPressActions = {
  row: (rowData, props) => {
    props.setPreviewExercise(rowData.name);
    props.navigatePush('PreviewContainer');
  },
};

const getProViewJsx = (programMode, proMode) => {
  const proEnabled = getProEnabled(programMode, proMode);

  if (proEnabled) {
    return (
      <View
        style={styles.proWrapper}
      >
        <Pro />
      </View>
    );
  }

  return (
    <View />
  );
};

const renderButton = (program, index, props, programsCount) => {
  const {
    name,
    description,
    mode,
    level,
  } = program;

  const { util } = props;

  const { row } = onPressActions;

  const proViewJsx = getProViewJsx(mode, util.proMode);

  const iconColour = getIconColour(level);
  const iconJsx = getIconJsx(Icon, 'trophy', 30, iconColour);

  const lastItem = programsCount - 1 === index;

  return (
    <Button.Item
      key={index}
      text={name}
      description={description}
      iconJsx={iconJsx}
      rightComponent={proViewJsx}
      onPress={() => row(program, props)}
      lastItem={lastItem}
    />
  );
};

const ProgramScreen = (props) => {
  const { programs } = props;

  const programsToArray = programs.toArray();
  const programsCount = programsToArray.length;

  const buttonsJsx = programsToArray
    .map((program, index) => renderButton(program, index, props, programsCount));

  return (
    <ScrollView>
      {buttonsJsx}
    </ScrollView>
  );
};

export default ProgramScreen;
