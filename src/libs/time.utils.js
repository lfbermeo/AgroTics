export const formatDate = (dateToFormat) => {
  const year = dateToFormat.getFullYear();
  const month = dateToFormat.getMonth() + 1;
  const day = dateToFormat.getDate();

  const monthCorrect = month < 10 ? `0${month}` : month;

  return `${year}-${monthCorrect}-${day}`;
};
