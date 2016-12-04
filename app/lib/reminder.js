export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const BASE_DATE = new Date();
BASE_DATE.setHours(0, 0, 0, 0);

export const dayToNumber = day => DAYS.indexOf(day);
