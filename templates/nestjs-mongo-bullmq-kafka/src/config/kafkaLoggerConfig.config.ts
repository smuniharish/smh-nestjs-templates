import { logLevel, winston, WinstonModule } from '@/imports';
import envConfig from './envConfig.config';

const toWinstonLogLevel = (level: any) => {
  const { DEBUG, ERROR, INFO, NOTHING, WARN } = logLevel;
  switch (level) {
    case ERROR:
    case NOTHING:
      return 'error';
    case WARN:
      return 'warn';
    case INFO:
      return 'info';
    case DEBUG:
      return 'debug';
  }
};

const KafkaWinstonLogCreator = (logLevel) => {
  const logger = WinstonModule.createLogger({
    level: toWinstonLogLevel(logLevel),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.timestamp({
            format: envConfig.LOGS_TIMESTAMP_PATTERN,
          }),
        ),
        level: envConfig.LOGS_LEVEL,
      }),
    ],
  });

  return ({ namespace, level, label, log }) => {
    const { message, ...extra } = log;
    const formattedLog = `${extra.timestamp} - ${extra.logger} - ${extra.groupId} - [${toWinstonLogLevel(level)}] : ${label} - ${message} - ${namespace} - ${JSON.stringify(extra)}`;
    logger.log(formattedLog);
  };
};
export default KafkaWinstonLogCreator;
