import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const completeInitialState = {
  repsCompleted: 0,
  timeElapsed: 0,
  calories: 0,
};

const getPraiseText = () => {
  const praises = [
    'Congratulations',
    'Well Done',
    'Good Work',
    'Bravo',
    'Great Job',
    'Superb',
    'Incredible',
  ];

  const praisesLength = praises.length;
  const randomNumber = Math.floor(Math.random() * (praisesLength - 1));
  const randomPraise = praises[randomNumber];

  return `${randomPraise}!`;
};

export default createReducer(completeInitialState, {

  [types.COMPLETE_SET](state, action) {
    const praise = getPraiseText();

    return Object.assign(
      {},
      {
        repsCompleted: action.payload.repsCompleted,
        timeElapsed: action.payload.timeElapsed,
        calories: action.payload.calories,
        praise,
      },
    );
  },
});
