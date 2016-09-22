import { combineReducers } from 'redux';
import * as navigationReducer from './navigation';
import * as programReducer from './program';
import * as miscReducer from './misc';

export default combineReducers(Object.assign(
  navigationReducer,
  programReducer,
  miscReducer
));
