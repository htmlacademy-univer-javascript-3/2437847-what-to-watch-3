export const convertToHoursAndMinutes = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  if (hours === 0) {
    return `${minutes}m`;
  }
  return `${hours}h ${minutes}m`;
};
