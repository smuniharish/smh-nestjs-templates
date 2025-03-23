import { winston } from '@/imports';

const consoleFormat = winston.format.printf(({ level, message }) => {
  const msg = `[LOG] ${level} ${message}`;
  return msg;
});
const fileFormat = winston.format.printf(({ level, message, timestamp }) => {
  const msg = `${timestamp} ${level} ${message}`;
  return msg;
});
export { consoleFormat, fileFormat };
