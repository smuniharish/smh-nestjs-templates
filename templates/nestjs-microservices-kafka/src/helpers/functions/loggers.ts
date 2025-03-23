import { Logger } from '@/imports';
import stringifyValue from './stringifyValue';
const formatLog = (message: any[]) => {
  const str = message
    .map((item: any) => {
      if (typeof item === 'object') {
        return stringifyValue(item);
      } else {
        return item;
      }
    })
    .join(' ');
  return str;
};
const log = (...message: any) => {
  Logger.log(formatLog(message));
};
const warnLog = (...message: any) => {
  Logger.warn(formatLog(message));
};
const debugLog = (...message: any) => {
  Logger.debug(formatLog(message));
};
const errorLog = (...message: any) => {
  Logger.error(formatLog(message));
};
const verboseLog = (...message: any) => {
  Logger.verbose(formatLog(message));
};

export { log, warnLog, debugLog, errorLog, verboseLog, formatLog };
