import React from 'react';

import Content from '../shared/Content';

const DISCLAIMER_HEADER = 'Disclaimer';
const DISCLAIMER_CONTENT = 'Before beginning any exercise program, you should consult your physician.';

export default () => (
  <Content>
    <Content.Item
      header={DISCLAIMER_HEADER}
      content={DISCLAIMER_CONTENT}
    />
  </Content>
);
