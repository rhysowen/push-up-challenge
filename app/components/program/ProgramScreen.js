import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Foundation';
import ScrollBaseScreen from '../shared/ScrollBaseScreen';
import Pro from '../shared/Pro';
import Button from '../shared/Button';
import getIconJsx from '../../lib/icon';
import {
  getProEnabled,
  getPrograms,
} from '../../lib/program';

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
    props.setProgramPreviewByName(rowData.name);
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

  const programsList = getPrograms();
  const programsCount = programsList.length;

  const buttonsJsx = programsList
    .map((program, index) => renderButton(program, index, props, programsCount));

  return (
    <ScrollBaseScreen>
      {buttonsJsx}
    </ScrollBaseScreen>
  );
};

export default ProgramScreen;
