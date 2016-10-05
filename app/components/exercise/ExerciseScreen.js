import React from 'react';
import {
  View,
  Text,
} from 'react-native';

export default (props) => (
  <View style={{ marginTop: 90 }}>
    <View>
      <View><Text>2, 3, 2, 2, 3</Text></View>
      <View><Text>Total 12</Text></View>
    </View>

    <View>
      <Text>2</Text>
      <Text>push-ups remaing!</Text>
    </View>
    <View>
      <Text>Complete</Text>
      <Text>Abort!</Text>
    </View>
  </View>
);
