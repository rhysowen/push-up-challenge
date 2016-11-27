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
    description: '4 - 12 pushups',
    level: BEGINNER_LEVEL,
    days: [
      { sets: [4, 3, 3, 3, 2] },
      { sets: [5, 4, 4, 4, 3] },
      { sets: [6, 5, 5, 5, 4] },

      { sets: [7, 6, 6, 6, 5] },
      { sets: [8, 7, 7, 7, 6] },
      { sets: [9, 8, 8, 8, 7] },

      { sets: [10, 9, 9, 9, 8] },
      { sets: [11, 10, 10, 10, 9] },
      { sets: [12, 11, 11, 11, 10] },
    ],
    mode: FREE_PROGRAM,
  },
  { name: 'Beginner Level 2',
    description: '12 - 20 pushups',
    level: BEGINNER_LEVEL,
    days: [
      { sets: [12, 11, 11, 11, 10] },
      { sets: [13, 12, 12, 12, 11] },
      { sets: [14, 13, 13, 13, 12] },

      { sets: [15, 14, 14, 14, 13] },
      { sets: [16, 15, 15, 15, 14] },
      { sets: [17, 16, 16, 16, 15] },

      { sets: [18, 17, 17, 17, 16] },
      { sets: [19, 18, 18, 18, 17] },
      { sets: [20, 19, 19, 19, 18] },
    ],
    mode: FREE_PROGRAM,
  },
  { name: 'Intermediate Level 1',
    description: '20 - 28 pushups',
    level: INTERMEDIATE_LEVEL,
    days: [
      { sets: [20, 19, 19, 19, 18] },
      { sets: [21, 20, 20, 20, 19] },
      { sets: [22, 21, 21, 21, 20] },

      { sets: [23, 22, 22, 22, 21] },
      { sets: [24, 23, 23, 23, 22] },
      { sets: [25, 24, 24, 24, 23] },

      { sets: [26, 25, 25, 25, 24] },
      { sets: [27, 26, 26, 26, 25] },
      { sets: [28, 27, 27, 27, 26] },
    ],
  },
  { name: 'Intermediate Level 2',
    description: '28 - 36 pushups',
    level: INTERMEDIATE_LEVEL,
    days: [
      { sets: [28, 27, 27, 27, 26] },
      { sets: [29, 28, 28, 28, 27] },
      { sets: [30, 29, 29, 29, 28] },

      { sets: [31, 30, 30, 30, 29] },
      { sets: [32, 31, 31, 31, 30] },
      { sets: [33, 32, 32, 32, 31] },

      { sets: [34, 33, 33, 33, 32] },
      { sets: [35, 34, 34, 34, 33] },
      { sets: [36, 35, 35, 35, 34] },
    ],
    mode: FREE_PROGRAM,
  },
  { name: 'Advanced Level 1',
    description: '36 - 44 pushups',
    level: ADVANCED_LEVEL,
    days: [
      { sets: [36, 35, 35, 35, 34] },
      { sets: [37, 36, 36, 36, 35] },
      { sets: [38, 37, 37, 37, 36] },

      { sets: [39, 38, 38, 38, 37] },
      { sets: [40, 39, 39, 39, 38] },
      { sets: [41, 40, 40, 40, 39] },

      { sets: [42, 41, 41, 41, 40] },
      { sets: [43, 42, 42, 42, 41] },
      { sets: [44, 43, 43, 43, 42] },
    ],
    mode: PRO_PROGRAM,
  },
  { name: 'Advanced Level 2',
    description: '44 - 52 pushups',
    level: ADVANCED_LEVEL,
    days: [
      { sets: [44, 43, 43, 43, 42] },
      { sets: [45, 44, 44, 44, 43] },
      { sets: [46, 45, 45, 45, 44] },

      { sets: [47, 46, 46, 46, 45] },
      { sets: [48, 47, 47, 47, 46] },
      { sets: [49, 48, 48, 48, 47] },

      { sets: [50, 49, 49, 49, 48] },
      { sets: [51, 50, 50, 50, 49] },
      { sets: [52, 51, 51, 51, 50] },
    ],
    mode: PRO_PROGRAM,
  },
  { name: 'Advanced Level 3',
    description: '52 - 60 pushups',
    level: ADVANCED_LEVEL,
    days: [
      { sets: [52, 51, 51, 51, 50] },
      { sets: [53, 52, 52, 52, 51] },
      { sets: [54, 53, 53, 53, 52] },

      { sets: [55, 54, 54, 54, 53] },
      { sets: [56, 55, 55, 55, 54] },
      { sets: [57, 56, 56, 56, 55] },

      { sets: [58, 57, 57, 57, 56] },
      { sets: [59, 58, 58, 58, 57] },
      { sets: [60, 59, 59, 59, 58] },
    ],
    mode: PRO_PROGRAM,
  },
  { name: 'Expert Level 1',
    description: '60 - 68 pushups',
    level: EXPERT_LEVEL,
    days: [
      { sets: [60, 59, 59, 59, 58] },
      { sets: [61, 60, 60, 60, 59] },
      { sets: [62, 61, 61, 61, 60] },

      { sets: [63, 62, 62, 62, 61] },
      { sets: [64, 63, 63, 63, 62] },
      { sets: [65, 64, 64, 64, 63] },

      { sets: [66, 65, 65, 65, 64] },
      { sets: [67, 66, 66, 66, 65] },
      { sets: [68, 67, 67, 67, 66] },
    ],
    mode: PRO_PROGRAM,
  },
  { name: 'Expert Level 2',
    description: '68 - 76 pushups',
    level: EXPERT_LEVEL,
    days: [
      { sets: [68, 67, 67, 67, 66] },
      { sets: [69, 68, 68, 68, 67] },
      { sets: [70, 69, 69, 69, 68] },

      { sets: [71, 70, 70, 70, 69] },
      { sets: [72, 71, 71, 71, 70] },
      { sets: [73, 72, 72, 72, 71] },

      { sets: [74, 73, 73, 73, 72] },
      { sets: [75, 74, 74, 74, 73] },
      { sets: [76, 75, 75, 75, 74] },
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
