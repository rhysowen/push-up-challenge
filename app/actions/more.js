import * as types from './types';

export const toggleNotification = () => (
  { type: types.MORE_NOTIFICATION_TOGGLE }
);

export const toggleSound = () => (
  { type: types.MORE_SOUND_TOGGLE }
);
