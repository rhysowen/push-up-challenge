import React from 'react';
import { Text } from 'react-native';

import { INFO_STYLE } from '../../theme/style';
import InfoBase from './InfoBase';

export default props => (
  <InfoBase>
    <Text
      style={INFO_STYLE.title}
    >
      {props.title}
    </Text>
    <Text
      style={INFO_STYLE.value}
    >
      {props.value}
    </Text>
  </InfoBase>
);
