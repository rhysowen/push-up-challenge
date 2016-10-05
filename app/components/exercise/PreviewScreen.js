import React from 'react';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';

export default (props) => (
  <ScrollView style={{ marginTop: 90 }}>
    <Text>Training overview</Text>
    <Text>Beginner level 1</Text>
    <Text>OK</Text>
    <View>
      <Text>Day 1</Text>
      <Text>2 - 3 - 4 - 3 - 2</Text>
      <Text>Day 2</Text>
      <Text>2 - 3 - 4 - 3 - 2</Text>
      <Text>Day 3</Text>
      <Text>2 - 3 - 4 - 3 - 2</Text>
    </View>
  </ScrollView>
);
