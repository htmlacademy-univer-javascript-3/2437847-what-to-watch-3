const SEC_IN_MIN = 60;
const SEC_IN_HOUR = 3600;
const MIN_IN_HOUR = 60;

export const convertToHoursAndMinutes = (time: number) => {
  const hours = Math.floor(time / MIN_IN_HOUR);
  const minutes = time % MIN_IN_HOUR;
  if (hours === 0) {
    return `${minutes}m`;
  }
  return `${hours}h ${minutes}m`;
};

export const convertTimeToPlayerFormat = (time: number) => {
  const hours = Math.floor(time / SEC_IN_HOUR);
  const minutes = Math.floor((time % SEC_IN_HOUR) / SEC_IN_MIN);
  const seconds = time % SEC_IN_MIN;

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  if (hours === 0) {
    return `-${formattedMinutes}:${formattedSeconds}`;
  }

  return `-${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
