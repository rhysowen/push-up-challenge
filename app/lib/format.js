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
