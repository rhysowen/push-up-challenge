import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
});

const FullScreen = props => (
  <View style={[styles.wrapper, props.style]}>
    <TouchableOpacity
      onPress={() => console.log('Todo')}
    >
      <Text>Click me</Text>
    </TouchableOpacity>
    {props.children}
  </View>
);

export default FullScreen;
