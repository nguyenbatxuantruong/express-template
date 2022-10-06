const winston = require('winston');
const path = require('path');
require('winston-daily-rotate-file');

const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  // winston.format.prettyPrint(),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)

const transports = [
  new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    json: true,
    colorize: false
  }),
  new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, '..', 'logs', `%DATE%.log`),
    datePattern: 'YYYY-MM-DD',
    prepend: true,
    json: true,
    colorize: false
  })
]

const logger = winston.createLogger({
  level: level(),
  format,
  transports,
  exitOnError: false,
})

module.exports = logger;