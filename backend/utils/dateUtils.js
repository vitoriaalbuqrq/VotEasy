const parseDateTimeToTimestamp = (date, time) => {
  const dateTimeString = `${date}T${time}:00.000Z`;
  return Math.floor(new Date(dateTimeString).getTime() / 1000);
};

module.exports = { parseDateTimeToTimestamp };
