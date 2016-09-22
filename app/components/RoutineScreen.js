import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default (props) => (
  <View style={{marginTop: 90}}>
    <TouchableHighlight
      onPress={() => props.navigate({ key: 'Detail' })}
    >
      <Text>Select a progra2m!</Text>
    </TouchableHighlight>
  </View>
);
