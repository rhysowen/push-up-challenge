import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {

  },
  checkImage: {
    width: 20,
    height: 20,
  },
});

const checkedActiveImage = require('../../theme/images/CheckedActive.png');
const checkedImage = require('../../theme/images/Checked.png');

const renderCheckedImage = props => (
  <Image
    source={checkedActiveImage}
    style={styles.checkImage}
  />
);

export default (props) => {
  const checkImage = renderCheckedImage(props);

  return (
    <View
      style={[styles.wrapper, props.style]}
    >
      {checkImage}
      <View>
        <View>
          <Text>Day 1</Text>
        </View>

        <View>
          <Text>Total 12</Text>
        </View>
      </View>
    </View>
  );
};
