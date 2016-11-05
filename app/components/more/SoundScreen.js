import React from 'react';
import { Switch } from 'react-native';

import BaseScreen from '../../theme/BaseScreen';
import Option from './Option';
import { SOUND_ENABLED } from '../../lib/constants';

const getSwitch = (isEnabled, callback) => (
  <Switch
    onValueChange={() => callback()}
    value={isEnabled}
  />
);

export default (props) => {
  const { sound } = props;

  const COACH_SOUND = 'Coach';
  const IS_COACH_SOUND_ENABLED = sound.coachMode === SOUND_ENABLED;
  const COACH_SOUND_ITEM = getSwitch(IS_COACH_SOUND_ENABLED, props.toggleCoachSound);

  const BEEP_SOUND = 'Beep';
  const IS_BEEP_SOUND_ENABLED = sound.beepMode === SOUND_ENABLED;
  const BEEP_SOUND_ITEM = getSwitch(IS_BEEP_SOUND_ENABLED, props.toggleBeepSound);

  return (
    <BaseScreen>
      <Option>
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
