import React from 'react';

import Content from '../shared/Content';

const ADVISORY_HEADER = 'Disclaimer';
const ADVISORY_CONTENT = 'Before beginning any exercise program, you should consult your physician.';

export default () => (
  <Content>
    <Content.Item
      header={ADVISORY_HEADER}
      content={ADVISORY_CONTENT}
    />
  </Content>
);
