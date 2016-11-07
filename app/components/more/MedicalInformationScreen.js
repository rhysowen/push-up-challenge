import React from 'react';
import { Text } from 'react-native';

import Content from '../shared/Content';
import { CONTEXT_TEXT_STYLE } from '../../theme/style';

const DISCLAIMER_HEADER = 'Disclaimer';
const DISCLAIMER_CONTENT = (
  <Text
    style={CONTEXT_TEXT_STYLE}
  >
    Before beginning any exercise program, you should consult your physician.
  </Text>
);

export default () => (
  <Content>
    <Content.Item
      header={DISCLAIMER_HEADER}
      content={DISCLAIMER_CONTENT}
    />
  </Content>
);
