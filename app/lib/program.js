import Immutable from 'immutable';

import {
  BEGINNER_LEVEL,
  INTERMEDIATE_LEVEL,
  ADVANCED_LEVEL,
  EXPERT_LEVEL,
  FREE_PROGRAM,
  PRO_PROGRAM,
  PRO_DISABLED,
} from './constants';

const programs = Immutable.List([
  { name: 'Beginner Level 1',
    description: 'Under 5 pushups',
    level: BEGINNER_LEVEL,
    days: [
      { sets: [1, 1, 1, 1, 1] },
      { sets: [1, 1, 1, 1, 1] },
      { sets: [1, 1, 1, 1, 1] },
      { sets: [1, 1, 1, 1, 1] },
      { sets: [1, 1, 1, 1, 1] },
    ],
    mode: FREE_PROGRAM,
  },
  { name: 'Beginner Level 2',
    description: '6 - 10 pushups',
    level: BEGINNER_LEVEL,
    days: [
      { sets: [6, 6, 7, 6, 6] },
      { sets: [7, 6, 8, 6, 6] },
      { sets: [8, 7, 6, 8, 7] },
      { sets: [9, 8, 7, 6, 8] },
      { sets: [10, 6, 8, 8, 10] },
    ],
    mode: FREE_PROGRAM,
  },
  { name: 'Intermediate Level 1',
    description: '11 - 20 pushups',
    level: INTERMEDIATE_LEVEL,
    days: [
      { sets: [6, 6, 7, 6, 6] },
      { sets: [7, 6, 8, 6, 6] },
      { sets: [8, 7, 6, 8, 7] },
      { sets: [9, 8, 7, 6, 8] },
      { sets: [10, 6, 8, 8, 10] },
    ],
  },
  { name: 'Intermediate Level 2',
    description: '21 - 30 pushups',
    level: INTERMEDIATE_LEVEL,
    days: [
      { sets: [6, 6, 7, 6, 6] },
      { sets: [7, 6, 8, 6, 6] },
      { sets: [8, 7, 6, 8, 7] },
      { sets: [9, 8, 7, 6, 8] },
      { sets: [10, 6, 8, 8, 10] },
    ],
    mode: FREE_PROGRAM,
  },
  { name: 'Advanced Level 1',
    description: '31 - 40 pushups',
    level: ADVANCED_LEVEL,
    days: [
      { sets: [6, 6, 7, 6, 6] },
      { sets: [7, 6, 8, 6, 6] },
      { sets: [8, 7, 6, 8, 7] },
      { sets: [9, 8, 7, 6, 8] },
      { sets: [10, 6, 8, 8, 10] },
    ],
    mode: FREE_PROGRAM,
  },
  { name: 'Advanced Level 2',
    description: '41 - 50 pushups',
    level: ADVANCED_LEVEL,
    days: [
      { sets: [6, 6, 7, 6, 6] },
      { sets: [7, 6, 8, 6, 6] },
      { sets: [8, 7, 6, 8, 7] },
      { sets: [9, 8, 7, 6, 8] },
      { sets: [10, 6, 8, 8, 10] },
    ],
    mode: FREE_PROGRAM,
  },
  { name: 'Advanced Level 3',
    description: '51 - 60 pushups',
    level: ADVANCED_LEVEL,
    days: [
      { sets: [6, 6, 7, 6, 6] },
      { sets: [7, 6, 8, 6, 6] },
      { sets: [8, 7, 6, 8, 7] },
      { sets: [9, 8, 7, 6, 8] },
      { sets: [10, 6, 8, 8, 10] },
    ],
    mode: PRO_PROGRAM,
  },
  { name: 'Expert Level 1',
    description: '61 - 70 pushups',
    level: EXPERT_LEVEL,
    days: [
      { sets: [6, 6, 7, 6, 6] },
      { sets: [7, 6, 8, 6, 6] },
      { sets: [8, 7, 6, 8, 7] },
      { sets: [9, 8, 7, 6, 8] },
      { sets: [10, 6, 8, 8, 10] },
    ],
    mode: PRO_PROGRAM,
  },
  { name: 'Expert Level 2',
    description: '71 - 80 pushups',
    level: EXPERT_LEVEL,
    days: [
      { sets: [55, 108, 55, 255, 1] },
      { sets: [7, 6, 8, 6, 6] },
      { sets: [8, 7, 6, 8, 7] },
      { sets: [9, 8, 7, 6, 8] },
      { sets: [10, 6, 8, 8, 10] },
    ],
    mode: PRO_PROGRAM,
  },
]);

export const getPrograms = () => programs.toArray();

export const getProEnabled = (programMode, proMode) =>
  programMode === PRO_PROGRAM && proMode === PRO_DISABLED;

export const getTotalReps = (program, repsAdded = 0) => (
  program.days
    .reduce((prev, cur) => prev + cur.sets
    .reduce((_prev, _cur) => _prev + _cur, 0), repsAdded)
);

export const findProgramByName = name => programs.find(program => program.name === name);
