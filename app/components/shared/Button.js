import React from 'react';
import { View } from 'react-native';

import ButtonItem from './ButtonItem';

const Button = props => (
  <View>
    {props.children}
  </View>
);

Button.Item = ButtonItem;

export default Button;
