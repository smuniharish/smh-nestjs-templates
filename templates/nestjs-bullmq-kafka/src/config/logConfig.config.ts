import { WinstonModule, winston } from '@/imports';
import envConfig from './envConfig.config';
import { checkProductionEnv } from '@/helpers/functions';

const consoleFormat = winston.format.printf(({ level, message, timestamp }) => {
  const msg = `${timestamp} [${level}]: ${message}`;
  return msg;
});
const fileFormat = winston.format.printf(({ level, message, timestamp }) => {
  const msg = `${timestamp} [${level}]: ${message}`;
  return msg;
});
const consoleFormater = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: envConfig.LOGS_TIMESTAMP_PATTERN }),
    consoleFormat,
  ),
  level: envConfig.LOGS_LEVEL,
});
const dailyRotateFormatter = new winston.transports.DailyRotateFile({
  filename: `Logs/${envConfig.LOGS_PREFIX_FILE_NAME}%DATE%.log`,
  format: winston.format.combine(
    winston.format.timestamp({
      format: envConfig.LOGS_TIMESTAMP_PATTERN,
    }),
    fileFormat,
  ),
  datePattern: envConfig.LOGS_TIMESTAMP_FILE_PATTERN,
  zippedArchive: true,
  maxSize: envConfig.LOGS_MAXIMUM_FILE_SIZE,
  maxFiles: envConfig.LOGS_MAXIMUM_NO_LOGS_TO_KEEP,
  level: envConfig.LOGS_LEVEL,
});
const transportsArray = checkProductionEnv(
  [dailyRotateFormatter],
  [consoleFormater, dailyRotateFormatter],
);
const devLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};
const productionLevels = {
  error: 0,
  warn: 1,
  info: 2,
};
const logLevelsArray = checkProductionEnv(productionLevels, devLevels);
const logConfig = {
  logger: WinstonModule.createLogger({
    transports: transportsArray,
    levels: logLevelsArray,
  }),
};
export default logConfig;
