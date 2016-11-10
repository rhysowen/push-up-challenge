import React from 'react';

import { COLOR_ORANGE } from '../theme/style';

export default (Lib, name, size = 30, color = COLOR_ORANGE) => (
  <Lib
    name={name}
    size={size}
    color={color}
  />
);
