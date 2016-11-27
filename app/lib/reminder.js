export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const BASE_DATE = new Date();
BASE_DATE.setHours(0, 0, 0, 0);

export const dayToNumber = day => (DAYS.indexOf(day) + 1);
