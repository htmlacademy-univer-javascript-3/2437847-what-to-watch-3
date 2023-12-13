export const convertToHoursAndMinutes = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  if (hours === 0) {
    return `${minutes}m`;
  }
  return `${hours}h ${minutes}m`;
};

export const convertTimeToPlayerFormat = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  if (hours === 0) {
    return `-${formattedMinutes}:${formattedSeconds}`;
  }

  return `-${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
