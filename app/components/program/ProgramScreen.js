import React, { PropTypes } from 'react';
import {
  View,
  Text,
  ListView,
  TouchableHighlight,
} from 'react-native';

const pressRow = (rowData, props) => {
  props.setProgramByName(rowData.name);
  props.fetchSelectedProgram();
  props.navigate({ key: 'PreviewContainer' });
};

const renderRow = (rowData, sectionID, rowID, highlightRow, props) => (
  <TouchableHighlight
    onPress={() => pressRow(rowData, props)}
  >
    <View>
      <Text>{rowData.name}</Text>
      <Text>{rowData.description}</Text>
    </View>
  </TouchableHighlight>
);

const ProgramScreen = (props) => {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  });

  const { programs } = props;
  const dataSource = ds.cloneWithRows(programs.toArray());

  return (
    <View
      style={{marginTop: 90}}>
      <ListView
        dataSource={dataSource}
        renderRow={(rowData, sectionID, rowID, highlightRow) =>
          renderRow(rowData, sectionID, rowID, highlightRow, props)}
      />
    </View>
  );
};

ProgramScreen.propTypes = {
  programs: PropTypes.object,
};

export default ProgramScreen;
