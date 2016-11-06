import React, { PropTypes } from 'react';
import {
  ListView,
  View,
  StyleSheet,
} from 'react-native';

import ListBaseScreen from '../../theme/ListBaseScreen';
import Row from '../shared/Row';
import Pro from '../shared/Pro';
import {
  BEGINNER_LEVEL,
  INTERMEDIATE_LEVEL,
  ADVANCED_LEVEL,
  EXPERT_LEVEL,
  PRO_PROGRAM,
  PRO_DISABLED,
} from '../../lib/constants';

const styles = StyleSheet.create({
  proWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 2,
    alignItems: 'center',
  },
});

const beginnerLevel = require('../../theme/images/program/Beginner.png');
const intermediateLevel = require('../../theme/images/program/Intermediate.png');
const advancedLevel = require('../../theme/images/program/Advanced.png');
const expertLevel = require('../../theme/images/program/Expert.png');

const pressRow = (rowData, props) => {
  props.setPreviewExercise(rowData.name);
  props.navigatePush('PreviewContainer');
};

const getImageLevelSource = (level) => {
  switch (level) {
    case BEGINNER_LEVEL:
      return beginnerLevel;
    case INTERMEDIATE_LEVEL:
      return intermediateLevel;
    case ADVANCED_LEVEL:
      return advancedLevel;
    case EXPERT_LEVEL:
      return expertLevel;
    default:
      return beginnerLevel;
  }
};

const getProViewJsx = (mode, proMode) => {
  if (mode === PRO_PROGRAM && proMode === PRO_DISABLED) {
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

const renderRow = (rowData, sectionID, rowID, highlightRow, props) => {
  const { util } = props;

  const iconSource = getImageLevelSource(rowData.level);
  const proViewJsx = getProViewJsx(rowData.mode, util.proMode);

  return (
    <Row
      iconSource={iconSource}
      titleText={rowData.name}
      descriptionText={rowData.description}
      additionalJsx={proViewJsx}
      onPress={() => pressRow(rowData, props)}
    />
  );
};

const ProgramScreen = (props) => {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  });

  const { programs } = props;
  const dataSource = ds.cloneWithRows(programs.toArray());

  return (
    <ListBaseScreen>
      <ListView
        dataSource={dataSource}
        renderRow={(rowData, sectionID, rowID, highlightRow) =>
          renderRow(rowData, sectionID, rowID, highlightRow, props)}
      />
    </ListBaseScreen>
  );
};

ProgramScreen.propTypes = {
  programs: PropTypes.object,
};

export default ProgramScreen;
