import React from 'react';
import { View } from 'react-native';

import ButtonItem from './ButtonItem';
import { childrenProps } from '../../lib/commonProps';

const Button = props => (
  <View>
    {props.children}
  </View>
);

Button.Item = ButtonItem;

Button.propTypes = {
  children: childrenProps,
};

export default Button;
