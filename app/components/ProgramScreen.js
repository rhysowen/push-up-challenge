import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import {
  View,
  Text,
  ListView,
} from 'react-native';

const propTypes = {
  programs: PropTypes.object,
};

let ProgramScreen;

export default ProgramScreen = (props) => {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  });

  const { programs } = props;
  const dataSource = ds.cloneWithRows(programs.toArray());

  return (
    <View style={{marginTop: 90}}>
      <ListView
        dataSource={dataSource}
        renderRow={rowData => <Text>{rowData.name}</Text>}
      />
    </View>
  );
};

ProgramScreen.propTypes = propTypes;
