export function addDays(date, days) {
  const ms = days * 24 * 60 * 60 * 1000;
  return new Date(date.getTime() + ms);
}

export function diffDaysCeil(later, earlier) {
  const ms = later - earlier;
  return Math.ceil(ms / (24 * 60 * 60 * 1000));
}
