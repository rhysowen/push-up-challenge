import * as NavigationActions from './navigation';
import * as ProgramActions from './program';

// Combine all the actions into a single object
export const ActionCreators = Object.assign(
  NavigationActions,
  ProgramActions
);
