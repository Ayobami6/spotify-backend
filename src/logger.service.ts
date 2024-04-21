import { Injectable } from '@nestjs/common';
import { trace } from 'console';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.printf(({ level, message, timestamp, stack }) => {
          if (stack) {
            // Include the stack trace in the log message
            return `${timestamp} ${level}: ${message} - ${stack}`;
          }
          // If no stack trace, log the message as usual
          return `${timestamp} ${level}: ${message}`;
        }),
      ),
      defaultMeta: {
        date: new Date().toLocaleDateString(),
      },
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ level, message, timestamp, stack }) => {
              if (stack) {
                // Include the stack trace in the log message
                return `${timestamp} ${level}: ${message} - ${stack}`;
              }
              // If no stack trace, log the message as usual
              return `${timestamp} ${level}: ${message}`;
            }),
          ),
        }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    });
  }
  log(message: string) {
    this.logger.log('info', message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
