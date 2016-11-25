import { combineReducers } from 'redux';
import * as navigationReducer from './navigation';
import Program from './program';
import Statistics from './statistics';
import Exercise from './exercise';
import Complete from './complete';
import Util from './util';
import Sound from './sound';
import Reminder from './reminder';

export default combineReducers(Object.assign(
  navigationReducer,
  { program: Program },
  { statistics: Statistics },
  { exercise: Exercise },
  { complete: Complete },
  { util: Util },
  { sound: Sound },
  { reminder: Reminder },
));
