export const formatTimeElapsed = (number) => {
  const secondsInAYear = 31536000;
  const secondsInADay = 86400;
  const secondsInAnHour = 3600;
  const secondsInAMinute = 60;

  const minutes = Math.floor(
      (((number % secondsInAYear) % secondsInADay)) / secondsInAMinute);
  const seconds = (((number % secondsInAYear) % secondsInADay) % secondsInAnHour
    ) % secondsInAMinute;

  return `${minutes}m ${seconds}s`;
};

export const formatCalories = number => Math.floor(number);

export const formatReps = number => number;

export const formatDate = (date) => {
  const dateHours = date.getHours();
  const dateMinutes = date.getMinutes();
  const mode = dateHours >= 12 ? 'PM' : 'AM';

  const MOD_HOURS = dateHours % 12; // E.g. 13 % 12 === 1

  const hours = MOD_HOURS || 12; // Use 12 instead of 0
  const minutes = dateMinutes < 10 ? `0${dateMinutes}` : dateMinutes;

  return `${hours}:${minutes} ${mode}`;
};
