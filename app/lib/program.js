import {
  PRO_PROGRAM,
  PRO_DISABLED,
} from './constants';

export const getProEnabled = (programMode, proMode) =>
  programMode === PRO_PROGRAM && proMode === PRO_DISABLED;

export const getTotalReps = (program, repsAdded = 0) => (
  program.days
    .reduce((prev, cur) => prev + cur.sets
    .reduce((_prev, _cur) => _prev + _cur, 0), repsAdded)
);
