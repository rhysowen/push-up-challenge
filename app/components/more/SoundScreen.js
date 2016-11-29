import React from 'react';

import ScrollBaseScreen from '../shared/ScrollBaseScreen';
import Option from './Option';
import { SOUND_ENABLED } from '../../lib/constants';
import { combinedSoundProps } from '../../lib/commonProps';

const SoundScreen = (props) => {
  const { sound } = props;

  const COACH_SOUND = 'Coach';
  const IS_COACH_SOUND_ENABLED = sound.coachMode === SOUND_ENABLED;

  const BEEP_SOUND = 'Beep';
  const IS_BEEP_SOUND_ENABLED = sound.beepMode === SOUND_ENABLED;

  return (
    <ScrollBaseScreen>
      <Option>
        <Option.Item
          primaryText={COACH_SOUND}
          value={IS_COACH_SOUND_ENABLED}
          onValueChanged={() => props.toggleSoundCoach()}
        />
        <Option.Item
          primaryText={BEEP_SOUND}
          value={IS_BEEP_SOUND_ENABLED}
          onValueChanged={() => props.toggleSoundBeep()}
        />
      </Option>
    </ScrollBaseScreen>
  );
};

SoundScreen.propTypes = {
  sound: combinedSoundProps,
  toggleSoundBeep: React.PropTypes.func,
};

export default SoundScreen;
