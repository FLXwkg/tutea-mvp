import pino from 'pino'

const isDevelopment = process.env.NODE_ENV === 'development'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  browser: {
    asObject: true,
  },
  ...(isDevelopment
    ? {
        // En développement : logs lisibles dans la console
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
        // En production : envoi vers Loki
        transport: {
          target: 'pino-loki',
          options: {
            batching: true,
            interval: 5,
            host: process.env.LOKI_HOST,
            // CHANGEMENT ICI : utiliser headers au lieu de basicAuth
            headers: {
              Authorization: `Basic ${Buffer.from(
                `${process.env.LOKI_USERNAME}:${process.env.LOKI_API_KEY}`
              ).toString('base64')}`,
            },
            labels: {
              app: 'tutea',
              env: 'production',
            },
          },
        },
      }),
})