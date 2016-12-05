export const DAYS = [
  {
    name: 'Monday',
    val: 1,
  },
  {
    name: 'Tuesday',
    val: 2,
  },
  {
    name: 'Wednesday',
    val: 3,
  },
  {
    name: 'Thursday',
    val: 4,
  },
  {
    name: 'Friday',
    val: 5,
  },
  {
    name: 'Saturday',
    val: 6,
  },
  {
    name: 'Sunday',
    val: 0,
  },
];

export const BASE_DATE = new Date();
BASE_DATE.setHours(0, 0, 0, 0);

export const dayToNumber = (day) => {
  const dayFilter = DAYS.filter(val => val.name === day);

  if (dayFilter.length === 1) {
    return dayFilter[0].val;
  }

  return 0;
};
