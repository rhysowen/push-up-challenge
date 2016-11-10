import React from 'react';

import Content from '../shared/Content';
import {
  APP_NAME,
  APP_VERSION,
  APP_AUTHOR,
} from '../../lib/constants';

const APP_CREDITS_HEADER = 'App Credits';
const getAppCreditsContent = () => {
  const currentYear = new Date().getFullYear();

  return `${APP_NAME} ${APP_VERSION}. ${'\u00A9'} ${currentYear} ${APP_AUTHOR}. All rights reserved.`;
};

export default () => {
  const appCreditsContent = getAppCreditsContent();

  return (
    <Content>
      <Content.Item
        header={APP_CREDITS_HEADER}
        content={appCreditsContent}
      />
    </Content>
  );
};


