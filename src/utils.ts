export function isLeapYear(year: number): boolean {
  // FIXME: this implementation is wrong!
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
