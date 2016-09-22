import { ListView } from 'react-native';
import Immutable from 'immutable';
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const programElements = Immutable.List([
  { name: 'Beginner Level 1', description: 'Under 5 pushups' },
  { name: 'Beginner Level 2', description: '6 - 10 pushups' },
  { name: 'Intermediate Level 1', description: '11 - 20 pushups' },
  { name: 'Intermediate Level 2', description: '21 - 30 pushups' },
  { name: 'Advanced Level 1', description: '31 - 40 pushups' },
  { name: 'Advanced Level 2', description: '41 - 50 pushups' },
  { name: 'Advanced Level 3', description: '51 - 60 pushups' },
  { name: 'Expert Level 1', description: '61 - 70 pushups' },
  { name: 'Expert Level 2', description: '71 - 80 pushups' },
]);

export const programs = createReducer(programElements, {

});
