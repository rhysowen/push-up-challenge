import { combineReducers } from 'redux';
import * as navigationReducer from './navigation';
import * as programReducer from './program';
import Statistics from './statistics';
import Exercise from './exercise';
import Complete from './complete';

export default combineReducers(Object.assign(
  navigationReducer,
  programReducer,
  { statistics: Statistics },
  { exercise: Exercise },
  { complete: Complete },
));
