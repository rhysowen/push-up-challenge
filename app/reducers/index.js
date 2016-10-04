import { combineReducers } from 'redux';
import * as navigationReducer from './navigation';
import * as programReducer from './program';
import * as statisticsReducer from './statistics';

export default combineReducers(Object.assign(
  navigationReducer,
  programReducer,
  statisticsReducer
));
