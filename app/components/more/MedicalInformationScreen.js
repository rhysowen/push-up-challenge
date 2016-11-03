import React from 'react';

import Content from '../shared/Content';

const ADVISORY_HEADER = 'Advisory';
const ADVISORY_CONTENT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

export default () => (
  <Content>
    <Content.Item
      header={ADVISORY_HEADER}
      content={ADVISORY_CONTENT}
    />
    <Content.Item
      header={ADVISORY_HEADER}
      content={ADVISORY_CONTENT}
    />
  </Content>
);
