import React from 'react';
import { StyleSheet } from 'react-native';

import {
  BASE_PADDING_TOP,
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
} from '../../theme/style';

import ScrollBaseScreen from '../shared/ScrollBaseScreen';
import Instruction from '../shared/Instruction';

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: BASE_PADDING_TOP,
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
  },
});

export default () => (
  <ScrollBaseScreen
    baseStyle={styles.wrapper}
  >
    <Instruction />
  </ScrollBaseScreen>
);
