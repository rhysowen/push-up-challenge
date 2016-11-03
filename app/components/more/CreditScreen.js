import React from 'react';

import Content from '../shared/Content';

const LICENSE_HEADER = 'License';
const LICENSE_CONTENT = 'React Native';

export default () => (
  <Content>
    <Content.Item
      header={LICENSE_HEADER}
      content={LICENSE_CONTENT}
    />
    <Content.Item
      header={LICENSE_HEADER}
      content={LICENSE_CONTENT}
    />
  </Content>
);
