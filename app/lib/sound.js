import Sound from 'react-native-sound';

import {
  PERFORM_PUSH_UP_SOUND,
  REST_SOUND,
  EXERCISE_COMPLETE_SOUND,
  BEEP_SOUND,
  SOUND_ENABLED,
} from '../lib/constants';

const loadSound = fileName => (
  new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      // Log this?
    } else {
      // All OK.
    }
  })
);

// Load all the sounds
const peformPushUps = loadSound('performpushups.mp3');
const exerciseComplete = loadSound('exercisecomplete.mp3');
const rest = loadSound('rest.mp3');
const beep = loadSound('beep.mp3');

export const playSound = (soundCb) => {
  if (soundCb !== null) {
    soundCb.play((success) => {
      if (success) {
        // All OK.
      } else {
        // Log this?
      }
    });
  }
};

// Sound categories
const COACH_SOUND_CATEGORY = 'COACH_SOUND_CATEGORY';
const BEEP_SOUND_CATEGORY = 'BEEP_SOUND_CATEGORY';

// Sound objects
export const peformPushUpsSound = {
  file: peformPushUps,
  category: COACH_SOUND_CATEGORY,
};
export const exerciseCompleteSound = {
  file: exerciseComplete,
  category: COACH_SOUND_CATEGORY,
};
export const restSound = {
  file: rest,
  category: COACH_SOUND_CATEGORY,
};
export const beepSound = {
  file: beep,
  category: BEEP_SOUND_CATEGORY,
};

const getSoundEnabledCatStatus = (categorySound, soundStatus) => {
  const {
    soundCoachEnabled,
    soundBeepEnabled,
  } = soundStatus;

  if ((soundCoachEnabled && categorySound.category === COACH_SOUND_CATEGORY) ||
      (soundBeepEnabled && categorySound.category === BEEP_SOUND_CATEGORY)) {
    return playSound(categorySound.file);
  }

  return null;
};

export const processSound = (soundMode, soundStatus) => {
  let soundObj = null;

  switch (soundMode) {
    case PERFORM_PUSH_UP_SOUND:
      soundObj = peformPushUpsSound;
      break;
    case EXERCISE_COMPLETE_SOUND:
      soundObj = exerciseCompleteSound;
      break;
    case REST_SOUND:
      soundObj = restSound;
      break;
    case BEEP_SOUND:
      soundObj = beepSound;
      break;
    default:
      break;
  }

  if (soundObj !== null) {
    getSoundEnabledCatStatus(soundObj, soundStatus);
  }
};

export const getSoundStatus = soundStatus => (
  {
    soundCoachEnabled: soundStatus.coachMode === SOUND_ENABLED,
    soundBeepEnabled: soundStatus.beepMode === SOUND_ENABLED,
  }
);
