import React, { PropTypes } from 'react';
import { ListView } from 'react-native';

import ListBaseScreen from '../../theme/ListBaseScreen';
import Row from '../shared/Row';
import {
  BEGINNER_LEVEL,
  INTERMEDIATE_LEVEL,
  ADVANCED_LEVEL,
  EXPERT_LEVEL,
} from '../../lib/constants';

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

const renderRow = (rowData, sectionID, rowID, highlightRow, props) => {
  const iconSource = getImageLevelSource(rowData.level);

  return (
    <Row
      iconSource={iconSource}
      titleText={rowData.name}
      descriptionText={rowData.description}
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
