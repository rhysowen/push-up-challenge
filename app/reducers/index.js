import { combineReducers } from 'redux';
import * as navigationReducer from './navigation';
import * as programReducer from './program';
import Statistics from './statistics';

export default combineReducers(Object.assign(
  navigationReducer,
  programReducer,
  { statistics: Statistics }
));
