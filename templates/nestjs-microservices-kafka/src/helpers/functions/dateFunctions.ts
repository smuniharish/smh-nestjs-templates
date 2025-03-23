import { parse, toSeconds } from '@/imports';
import { errorLog } from './loggers';
import errorMessageFormatter from './errorMessageFormatter';

const generateDateString = (hours: number = 0) => {
  const date = new Date();
  return new Date(date.setHours(date.getHours() + hours)).toISOString();
};
const daysToMilliseconds = (numDays: number) => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return numDays * millisecondsPerDay;
};
const iso8601Parser = (isoDuration: string) => {
  try {
    const parsedDuration = parse(isoDuration);
    const now = new Date();
    const totalSeconds = toSeconds(parsedDuration);
    const expirationDate = new Date(
      now.getTime() + totalSeconds * 1000,
    ).toISOString();
    return expirationDate;
  } catch (err) {
    errorLog(errorMessageFormatter(err));
  }
};
export { generateDateString, daysToMilliseconds, iso8601Parser };
