import React from 'react';
import { View } from 'react-native';

import DaysItem from './DaysItem';
import { childrenProps } from '../../lib/commonProps';

const Days = props => (
  <View>
    {props.children}
  </View>
);

Days.Item = DaysItem;


Days.propTypes = { children: childrenProps };

export default Days;
