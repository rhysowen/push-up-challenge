import React from 'react';
import { Switch } from 'react-native';

import BaseScreen from '../../theme/BaseScreen';
import Option from './Option';

const getSwitch = () => (
  <Switch />
);

export default () => {
  const SOUND = 'Sound';
  const SOUND_ITEM = getSwitch();

  const COACH_SOUND = 'Coach';
  const COACH_SOUND_ITEM = getSwitch();

  const BEEP_SOUND = 'Beep';
  const BEEP_SOUND_ITEM = getSwitch();


  return (
    <BaseScreen>
      <Option>
        <Option.Item
          text={SOUND}
          item={SOUND_ITEM}
        />
        <Option.Item
          text={COACH_SOUND}
          item={COACH_SOUND_ITEM}
        />
        <Option.Item
          text={BEEP_SOUND}
          item={BEEP_SOUND_ITEM}
        />
      </Option>
    </BaseScreen>
  );
};
