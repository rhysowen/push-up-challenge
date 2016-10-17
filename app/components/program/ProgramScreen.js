import React, { PropTypes } from 'react';
import {
  View,
  ListView,
} from 'react-native';

import Row from './Row';

const pressRow = (rowData, props) => {
  props.setPreviewExercise(rowData.name);
  props.navigate({ key: 'PreviewContainer' });
};

const renderRow = (rowData, sectionID, rowID, highlightRow, props) => (
  <Row
    exercise={rowData}
    onPress={() => pressRow(rowData, props)}
  />
);

const ProgramScreen = (props) => {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  });

  const { programs } = props;
  const dataSource = ds.cloneWithRows(programs.toArray());

  return (
    <ListView
      dataSource={dataSource}
      renderRow={(rowData, sectionID, rowID, highlightRow) =>
        renderRow(rowData, sectionID, rowID, highlightRow, props)}
    />
  );
};

ProgramScreen.propTypes = {
  programs: PropTypes.object,
};

export default ProgramScreen;
