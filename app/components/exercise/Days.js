import React from 'react';
import { View } from 'react-native';

import DaysItem from './DaysItem';

const Days = props => (
  <View>
    {props.children}
  </View>
);

Days.Item = DaysItem;

export default Days;
