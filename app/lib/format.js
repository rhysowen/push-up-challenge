const numberToTimeElasped = (number) => {
  const secondsInAYear = 31536000;
  const secondsInADay = 86400;
  const secondsInAnHour = 3600;
  const secondsInAMinute = 60;

  const hours = Math.floor((number % secondsInAYear) / secondsInAnHour);
  const minutes = Math.floor(
      (((number % secondsInAYear) % secondsInADay) % secondsInAnHour
    ) / secondsInAMinute);
  const seconds = (((number % secondsInAYear) % secondsInADay) % secondsInAnHour
    ) % secondsInAMinute;

  return `${hours}h ${minutes}m ${seconds}s`;
};

export default numberToTimeElasped;
