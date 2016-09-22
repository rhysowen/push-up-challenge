import * as NavigationActions from './navigation';
import * as MiscActions from './misc';

// Combine all the actions into a single object
export const ActionCreators = Object.assign(
  NavigationActions,
  MiscActions
);
