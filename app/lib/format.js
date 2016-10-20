const numberToTimeElasped = (number) => {
  let hours = Math.floor(number / 3600);
  let minutes = Math.floor((number - (hours * 3600)) / 60);
  let seconds = number - (hours * 3600) - (minutes * 60);

  hours = hours < 10 ? 0 : hours;
  minutes = minutes < 10 ? 0 : minutes;
  seconds = seconds < 10 ? 0 : seconds;

  return String.raw`${hours}h ${minutes}m ${seconds}s`;
};

export default numberToTimeElasped;
