import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import AdvertBanner from '../components/shared/AdvertBanner';

import { BASE_BACKGROUND_COLOR } from './style';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BASE_BACKGROUND_COLOR,
  },
  baseContainer: {
    flex: 1,
    paddingTop: 10,
  },
});

const BaseScreen = props => (
  <View
    style={styles.wrapper}
  >
    <View
      style={[styles.baseContainer, props.style]}
    >
      {props.children}
    </View>
  </View>
);

export default BaseScreen;
