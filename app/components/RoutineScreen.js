import React from 'react';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';

const renderRoutineScreen = (props) => {
  let ret;

  const { programId } = props;

  if (programId === undefined) {
    // No program has been selected.
    ret = (<Text>Please select a program - none selected!</Text>);
  } else {
    // A program has been selected.
    ret = (<Text>You have selected program {programId}</Text>);
  }

  return ret;
};

export default (props) => (
  <ScrollView style={{ marginTop: 90 }}>
    {renderRoutineScreen(props)}
  </ScrollView>
);
