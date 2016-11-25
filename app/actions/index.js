import * as NavigationActions from './navigation';
import * as ProgramActions from './program';
import * as StatisticsActions from './statistics';
import * as ExerciseActions from './exercise';
import * as CompleteActions from './complete';
import * as ReminderActions from './reminder';
import * as SoundActions from './sound';
import * as UtilActions from './util';

export default Object.assign(
  NavigationActions,
  ProgramActions,
  StatisticsActions,
  ExerciseActions,
  CompleteActions,
  ReminderActions,
  SoundActions,
  UtilActions
);

