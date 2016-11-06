import * as NavigationActions from './navigation';
import * as ProgramActions from './program';
import * as StatisticsActions from './statistics';
import * as ExerciseActions from './exercise';
import * as CompleteActions from './complete';
import * as MoreActions from './more';

export default Object.assign(
  NavigationActions,
  ProgramActions,
  StatisticsActions,
  ExerciseActions,
  CompleteActions,
  MoreActions,
);

