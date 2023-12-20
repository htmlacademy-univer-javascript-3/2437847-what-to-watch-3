export const convertDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};
