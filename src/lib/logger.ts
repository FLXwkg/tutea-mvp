import pino from 'pino'

const isDevelopment = process.env.NODE_ENV === 'development'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  browser: {
    asObject: true,
  },
  ...(isDevelopment
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
          },
        },
      }
    : {
        transport: {
          target: 'pino-loki',
          options: {
            host: process.env.LOKI_HOST,
            username: process.env.LOKI_USER,
            password: process.env.LOKI_API_KEY,
            labels: {
              app: 'tutea',
              env: 'production',
            },
            batching: true,
            interval: 1000,
          },
        },
      }),
})